import mongoose, { Schema } from 'mongoose';

/**
 * A track represents the most basic information about a track, and contains the
 * binary track data.
 */
const Track = new Schema({
    title: {
        type: String,
        optional: false
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    content: Buffer,
    createdAt: {
        type: Date
    }
});

mongoose.model('Track', Track);
export default Track;
