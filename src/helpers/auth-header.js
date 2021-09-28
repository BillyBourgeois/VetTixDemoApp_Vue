export function authHeader() {
    // return authorization header with jwt token
    //let user = JSON.parse(localStorage.getItem('user'));
    let userToken = JSON.parse(localStorage.getItem('userToken'));

    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken };
    } else {
        return {};
    }
}