import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export function LogOutRoute({ auth, component }) {
    const { token } = auth;
    const Component = component;
    return token ? (
        <Redirect to="/cuenta" />
    ) :
        (<Component />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOutRoute);