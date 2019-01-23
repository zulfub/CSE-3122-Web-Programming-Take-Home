import {Tracker} from 'meteor/tracker';

export const USER_DATA = 'USER_DATA';

const initialState = {
    user: {},
    isLoaded: false,
};

export default function (state = initialState, action) {
    const {data, type} = action;

    switch (type) {
        case USER_DATA:
            return Object.assign({}, state, {
                user: data.user || {},
                isLoaded: data.subscription.ready()
            });
        default:
            return state;
    }
}
