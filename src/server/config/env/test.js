export default {
    db: {
        uri: process.env.DB_URI || 'mongodb://db:27017/aula-test',
        name: 'aula-test',
        options: {
            user: process.env.DB_USER || '',
            pass: process.env.DB_PASS || '',
            useNewUrlParser: true
        }
    },
    logging: {
        options: {
            skip: () => {
                return (true);
            }
        }
    }
};
