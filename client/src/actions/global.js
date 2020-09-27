const SWITCH_LOADING = 'SWITCH_LOADING';
const CLEAR_ERROR = 'CLEAR_ERROR';

export function switchLoading(isLoading) {
        return dispatch => {
                dispatch({ type: SWITCH_LOADING, payload: isLoading });
        }
}

export function clearError() {
        return dispatch => {
                dispatch({type: CLEAR_ERROR});
        }
}