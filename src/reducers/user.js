import { AUTHENTICATED, LOGOUT } from "../actions/types";

export default function (state = { is_authenticated: false, details: null }, action) {
    switch (action.type) {
        case AUTHENTICATED:
            localStorage.setItem('user_details', JSON.stringify(action.payload));
            return { ...state, is_authenticated: true, details: action.payload }
        case LOGOUT:
            localStorage.removeItem('user_details');
            return { ...state, is_authenticated: false, details: null }
        default:
            return state;
    }
}