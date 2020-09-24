import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Error404 from './Error404';

export function AdminRoute({ auth, component, path }) {
    const { user } = auth;
    return user.role === 'admin' ? (
        <Route exact path={path} component={component} />
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