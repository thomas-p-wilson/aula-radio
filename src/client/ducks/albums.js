import { call, put, takeLatest } from 'redux-saga/effects';
import * as handlers from '../services/albums';

export const actions = {
    fetchAlbums(request = {}) {
        return {
            type: 'FETCH_ALBUMS_REQUEST',
            request
        };
    },
    fetchAlbum(request = {}) {
        return {
            type: 'FETCH_ALBUM_REQUEST',
            request
        };
    }
};

export const reducers = {
    album(state = {}, { type, ...rest }) {
        switch (type) {
            case 'FETCH_ALBUM_REQUEST':
            case 'FETCH_ALBUM_FAILURE':
            case 'FETCH_ALBUM_SUCCESS':
                return {
                    ...state,
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_ALBUM':
                return {};
            default:
                return state;
        }
    },
    albums(state = null, { type, ...rest }) {
        switch (type) {
            case 'FETCH_ALBUMS_REQUEST':
            case 'FETCH_ALBUMS_FAILURE':
            case 'FETCH_ALBUMS_SUCCESS':
                return {
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_ALBUMS':
                return {};
            default:
                return state;
        }
    }
};

export const sagas = [
    function* fetchMultiple() {
        yield takeLatest('FETCH_ALBUMS_REQUEST', function* fetchMultiple({ request }) {
            try {
                const result = yield call(handlers.fetchMultiple, request);
                yield put({
                    type: 'FETCH_ALBUMS_SUCCESS',
                    data: result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_ALBUMS_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    },
    function* fetchSingle() {
        yield takeLatest('FETCH_ALBUM_REQUEST', function* fetchSingle({ request }) {
            try {
                const result = yield call(handlers.fetchSingle, request);
                yield put({
                    type: 'FETCH_ALBUM_SUCCESS',
                    ...result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_ALBUM_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    }
];
