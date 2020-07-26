import { STORIES_FETCHED, STORY_REJECTED, STORY_ACCEPTED } from "../actions/types";

export default function (state = { list: [] }, action) {
    switch (action.type) {
        case STORIES_FETCHED:
            return { ...state, list: action.payload }
        case STORY_REJECTED: {
            const storyIndex = state.list.findIndex(elem => elem.id === action.id);
            return { ...state, list: [...state.list.slice(0, storyIndex), { ...state.list[storyIndex], status: 'rejected' }, ...state.list.slice(storyIndex + 1)] };
        }
        case STORY_ACCEPTED: {
            const storyIndex = state.list.findIndex(elem => elem.id === action.id);
            return { ...state, list: [...state.list.slice(0, storyIndex), { ...state.list[storyIndex], status: 'accepted' }, ...state.list.slice(storyIndex + 1)] };
        }
        default:
            return state;
    }
}