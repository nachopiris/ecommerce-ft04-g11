import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard/ProductCard';
import style from '../styles/catalogue.module.scss';
import axios from 'axios'; 


export default function Catalogue({ products }) {

    const [{categories},setCategories] = useState([]);
    const [{filterProducts},setFilterProducts] = useState({});

    function getCategories(){
        axios.get('http://localhost:3001/categories')
            .then((res)=>{
                setCategories({categories: res.data.data});
                console.log('esta es la respuesta guardada en categorias');
                
            })
            .catch(()=>{
                Error ("Error to recive data");
            })
    };

    useEffect(() => {
        if(!categories){
                getCategories();
        }
      },[]);
    
    function getFilterCategories(e){
       
        let nombreCat = e.target.value;

        axios.get('http://localhost:3001/categories/_filterforcategoriescomponent/'+nombreCat)
            .then((res) =>{
                setFilterProducts({filterProducts: res.data[0].products});
                console.log('esta es la respuesta de los productos filtrados por categoria'); 
                console.log (res.data[0].products);
            })
            .catch(()=>{
                Error ("Error to recive data");
            })
        


    }  

    return (
        <div className={style.catalogue}>
            {/* {
                products.map( product => {
                    return (
                        <ProductCard product={product}/>
                    )
                })
            } */}
             

            {/* ESTE ES EL SELECT CON LAS CATEGORIAS TRAIDAS DE LA BASE DE DATOS, 
                PARA FILTRAR LOS PRODUCTOS SEGUN LA CATEGORIA ELEGIDA*/}
            {categories && (   
                <div>
                        <select onChange={getFilterCategories}>      
                        {
                            categories.map((e, i) => {
                                    return (
                                        <option key={e.id} > {e.name} </option>
                                    )
                                }
                            )
                        } {console.log(categories)} 

                        </select>
                </div>  
            )} 

               {/* SE MUESTRAN LOS PRODUCTOS FILTRADOS POR LA CATEGORIA ELEGIDA */}
            {filterProducts && (
                <div>                  
                    {
                        filterProducts.map((e,i) => {
                            return (
                                <ul>
                                   <li>     
                                        <h3> {e.name} </h3>
                                        <h6> {e.description} </h6>
                                        <h6> {e.price} </h6>
                                        <h6> <img src={e.images[0]}   title={e.images} />  </h6>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
}  