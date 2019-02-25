import * as albumController from '../controllers/album';
import { hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/albums')
        .get(albumController.list)
        .post(hasAuthorization('admin'), albumController.create);
    app.route('/albums/:id')
        .get(albumController.get)
        .put(hasAuthorization('admin'), albumController.update)
        .delete(hasAuthorization('admin'), albumController.remove);
    app.route('/albums/:id/cover')
        .get(albumController.cover);
}
