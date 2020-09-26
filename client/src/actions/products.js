import Axios from 'axios';
import config from '../config';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const ADD_CATEGORY_TO_PRODUCT = "ADD_CATEGORY_TO_PRODUCT";
const DELETE_CATEGORY_TO_PRODUCT = 'DELETE_CATEGORY_TO_PRODUCT';
const GET_LATESTS = 'GET_LATESTS';
const GET_REVIEWS = 'GET_REVIEWS';
const GET_AVERAGE_REVIEWS = 'GET_AVERAGE_REVIEWS';

const BASE_URI = config.api.base_uri + '/products';

export function getReviews(id) {
    return dispatch => {
        return Axios.get(BASE_URI + '/' + id + '/review')
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_REVIEWS, payload: res.data })
            })
    }
}

export function getAverage(id) {
    return dispatch => {
        return Axios.get(BASE_URI + '/' + id + '/review/average')
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_AVERAGE_REVIEWS, payload: res.data })
            })
    }
}

export function getLatests() {
    return dispatch => {
        return Axios.get(BASE_URI + '/custom/latests')
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_LATESTS, payload: res.data })
            })
    }
}

export function searchProducts(searchWord) {
    return dispatch => {
        dispatch({ type: SEARCH_PRODUCT, payload: searchWord })
    }
}

export function filterByCategory(nombreCat) {
    return dispatch => {
        return Axios.get(BASE_URI + '/category/' + nombreCat)
            .then((res) => {
                dispatch({ type: FILTER_BY_CATEGORY, payload: res.data.data })
            });
    }
}

export function getProducts(keyword, page = 1) {
    return dispatch => {
        // si keyword NO es undefined, entonces buscará por keyword, de lo contrario, mostrará el listado completo.
        let url = keyword ? BASE_URI + '/search/' + keyword : BASE_URI;
        url += '?page=' + page;
        return Axios.get(url)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_PRODUCTS, payload: res.data });
            });
    }
}

export function getProduct(id) {
    return dispatch => {
        return Axios.get(BASE_URI + '/' + id)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_PRODUCT, payload: res.data })
            });
    }
}

export function getCollect(ids) {
    return dispatch => {
        return Axios.post(BASE_URI + '/custom/collect', { ids })
            .then(res => res.data.data);
    }
}

export function createProduct(attributes) {
    /*
        'attributes' es un objeto que contiene como propiedades los atributos del producto. En el Back-End,
        este objeto se interpreta como 'body'.
        ejemplo: {name: '', description: '', ...etc}
    */
    return dispatch => {
        return Axios.post(BASE_URI, attributes)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: CREATE_PRODUCT, payload: res.data });
            })
    }
}

export function updateProduct(id, attributes) {

    return dispatch => {
        return Axios.put(BASE_URI + '/' + id, attributes)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: UPDATE_PRODUCT });
            })
    }
}

export function deleteProduct(id) {
    return dispatch => {
        return Axios.delete(BASE_URI + '/' + id)
            .then(() => {
                dispatch({ type: DELETE_PRODUCT, payload: id });
            })
    }
}

export function addCategoryToProduct(idCat, idProduct) {
    return dispatch => {
        return Axios.post(BASE_URI + '/' + idProduct + '/category/' + idCat)
            .then(() => {
                dispatch({ type: ADD_CATEGORY_TO_PRODUCT })
            })
    }
}

export function deleteCategoryToProduct(idCat, idProduct) {
    return dispatch => {
        return Axios.delete(BASE_URI + '/' + idProduct + '/category/' + idCat)
            .then(() => {
                dispatch({ type: DELETE_CATEGORY_TO_PRODUCT })
            })
    }
}