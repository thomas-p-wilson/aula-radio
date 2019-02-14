import mongoose from 'mongoose';

const Track = mongoose.model('Track');

/*
 * Not remotely ideal for streaming purposes. But ideal enough for prototyping
 * purposes.
 */
export default function mongo(req, res, track) {
    Track.findById(track._id).select('+content')
        .then((_track) => {
            res.end(_track.content);
        });
}
