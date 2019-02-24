import mongoose, { Schema } from 'mongoose';

/**
 * An artist represents an individual, group, or organization responsible for
 * authoring works.
 */
const Artist = new Schema({
    mbid: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        optional: false
    },
    gender: {
        type: String
    },
    /**
     * The artist's country of residence or business.
     */
    country: {
        type: String
    },
    /**
     * The artist's primary language of authorship.
     */
    language: {
        type: String
    },
    genre: {
        type: [String]
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
}, { strict: false });

mongoose.model('Artist', Artist);
export default Artist;
