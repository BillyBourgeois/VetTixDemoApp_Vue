import { authHeader } from '../helpers';
import { userService } from '../services';
let BaseUrl = 'https://www.vettix.org/uapi';

export const eventsService = {
    getEvents,
    getEventDetails,
    getStates,
    getEventTypes
};

function getEvents(eventTypeID, stateCode, eventStatus, sortBy, count, start) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    let url = new URL(BaseUrl + '/event'),
        params = {
            eventTypeID: eventTypeID,
            stateCode: stateCode,
            eventStatus: eventStatus,
            sortBy: sortBy,
            count: count,
            start: start
        }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url, requestOptions).then(handleResponse).
        then(events => {
            return events;
        });
}

function getEventDetails(eventId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    let url = new URL(BaseUrl + '/event/' + eventId);

    return fetch(url, requestOptions).then(handleResponse).
        then(eventDetails => {
            return eventDetails;
        });
}

function getStates() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let url = new URL(BaseUrl + '/state');
    return fetch(url, requestOptions).then(handleResponse).
        then(states => {
            return states;
        });
}

function getEventTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let url = new URL(BaseUrl + '/event/type');
    return fetch(url, requestOptions).then(handleResponse).
        then(states => {
            return states;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}