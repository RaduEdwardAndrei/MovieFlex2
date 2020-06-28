import { SEARCH_MOVIE, FETCH_MOVIES } from '../types/authTypes';

const initState = {
    text: '',
    movies: [],
    loading: false,
    movie: []
}

const searchReducer = (state = initState, action) => {
    switch(action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                text: action.payload,
                loading: false
            }
        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        default: return state
    }
}

export default searchReducer