//General
import React, { useEffect, useState} from 'react';
import {connect} from 'react-redux';

//actions
import {clearError} from '../actions/global';

//UI
import swal from '@sweetalert/with-react';

function ErrorAlert({error, clearError}){

    const [state,setState] = useState({
        error: null //message, title, code
    });

    useEffect(() => {
        setState(state => {
            return {
                ...state,
                error
            }
        });
    },[error]);

    const showMessage = (error) => {
        swal({
                buttons: {
                    cancel: "Cerrar",
                },
                content: (
                    <div className="text-left">
                        <h4 className="h4 font-weight-bold">{error.title}</h4>
                        <p className="mb-0">{error.message}</p>
                    </div>
                )
        })
        .then(() => {
            clearError();
        })
    }

    return (
        <React.Fragment>
            {(state.error && error) && showMessage(state.error)}
        </React.Fragment>
    );

   
}

function mapStateToProps(state) {
    return {
        error: state.globalReducer.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearError: () =>dispatch(clearError())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorAlert)