import { SEARCH_MOVIE, FETCH_MOVIES } from '../types/authTypes';
import axios from 'axios';
import { API_URL, API_KEY } from '../../config';

export const searchMovie = text => dispatch => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    })
}

export const fetchMovie = text => dispatch => {
    console.log("AICI")
    axios.get(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${text}`)
        .then(response => {
            const jsonReponse = JSON.parse(JSON.stringify(response))
            dispatch({type: FETCH_MOVIES, payload: jsonReponse.data.results})
            
        })
        .catch( err => console.log(err))
}