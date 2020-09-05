import React from 'react';
import ProductCard from './ProductCard/ProductCard'
import style from '../styles/catalogue.module.scss'

export default function Catalogue({ products }) {
    return (
        <div className={style.catalogue}>
            {
                products.map( product => {
                    return (
                        <ProductCard product={product}/>
                    )
                })
            }
        </div>
    );
} 