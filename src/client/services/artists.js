import fetcher from '../utils/rest-fetcher';

const API_URL = '/artists';

export const fetchMultiple = () => {
    return fetcher(API_URL);
};

export const fetchSingle = ({ artistId }) => {
    return fetcher(API_URL + artistId);
};
