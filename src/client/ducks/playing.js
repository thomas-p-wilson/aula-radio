import { call, put, takeLatest } from 'redux-saga/effects';
import * as handlers from '../services/playing';

export const actions = {
    updatePlaying(request = {}) {
        return {
            type: 'UPDATE_PLAYING_REQUEST',
            request
        };
    }
};

export const reducers = {
    playing(state = {}, { type, ...rest }) {
        switch (type) {
            case 'UPDATE_PLAYING_REQUEST':
            case 'UPDATE_PLAYING_FAILURE':
            case 'UPDATE_PLAYING_SUCCESS':
                return {
                    ...state,
                    ...rest,
                    saving: type.endsWith('REQUEST'),
                    saved: type.endsWith('SUCCESS')
                };
            case 'CLEAR_PLAYING':
                return {};
            default:
                return state;
        }
    }
};

export const sagas = [
    function* updatePlaying() {
        yield takeLatest('UPDATE_PLAYING_REQUEST', function* updatePlaying({ request }) {
            try {
                const result = yield call(handlers.updatePlaying, request);
                yield put({
                    type: 'UPDATE_PLAYING_SUCCESS',
                    ...result,
                    request,
                    time: Date.now()
                });
            } catch (err) {
                yield put({
                    type: 'UPDATE_PLAYING_FAILURE',
                    request,
                    failed: true,
                    time: Date.now(),
                    ...err
                });
            }
        });
    }
];
