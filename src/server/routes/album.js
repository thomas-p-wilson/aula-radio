import * as albumController from '../controllers/album';
import { isAuthenticated, hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/albums')
        .get(isAuthenticated, albumController.list)
        .post(hasAuthorization('admin'), albumController.create);
    app.route('/albums/:id')
        .get(isAuthenticated, albumController.get)
        .put(hasAuthorization('admin'), albumController.update)
        .delete(hasAuthorization('admin'), albumController.remove);
}
