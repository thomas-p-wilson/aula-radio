import mongoose, { Schema } from 'mongoose';

/**
 * A coherent collection of works.
 */
const Album = new Schema({
    title: {
        type: String,
        optional: false
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    released: {
        type: Date
    },
    /**
     * The content rating of the album, if applicable.
     */
    rating: {
        type: Number
    },
    /**
     * The date the record was added to the store. We want the record to expire
     * one day after it was created, so that we can refresh from external
     * sources.
     */
    createdAt: {
        type: Date,
        expires: 86400
    }
});

mongoose.model('Album', Album);
export default Album;
