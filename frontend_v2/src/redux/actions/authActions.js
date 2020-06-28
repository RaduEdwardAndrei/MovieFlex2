import { 
    USER_LOADING,
    USER_LOADED,
    LOGOUT_SUCCESS, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types/authTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../history';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING})

    axios.get('http://localhost:5000/movieflex/users/getProfile', tokenConfig(getState))
        .then( response => 
            dispatch({ type: USER_LOADED, payload: response.data
        }))
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: LOGIN_FAILURE })
        })
}

//Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage ? const token = localStorage.getItem("token");
    const token = getState().auth.token

    //Header
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return config
}

// Logout User
export const Logout = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT_SUCCESS})
        history.push('/login');
    }
}

export const Login = (fetchUser) => {
    return (dispatch) => {
        // console.log("DATE USERRR" + JSON.stringify(fetchUser))
        // let userInformation = JSON.stringify(fetchUser.userInformation)

        axios.post('http://localhost:5000/movieflex/users/login', fetchUser)
        .then( response => {
            const jsonReponse = JSON.parse(JSON.stringify(response))
            localStorage.setItem("token", jsonReponse.data)
            console.log("DATE USER" + JSON.stringify(fetchUser))
            dispatch({type: LOGIN_SUCCESS, payload: jsonReponse.data});
            history.push('/');
        })
        .catch ( err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAILURE'))
            let variabila = (JSON.stringify(err.response.data)).split(":")
            let variabila2 = variabila[1].toString().split('"')
            toast.error(variabila2[1], {position: toast.POSITION.TOP_CENTER}) 
            dispatch({type: LOGIN_FAILURE});
        });
    }
}

export const Register = (newUser) => {
    return (dispatch) => {
        
        axios.post('http://localhost:5000/movieflex/users/register', newUser)
            .then(response => {
                toast.success("Almost there, a verification email has been sent to " + newUser.email, 
                    {position: toast.POSITION.TOP_CENTER});
                const jsonReponse = JSON.parse(JSON.stringify(response));
                history.push('/login');
                dispatch({type: REGISTER_SUCCESS, payload: jsonReponse.data})
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
                let variabila = (JSON.stringify(err.response.data)).split(":")
                let variabila2 = variabila[1].toString().split('"')
                toast.error(variabila2[1], {position: toast.POSITION.TOP_CENTER}) 
                dispatch({type: REGISTER_FAILURE})
            })
    }
}