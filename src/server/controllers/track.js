/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import provider from './stream-providers/mongo';

const Track = mongoose.model('Track');

export function list(req, res, next) {
    Track.find().lean().select('-content')
        .then((tracks) => {
            res.send(tracks);
        })
        .catch((err) => {
            console.log('Error: ', err);
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function get(req, res, next) {
    Track.findById(req.params.id).select('-content')
        .then((track) => {
            res.send(track.toObject());
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function create(req, res, next) {
    new Track(req.body).save()
        .then((track) => {
            res.set('Location', `/tracks/${ track._id }`);
            res.status(201).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function update(req, res, next) {
    Track.findById(req.params.id).select('-content')
        .then((track) => {
            Object.assign(track, req.body); // TODO Sanitization
            return track.save();
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
    Track.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function stream(req, res, next) {
    Track.findById(req.params.id).select('-content')
        .then((track) => {
            res.set('Content-Type', track.type || 'audio/mp3');
            res.set('Accept-Ranges', 'bytes');
            provider(req, res, track);
        });
}
