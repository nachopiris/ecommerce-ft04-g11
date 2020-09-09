import Axios from 'axios';
import config from '../config';

const GET_CATEGORES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

const BASE_URI = config.api.base_uri + '/categories';

export function getCategories()
{
    return dispatch => {
        return Axios.get(BASE_URI)
        .then(res => res.data)
        .then(res => {
            dispatch({type:GET_CATEGORES, payload: res.data});
        });
    }
}

export function getCategory(id)
{
    return dispatch => {
        return Axios.get(BASE_URI + '/' + id)
        .then(res => res.data)
        .then(res => {
            dispatch({type: GET_CATEGORY, payload: res});
        });
    }
}


export function createCategory(attributes)
{
    /*
        'attributes' es un objeto que contiene como propiedades los atributos del producto. En el Back-End,
        este objeto se interpreta como 'body'.
        ejemplo: {name: '', description: '', ...etc}
    */
    return dispatch => {
        return Axios.post(BASE_URI, attributes)
        .then(res => res.data)
        .then(res => {
            dispatch({type: CREATE_CATEGORY, payload: res});
        });
    }
}

export function updateCategory(id, attributes)
{
    return dispatch => {
        return Axios.put(BASE_URI + '/' + id, attributes)
        .then(res => res.data)
        .then(res => {
            dispatch({type: UPDATE_CATEGORY, payload: res});
        })
    }
}

export function deleteCategory(id)
{
    return dispatch => {
        return Axios.delete(BASE_URI + '/' + id)
        .then(() => {
            dispatch({type: DELETE_CATEGORY, payload: id});
        })
    }
}