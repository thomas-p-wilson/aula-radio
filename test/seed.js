import mongoose from 'mongoose';
import db from '../src/server/config/database';
import { users } from './fixtures';
import { dropCollections, wait, getCoverImage, callMusicBrainz } from './utils';

const Album = mongoose.model('Album');
const Artist = mongoose.model('Artist');
const Track = mongoose.model('Track');
const User = mongoose.model('User');

/**
 * Seed a development instance of the application.
 *
 * NOTE: MusicBrainz has a service request limit, so we're opting to pre-seed
 * rather than retrieve information in real time. In reality, we'd have our own
 * db filled with media information rather than relying on an external source.
 */

const artists = [
	'66c662b6-6e2f-4930-8610-912e24c63ed1', // AC/DC
	'0383dadf-2a4e-4d10-a46a-e9e041da8eb3', // Queen
	'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d', // The Beatles
	'83d91898-7763-47d7-b03b-b92132375c47', // Pink Floyd
	'678d88b2-87b0-403b-b63d-5da7465aecc3', // Led Zeppelin
	'65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab', // Metallica
	'5b11f4ce-a62d-471e-81fc-a69a8278c7da' // Nirvana
];

let albums = [];
let tracks = [];

db
	.then(dropCollections)
	.then(() => (
		Promise.all(Object.keys(users)
			.map((key) => (
				users[key] = new User(users[key]).save()
			)))
	))

	// Deal with artists + albums
	.then(() => (
		artists.reduce((result, uid) => (
			result
				.then(() => (callMusicBrainz(`artist/${ uid }?inc=releases&fmt=json`)))
				.then((body) => {
					console.log(`Artist: ${ body.name } (${ body.id })`);
					return Promise.all([
						new Artist({
							mbid: body.id,
							name: body.name,
							gender: body.gender,
							country: body.country,
							language: null,
							genre: null
						}).save(),
						Promise.resolve(body)
					]);
				})
				.then(([artist, body]) => (
						body.releases
							.filter((r) => (r.status === 'Official' && r.id))
							.reduce((promise, release) => (
								promise
									.then(() => (
										getCoverImage(release.id)
									))
									.then(([cover, mime]) => {
										if (albums.find((a) => (a.artist === artist._id && a.title === release.title))) {
											console.log(`  Skip duplicate album: ${ release.title }`);
											return true;
										}
										console.log(`  Album: ${ release.title } (${ release.id })`);
										const album = new Album({
											mbid: release.id,
											title: release.title,
											artist: artist._id,
											released: release.date,
											rating: null,
											cover,
											mime
										});
										albums.push(album);
										return album.save();
									})
									.then(wait(250))
							), Promise.resolve())
				))
				.then(wait(250))
		), Promise.resolve())
	))
	.then(wait(1000))

	// Deal with tracks
	.then(() => (
		albums.reduce((res, album) => (
			res
				.then(() => (
					callMusicBrainz(`release/${ album.mbid }?inc=recordings&fmt=json`)
				))
				.then((body) => (
					body.media.reduce((res, media) => (
						res
							.then(() => (
								Promise.all(
									media.tracks
										.map((track) => {
											console.log(`    Track: ${ track.title } (${ track.id })`);
											return new Track({
												mbid: track.id,
												title: track.title,
												artist: album.artist,
												album: album._id,
												content: null
											}).save()
										})
								)
							))
					), Promise.resolve())
				))
				.catch((err) => {
					if (err && err.error === 'Invalid mbid.') {
						console.log(`Invalid release: ${ album.mbid }`);
						return Promise.resolve(true);
					}
					console.log('Error: ', err);
					return Promise.reject(err);
				})
				.then(wait(500))
		), Promise.resolve())
	))
	.then(() => {
        mongoose.connection.close();
	})
	.catch((err) => {
		console.log('Error: ', err);
	});
