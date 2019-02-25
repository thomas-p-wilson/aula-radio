import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import * as fixtures from '../../fixtures';
import app from '../../../src/server';
import { dropCollections } from '../../utils';

const Artist = mongoose.model('Artist');
const User = mongoose.model('User');

describe('Artist - Routes', () => {
    let agent;
    const prince = new Artist(fixtures.artists.prince);
    const jackson = new Artist(fixtures.artists.jackson);

    before(() => {
        return dropCollections()
            .then(() => (
                Promise.all([
                    new User(fixtures.users.admin).save(),
                    new User(fixtures.users.joe).save(),
                    prince.save(),
                    jackson.save()
                ])
            ));
    })

    beforeEach(() => {
        agent = request.agent(app);

    });

    it('Can list artists if not logged in', () => {
        return agent.get('/artists')
            .expect(200)
            .then(({ body }) => {
                expect(body.length).to.equal(2);
            })
    });

    it('Can get artist if not logged in', () => {
        return agent.get(`/artists/${ jackson._id }`)
            .expect(200)
            .then(({ body }) => {
                expect(body.name).to.equal('Michael Jackson');
            })
    });

    it('Cannot create artist if not logged in', () => {
        return agent
            .post('/artists')
            .send(fixtures.artists.zepellin)
            .expect(401);
    });

    it('Cannot create artist if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/artists')
                    .send(fixtures.artists.zepellin)
                    .expect(403)
            })
    });

    it('Can create artist if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .post('/artists')
                    .send(fixtures.artists.zepellin)
                    .expect(201)
                    .then((res) => {
                        expect(res.headers.location).to.be.a('string');
                    })
            })
    });

    it('Cannot update artist if not logged in', () => {
        return agent
            .put(`/artists/${ jackson._id }`)
            .send({ rating: 5 })
            .expect(401);
    });

    it('Cannot update artist if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/artists/${ jackson._id }`)
                    .send({ rating: 5 })
                    .expect(403)
            })
    });

    it('Can update artist if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .put(`/artists/${ jackson._id }`)
                    .send({ rating: 5 })
                    .expect(204)
            })
    });

    it('Cannot delete artist if not logged in', () => {
        return agent
            .delete(`/artists/${ jackson._id }`)
            .expect(401);
    });

    it('Cannot delete artist if not admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.joe)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/artists/${ jackson._id }`)
                    .expect(403)
            })
    });

    it('Can delete artist if admin', () => {
        return agent
            .post('/auth/signin')
            .send(fixtures.users.admin)
            .expect(200)
            .then((res) => {
                return agent
                    .delete(`/artists/${ jackson._id }`)
                    .expect(204)
            })
    });
})
