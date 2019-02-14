export default {
    port: process.env.PORT || 3000,
    sessionCollection: 'sessions',
    sessionCookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    },
    sessionName: 'aularadio',
    sessionSecret: process.env.SECRET || 'change-me',
    logging: {
        format: 'combined'
    }
};
