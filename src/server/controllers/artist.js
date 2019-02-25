/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import provider from './stream-providers/mongo';

const Artist = mongoose.model('Artist');

export function list(req, res, next) {
    Artist.find({}).limit(24).lean()
        .then((artists) => {
            res.send(artists);
        })
        .catch((err) => {
            console.log('Error: ', err);
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function get(req, res, next) {
    Artist.findById(req.params.id)
        .then((artist) => {
            res.send(artist.toObject());
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function create(req, res, next) {
    new Artist(req.body).save()
        .then((artist) => {
            res.set('Location', `/artists/${ artist._id }`);
            res.status(201).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function update(req, res, next) {
    Artist.findById(req.params.id)
        .then((artist) => {
            Object.assign(artist, req.body); // TODO Sanitization
            return artist.save();
        })
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            console.log('Error: ', err);
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function remove(req, res, next) {
    Artist.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}
