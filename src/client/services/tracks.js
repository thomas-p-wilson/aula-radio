import fetcher from '../utils/rest-fetcher';

const API_URL = '/tracks';

export const fetchMultiple = () => {
    return fetcher(API_URL);
};

export const fetchSingle = ({ trackId }) => {
    return fetcher(API_URL + trackId);
};
