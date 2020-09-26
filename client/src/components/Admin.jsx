import React from 'react';
import { connect } from 'react-redux';
import Error404 from './Error404'

export function Admin({ auth }) {
    const { user } = auth;

    return user.role === 'admin' ? (
        <h2>Bienvenido { user.fullname}</h2>
    )
        : (<Error404 />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);