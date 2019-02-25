export default (uri, opts = {}) => {
    return fetch(uri, opts)
        .then((o) => {
            if (!o.ok) {
                return Promise.reject(o);
            }

            if (!o || !o.headers || !o.headers.entries) {
                return Promise.reject(o);
            }
            const headers = Array.from(o.headers.entries());
            const contentType = headers.find((h) => (h[0] === 'content-type'));
            if (!contentType) {
                return Promise.resolve();
            }
            if (contentType.indexOf('application/json')) {
                return o.json();
            }
            return o.text();
        })
        .catch((err) => {
            if (!err || !err.headers || !err.headers.entries) {
                return Promise.reject({
                    status: (err || {}).status
                });
            }
            const headers = Array.from(err.headers.entries());
            const contentType = headers.find((h) => (h[0] === 'content-type'));
            if (!contentType) {
                return Promise.reject({
                    status: err.status
                });
            }
            if (contentType.indexOf('application/json')) {
                return err.json()
                    .then((o2) => {
                        return (Promise.reject({
                            ...o2,
                            status: (err.status || o2.status)
                        }));
                    });
            }
            return err.text()
                .then((o2) => {
                    return (Promise.reject({
                        ...o2,
                        status: (err.status || o2.status)
                    }));
                });
        });
};
