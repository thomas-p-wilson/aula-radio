import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import * as fixtures from '../../fixtures';
import app from '../../../src/server';
import { dropCollections } from '../../utils';

const Track = mongoose.model('Track');
const User = mongoose.model('User');

describe('Track - Routes', () => {
    let agent;
    const doves = new Track(fixtures.tracks.doves);
    const thriller = new Track(fixtures.tracks.thriller);

    before(() => {
        return dropCollections()
            .then(() => (
                Promise.all([
                    new User(fixtures.users.admin).save(),
                    new User(fixtures.users.joe).save(),
                    doves.save(),
                    thriller.save()
                ])
            ));
    })

    beforeEach(() => {
        agent = request.agent(app);

    });

    after(() => {
        app.close();
        mongoose.connection.close();
    })

    it('Can list tracks if not logged in', () => {
        return agent.get('/tracks')
            .expect(200)
            .then(({ body }) => {
                expect(body.length).to.equal(2);
            })
    });

    it('Can get track if not logged in', () => {
        return agent.get(`/tracks/${ thriller._id }`)
            .expect(200)
            .then(({ body }) => {
                expect(body.title).to.equal('Thriller');
            })
    });

    it('Cannot create track if not logged in', () => {
        return agent
            .post('/tracks')
            .send(fixtures.tracks.heaven)
            .expect(401);
    });

    it('Cannot create track if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/tracks')
                    .send(fixtures.tracks.heaven)
                    .expect(403)
            })
    });

    it('Can create track if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/tracks')
                    .send(fixtures.tracks.heaven)
                    .expect(201)
                    .then((res) => {
                        expect(res.headers.location).to.be.a('string');
                    })
            })
    });

    it('Cannot update track if not logged in', () => {
        return agent
            .put(`/tracks/${ thriller._id }`)
            .send({ genre: ['Disco', 'Funk']})
            .expect(401);
    });

    it('Cannot update track if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/tracks/${ thriller._id }`)
                    .send({ genre: ['Disco', 'Funk']})
                    .expect(403)
            })
    });

    it('Can update track if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/tracks/${ thriller._id }`)
                    .send({genre: ['Disco', 'Funk']})
                    .expect(204)
            })
    });

    it('Cannot delete track if not logged in', () => {
        return agent
            .delete(`/tracks/${ doves._id }`)
            .expect(401);
    });

    it('Cannot delete track if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/tracks/${ doves._id }`)
                    .expect(403)
            })
    });

    it('Can delete track if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/tracks/${ doves._id }`)
                    .expect(204)
            })
    });

    it('Cannot stream track if not logged in', () => {
        return agent
            .delete(`/tracks/${ thriller._id }`)
            .expect(401);
    });

    it('Can stream track if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .get(`/tracks/${ thriller._id }/stream`)
                    .expect(200)
                    .then((res) => {
                        expect(res.text.length).to.equal(230854);
                    })
            })
    });
})
