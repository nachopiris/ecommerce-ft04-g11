import Axios from 'axios';
import config from '../config';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';

const BASE_URI = config.api.base_uri + '/products';

export function filterByCategory(nombreCat)
{
    return dispatch => {
        return Axios.get(BASE_URI + '/category/'+nombreCat)        
        .then((res) =>{
            dispatch({type: FILTER_BY_CATEGORY,payload: res.data.data})
        });
    }
}

export function getProducts(keyword)
{
    return dispatch => {
        // si keyword NO es undefined, entonces buscará por keyword, de lo contrario, mostrará el listado completo.
        let url = keyword ? BASE_URI + '/search/' + keyword : BASE_URI;
        return Axios.get(url)
        .then(res => res.data)
        .then(res => {
            dispatch({type:GET_PRODUCTS, payload: res.data});
        });
    }
}

export function getProduct(id)
{
    return dispatch => {
        return Axios.get(BASE_URI + '/' + id)
        .then(res => res.data)
        .then(res => {
            dispatch({type:GET_PRODUCT, payload: res})
        });
    }
}

export function createProduct(attributes)
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
            dispatch({type: CREATE_PRODUCT, payload: res});
        })
    }
}

export function updateProduct(id, attributes)
{
    return dispatch => {
        return Axios.put(BASE_URI + '/' + id, attributes)
        .then(res => res.data)
        .then(res => {
            dispatch({type: UPDATE_PRODUCT, payload: res});
        })
    }
}

export function deleteProduct(id)
{
    return dispatch => {
        return Axios.delete(BASE_URI + '/' + id)
        .then(() => {
            dispatch({type: DELETE_PRODUCT, payload: id});
        })
    }
}