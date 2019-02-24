import mongoose, { Schema } from 'mongoose';

/**
 * A coherent collection of works.
 */
const Album = new Schema({
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
    released: Date,
    /**
     * The content rating of the album, if applicable.
     */
    rating: Number,
    /**
     * The cover art of the album, if applicable.
     */
    cover: Buffer,
    /**
     * The mime type of the cover art, if applicable.
     */
    mime: String,
    /**
     * The date the record was added to the store. We want the record to expire
     * one day after it was created, so that we can refresh from external
     * sources.
     */
    createdAt: {
        type: Date,
        expires: 86400
    }
}, { strict: false });

mongoose.model('Album', Album);
export default Album;
