const SWITCH_LOADING = 'SWITCH_LOADING';

export function switchLoading(isLoading) {
        return dispatch => {
                dispatch({ type: SWITCH_LOADING, payload: isLoading });
        }
}