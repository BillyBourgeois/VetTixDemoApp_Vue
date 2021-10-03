import { authHeader } from '@/helpers';
let BaseUrl = 'https://www.vettix.org/uapi';

export const userService = {
    login,
    logout,
    getUserInfo
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password } )
    };
    let url = new URL(BaseUrl + '/user/login');
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(userToken => {
            // login successful if there's a jwt token in the response
            if (userToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userToken', JSON.stringify(userToken.token));
                return userToken;
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
}

function getUserInfo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let url = new URL(BaseUrl + '/user/info');
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}