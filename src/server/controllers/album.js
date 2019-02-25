/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import provider from './stream-providers/mongo';

const Album = mongoose.model('Album');

export function list(req, res, next) {
    Album.find({}, '-cover').limit(24).populate('artist').lean()
        .then((albums) => {
            res.send(albums);
        })
        .catch((err) => {
            console.log('Error: ', err);
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function get(req, res, next) {
    Album.findById(req.params.id, '-cover')
        .then((album) => {
            res.send(album.toObject());
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function create(req, res, next) {
    new Album(req.body).save()
        .then((album) => {
            res.set('Location', `/albums/${ album._id }`);
            res.status(201).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function update(req, res, next) {
    Album.findById(req.params.id)
        .then((album) => {
            Object.assign(album, req.body); // TODO Sanitization
            return album.save();
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
    Album.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}

export function cover(req, res, next) {
    Album.findById(req.params.id)
        .then((album) => {
            // console.log('Album: ', album);
            // if (album.mime) {
            //     res.contentType(album.mime);
            // }
            res.send(album.cover);
        })
        .catch((err) => {
            // TODO log the error centrally
            res.status(500).send();
        });
}
