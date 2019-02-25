import { call, put, takeLatest } from 'redux-saga/effects';
import * as handlers from '../services/tracks';

export const actions = {
    fetchTracks(request = {}) {
        return {
            type: 'FETCH_TRACKS_REQUEST',
            request
        };
    },
    fetchTrack(request = {}) {
        return {
            type: 'FETCH_TRACK_REQUEST',
            request
        };
    }
};

export const reducers = {
    track(state = {}, { type, ...rest }) {
        switch (type) {
            case 'FETCH_TRACK_REQUEST':
            case 'FETCH_TRACK_FAILURE':
            case 'FETCH_TRACK_SUCCESS':
                return {
                    ...state,
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_TRACK':
                return {};
            default:
                return state;
        }
    },
    tracks(state = null, { type, ...rest }) {
        switch (type) {
            case 'FETCH_TRACKS_REQUEST':
            case 'FETCH_TRACKS_FAILURE':
            case 'FETCH_TRACKS_SUCCESS':
                return {
                    ...rest,
                    loading: type.endsWith('REQUEST'),
                    loaded: type.endsWith('SUCCESS')
                };
            case 'CLEAR_TRACKS':
                return {};
            default:
                return state;
        }
    }
};

export const sagas = [
    function* fetchMultiple() {
        yield takeLatest('FETCH_TRACKS_REQUEST', function* fetchMultiple({ request }) {
            try {
                const result = yield call(handlers.fetchMultiple, request);
                yield put({
                    type: 'FETCH_TRACKS_SUCCESS',
                    data: result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_TRACKS_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    },
    function* fetchSingle() {
        yield takeLatest('FETCH_TRACK_REQUEST', function* fetchSingle({ request }) {
            try {
                const result = yield call(handlers.fetchSingle, request);
                yield put({
                    type: 'FETCH_TRACK_SUCCESS',
                    ...result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'FETCH_TRACK_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    }
];
