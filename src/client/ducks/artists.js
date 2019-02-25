import { call, put, takeLatest } from 'redux-saga/effects';
import * as handlers from '../services/artists';

export const actions = {
    fetchArtists(request = {}) {
        return {
            type: 'FETCH_ARTISTS_REQUEST',
            request
        };
    },
    fetchArtist(request = {}) {
        return {
            type: 'FETCH_ARTIST_REQUEST',
            request
        };
    }
};

export const reducers = {
    artist(state = {}, { type, ...rest }) {
        switch (type) {
            case 'FETCH_ARTIST_REQUEST':
            case 'FETCH_ARTIST_FAILURE':
            case 'FETCH_ARTIST_SUCCESS':
                return {
                    ...state,
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_ARTIST':
                return {};
            default:
                return state;
        }
    },
    artists(state = null, { type, ...rest }) {
        switch (type) {
            case 'FETCH_ARTISTS_REQUEST':
            case 'FETCH_ARTISTS_FAILURE':
            case 'FETCH_ARTISTS_SUCCESS':
                return {
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_ARTISTS':
                return {};
            default:
                return state;
        }
    }
};

export const sagas = [
    function* fetchMultiple() {
        yield takeLatest('FETCH_ARTISTS_REQUEST', function* fetchMultiple({ request }) {
            try {
                const result = yield call(handlers.fetchMultiple, request);
                yield put({
                    type: 'FETCH_ARTISTS_SUCCESS',
                    data: result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_ARTISTS_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    },
    function* fetchSingle() {
        yield takeLatest('FETCH_ARTIST_REQUEST', function* fetchSingle({ request }) {
            try {
                const result = yield call(handlers.fetchSingle, request);
                yield put({
                    type: 'FETCH_ARTIST_SUCCESS',
                    ...result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_ARTIST_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    }
];
