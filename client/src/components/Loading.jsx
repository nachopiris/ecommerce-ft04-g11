import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import s from '../styles/loading.module.scss';

function Loading({ loading }) {
        console.log('Loading: ' + loading);
        const [current, setCurrent] = useState('show');

        useEffect(() => {
                setCurrent(loading ? 'show' : 'hidden')
        }, [loading]);
        return (
                <div className={s['container'] + ' ' + s[current]}>
                        Cargando...
                </div >
        )
}

function mapStateToProps(state) {
        return {
                loading: state.globalReducer.loading
        }
}

function mapDispatchToProps(dispatch) {
        return {

        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)