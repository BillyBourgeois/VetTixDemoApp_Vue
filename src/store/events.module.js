import { eventsService } from '../services';
////import { router } from '../helpers';

const blankEventsObject = {
    events: [],
    ads: {},
    eventsMeta: {}
};
const initialState = {
    status: {},
    eventsObject: blankEventsObject,
    states: [],
    eventTypes: [],
    eventDetails: {}
};

export const events = {
    namespaced: true,
    state: initialState,
    actions: {
        getEvents({ dispatch, commit }, { eventTypeID, stateCode, eventStatus, sortBy, count, start }) {
            commit('eventsRequest');

            eventsService.getEvents(eventTypeID, stateCode, eventStatus, sortBy, count, start)
                .then(
                    eventsObject => {
                        commit('eventsFound', eventsObject);
                    },
                    error => {
                        commit('eventsFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        getEventDetails({ dispatch, commit }, { eventId }) {

            eventsService.getEventDetails(eventId)
                .then(
                    eventDetails => {
                        commit('eventDetailsLoaded', eventDetails);
                    },
                    error => {
                        commit('eventsFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        getStates({ dispatch, commit }) {
            eventsService.getStates()
                .then(
                    states => {
                        commit('statesLoaded', states);
                    },
                    error => {
                        commit('eventsFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        getEventTypes({ dispatch, commit }) {
            eventsService.getEventTypes()
                .then(
                    eventTypes => {
                        commit('eventTypesLoaded', eventTypes);
                    },
                    error => {
                        commit('eventsFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        }
    },
    mutations: {
        eventsRequest(state) {
            state.status = { searching: true };
            state.eventsObject = {
                events: [],
                ads: {},
                eventsMeta: {}
            };
        },
        eventsFound(state, eventsObject) {
            state.status = { found: true };
            state.eventsObject = eventsObject;
        },
        eventsFailure(state) {
            state.status = {};
            state.events = {};
        },
        statesLoaded(state, states) {
            state.states = states;
        },
        eventTypesLoaded(state, eventTypes) {
            state.eventTypes = eventTypes;
        },
        eventDetailsLoaded(state, eventDetails) {
            state.eventDetails = eventDetails;
        }
    }
}
