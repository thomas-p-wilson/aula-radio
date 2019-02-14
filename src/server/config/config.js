import all from './env/all';

export default {
    ...all || {},
    ...require(`./env/${ process.env.NODE_ENV || 'production' }`).default // eslint-disable-line import/no-dynamic-require, global-require
};
