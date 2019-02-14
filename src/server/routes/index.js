export default function (app) {
    app.route('/').get((req, res) => {
        res.render('index', {
            request: req
        });
    });
}
