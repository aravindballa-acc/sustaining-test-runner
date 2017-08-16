import {SHOW_SETTINGS} from './actions';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SETTINGS:
            return {
                ...state,
                showSettings: action.displayed
            };
        default:
            return state;
    }
}