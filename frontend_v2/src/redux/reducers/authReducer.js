import { 
    USER_LOADED,
    USER_LOADING, 
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types/authTypes';

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            console.log('Login Successful')
            localStorage.setItem('token', action.payload)
            console.log('TOKEN REDUCER' + action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_SUCCESS:
            console.log('Register Success')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            }
        case LOGOUT_SUCCESS:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            console.log('ACTION failed')
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default: return state
    }
}

export default authReducer