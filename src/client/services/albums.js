import fetcher from '../utils/rest-fetcher';

const API_URL = '/albums';

export const fetchMultiple = () => {
    return fetcher(API_URL);
};

export const fetchSingle = ({ albumId }) => {
    return fetcher(API_URL + albumId);
};
