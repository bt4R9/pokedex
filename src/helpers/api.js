import cookies from 'js-cookie';

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
};

const getHeaders = headers => ({
    ...defaultHeaders,
    ...headers
});
const getCSRF = () => cookies.get('_csrf');
const getUrl = path => path + `?_csrf=${getCSRF()}`;

export const get = (path, params) => fetch(getUrl(path, params), {
    credentials: 'same-origin',
    method: 'GET',
    headers: getHeaders()
});

export const post = (path, params) => fetch(path, {
    credentials: 'same-origin',
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
        ...params,
        _csrf: getCSRF()
    })
});
