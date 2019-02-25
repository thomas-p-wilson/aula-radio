import fetcher from '../utils/rest-fetcher';

const API_URL = '/playing';

export const updatePlaying = (request = {}) => {
    return fetcher(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
};
