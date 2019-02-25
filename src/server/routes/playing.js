import * as playingController from '../controllers/playing';

export default function (app) {
    app.route('/playing')
        .post(playingController.update);
}
