import mongoose, { Schema } from 'mongoose';

/**
 * A track represents the most basic information about a track, and contains the
 * binary track data.
 */
const Track = new Schema({
    mbid: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        optional: false
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    content: Buffer,
    createdAt: {
        type: Date
    }
}, { strict: false });

mongoose.model('Track', Track);
export default Track;
