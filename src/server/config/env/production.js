export default {
    db: {
        uri: process.env.DB_URI || 'mongodb://db:27017/aula',
        name: 'aula',
        options: {
            user: process.env.DB_USER || '',
            pass: process.env.DB_PASS || '',
            useNewUrlParser: true
        }
    }
};
