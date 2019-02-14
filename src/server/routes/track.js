import * as trackController from '../controllers/track';
import { isAuthenticated, hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/tracks')
        .get(isAuthenticated, trackController.list)
        .post(hasAuthorization('admin'), trackController.create);
    app.route('/tracks/:id')
        .get(isAuthenticated, trackController.get)
        .put(hasAuthorization('admin'), trackController.update)
        .delete(hasAuthorization('admin'), trackController.remove);
    app.route('/tracks/:id/stream')
        .get(isAuthenticated, trackController.stream);
}
