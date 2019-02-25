import { actions as albumActions, reducers as albumReducers, sagas as albumSagas } from './albums';
import { actions as artistActions, reducers as artistReducers, sagas as artistSagas } from './artists';
import { actions as playingActions, reducers as playingReducers, sagas as playingSagas } from './playing';
import { actions as trackActions, reducers as trackReducers, sagas as trackSagas } from './tracks';

const actions = {
    ...albumActions,
    ...artistActions,
    ...playingActions,
    ...trackActions
};
const reducers = {
    ...albumReducers,
    ...artistReducers,
    ...playingReducers,
    ...trackReducers
};
const sagas = [
    ...albumSagas,
    ...artistSagas,
    ...playingSagas,
    ...trackSagas
];

export {
    actions,
    reducers,
    sagas
};
