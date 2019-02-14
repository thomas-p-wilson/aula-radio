import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import * as fixtures from '../../fixtures';
import app from '../../../src/server';
import { dropCollections } from '../../utils';

const Album = mongoose.model('Album');
const User = mongoose.model('User');

describe('Album - Routes', () => {
    let agent;
    const purplerain = new Album(fixtures.albums.purplerain);
    const thriller = new Album(fixtures.albums.thriller);

    before(() => {
        return dropCollections()
            .then(() => (
                Promise.all([
                    new User(fixtures.users.admin).save(),
                    new User(fixtures.users.joe).save(),
                    purplerain.save(),
                    thriller.save()
                ])
            ));
    })

    beforeEach(() => {
        agent = request.agent(app);

    });

    it('Cannot list albums if not logged in', () => {
        return agent
            .get('/albums')
            .expect(401)
    });

    it('Can list albums if logged in', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .get('/albums')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.length).to.equal(2);
                    })
            })
    });

    it('Cannot get album if not logged in', () => {
        return agent
            .get(`/albums/${ thriller._id }`)
            .expect(401);
    });

    it('Can get album if logged in', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .get(`/albums/${ thriller._id }`)
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.title).to.equal('Thriller');
                    })
            })
    });

    it('Cannot create album if not logged in', () => {
        return agent
            .post('/albums')
            .send(fixtures.albums.zeppelin_iv)
            .expect(401);
    });

    it('Cannot create album if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/albums')
                    .send(fixtures.albums.zeppelin_iv)
                    .expect(403)
            })
    });

    it('Can create album if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/albums')
                    .send(fixtures.albums.zeppelin_iv)
                    .expect(201)
                    .then((res) => {
                        expect(res.headers.location).to.be.a('string');
                    })
            })
    });

    it('Cannot update album if not logged in', () => {
        return agent
            .put(`/albums/${ thriller._id }`)
            .send({ rating: 5 })
            .expect(401);
    });

    it('Cannot update album if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/albums/${ thriller._id }`)
                    .send({ rating: 5 })
                    .expect(403)
            })
    });

    it('Can update album if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/albums/${ thriller._id }`)
                    .send({ rating: 5 })
                    .expect(204)
            })
    });

    it('Cannot delete album if not logged in', () => {
        return agent
            .delete(`/albums/${ thriller._id }`)
            .expect(401);
    });

    it('Cannot delete album if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/albums/${ thriller._id }`)
                    .expect(403)
            })
    });

    it('Can delete album if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/albums/${ thriller._id }`)
                    .expect(204)
            })
    });
})
