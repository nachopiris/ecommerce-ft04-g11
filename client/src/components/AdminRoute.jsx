import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Error404 from './Error404';

export function AdminRoute({ auth, component }) {
    const { user } = auth;
    const Component = component;
    return user.role === 'admin' ? (
        <Component />
    ) :
        (<Error404 />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);