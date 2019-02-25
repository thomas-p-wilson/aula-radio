import * as trackController from '../controllers/track';
import { hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/tracks')
        .get(trackController.list)
        .post(hasAuthorization('admin'), trackController.create);
    app.route('/tracks/:id')
        .get(trackController.get)
        .put(hasAuthorization('admin'), trackController.update)
        .delete(hasAuthorization('admin'), trackController.remove);
    app.route('/tracks/:id/stream')
        .get(trackController.stream);
}
