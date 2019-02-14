import * as artistController from '../controllers/artist';
import { isAuthenticated, hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/artists')
        .get(isAuthenticated, artistController.list)
        .post(hasAuthorization('admin'), artistController.create);
    app.route('/artists/:id')
        .get(isAuthenticated, artistController.get)
        .put(hasAuthorization('admin'), artistController.update)
        .delete(hasAuthorization('admin'), artistController.remove);
}
