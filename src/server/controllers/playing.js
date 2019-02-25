/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import provider from './stream-providers/mongo';

const Track = mongoose.model('Track');

// NOTE: At the moment, we just get the first track from a given collection of
//       works. In the future, this should be altered to be a bit more
//       intuitive.
// @todo Cleanup
export function update(req, res, next) {
    const { body } = req;
    if (body.artistId) {
        return Track.findOne({ artist: body.artistId }, '-content').populate('artist').populate('album', '-cover').lean()
            .then((track) => {
                res.send(track);
            });
    }

    if (body.albumId) {
        return Track.findOne({ album: body.albumId }, '-content').populate('artist').populate('album', '-cover').lean()
            .then((track) => {
                res.send(track);
            });
    }

    if (body.trackId) {
        return Track.findOne({ _id: body.trackId }, '-content').populate('artist').populate('album', '-cover').lean()
            .then((track) => {
                res.send(track);
            });
    }
}
