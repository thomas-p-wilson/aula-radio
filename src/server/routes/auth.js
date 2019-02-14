import { signin } from '../controllers/auth';

export default function (app) {
    app.route('/auth/signin').post(signin);
}
