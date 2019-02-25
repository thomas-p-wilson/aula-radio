import * as artistController from '../controllers/artist';
import { hasAuthorization } from '../controllers/user';

export default function (app) {
    app.route('/artists')
        .get(artistController.list)
        .post(hasAuthorization('admin'), artistController.create);
    app.route('/artists/:id')
        .get(artistController.get)
        .put(hasAuthorization('admin'), artistController.update)
        .delete(hasAuthorization('admin'), artistController.remove);
}
