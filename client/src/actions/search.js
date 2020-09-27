const UPDATE_SEARCH = 'UPDATE_SEARCH';

export function updateSearch(search){
    return dispatch => {
        dispatch({type: UPDATE_SEARCH, payload:search});
    }
}