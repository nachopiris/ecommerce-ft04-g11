import {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {getUserCart} from '../actions/users';

function CartHandler({getCart,token}){

    useEffect(()=> {
        if(!!token){
            getCart(token);
        }
    },[getCart, token]);


    return null;
}

function mapStateToProps(state){
    return {
        token: state.authReducer.token
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCart: token => dispatch(getUserCart(token))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartHandler);