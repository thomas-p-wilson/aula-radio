import mongoose from 'mongoose';
import request from 'request';

export function dropCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    return Promise.all(
    	collections.map((name) => (
	    	new Promise((resolve, reject) => {
		        mongoose.connection.collections[name].drop((err) => {
		        	if (err && err.message != 'ns not found') {
		        		reject(err);
		        	}
		        	resolve();
		        })
	    	})
	    ))
    );
};

export const wait = (duration) => () => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, duration);
	})
}

export const callMusicBrainz = (uri) => {
	return new Promise((resolve, reject) => {
		var options = {
			url: `https://musicbrainz.org/ws/2/${ uri }`,
			headers: {
				'User-Agent': 'aula-challenge'
			}
		};
		request(options, (error, response, body) => {
			if (error || response.statusCode !== 200) {
				return reject(error || JSON.parse(body));
			}

			resolve(JSON.parse(body));
		});
	})
}

export const getCoverImage = (mbid) => {
	return new Promise((resolve, reject) => {
		var options = {
			url: `http://coverartarchive.org/release/${ mbid }`,
			headers: {
				'Accept': 'application/json',
				'User-Agent': 'aula-challenge'
			}
		};
		request(options, (error, response, body) => {
			if (response.statusCode === 404) {
				return resolve({ images: [] });
			}
			if (error || response.statusCode !== 200) {
				return reject(error || JSON.parse(body));
			}
			resolve(JSON.parse(body));
		});
	})
		.then(({ images, ...rest }) => {
			if (images.length === 0) {
				console.log('    No album art: ', rest);
				return Promise.resolve([]);
			}

			let image = images.find((i) => (i.front));
			if (!image) {
				image = images[0];
			}
			let url = image.image;
			if (image.thumbnails) {
				url = image.thumbnails.large || image.thumbnails.small || image.image;
			}

			return new Promise((resolve, reject) => {
				var options = {
					url: url,
					headers: {
						'User-Agent': 'aula-challenge'
					},
  					encoding: null
				};
				request(options, (error, response, body) => {
					if (response.statusCode === 404) {
						console.log('    No album art');
						return resolve([]);
					}
					if (error || response.statusCode !== 200) {
						return reject(error || JSON.parse(body));
					}

					if (response.headers['content-type']) {
						return resolve([body, response.headers['content-type']]);
					}
					resolve([body]);
				});
			});
		})
}