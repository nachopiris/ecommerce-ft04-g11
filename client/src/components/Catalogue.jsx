import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard/ProductCard';
import style from '../styles/catalogue.module.scss';
import axios from 'axios'; 
import { getProducts, filterByCategory } from '../actions/products';
import {connect} from 'react-redux';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import SearchBar from './SearchBar';


export function Catalogue({ products, getProducts, filterByCategory}) {

    const [{categories},setCategories] = useState([]);
    const [{filterProducts},setFilterProducts] = useState({});

    function getCategories(){
        axios.get('http://localhost:3001/categories')
            .then((res)=>{
                setCategories({categories: res.data.data});                
            })
            .catch(()=>{
                Error ("Error to recive data");
            })
    };

    useEffect(() => {
        if(!categories){
                getCategories();
        }
        getProducts();
      },[]);
    
    function getFilterCategories(e){
        let nombreCat = e.target.value;
        console.log(nombreCat)
        if(!nombreCat){
            return getProducts();
        }
        filterByCategory(nombreCat)
    }

    function getProductsByKeyword(){
        return getProducts;
    }  

    return (
        <Container>
            <Row>
                <Col>
                {categories && (   
                    <div>  
                                

                            <Form.Control
                                onChange={getFilterCategories}
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                custom
                            >
                                <option key={0} value=""> Cualquier categoría </option>
                                {categories.map((e, i) => {
                                            return (
                                                <option key={e.id}> {e.name} </option>
                                            
                                            )
                                        }
                                    )}
                            </Form.Control>
                    </div>  
                )} 
                </Col>
                <Col sm={8}>
                    <SearchBar searchProducts={getProducts} />
                </Col>
            </Row>
            <Row className={style.catalogue}>
                {
                    products.map( (product, index) => {
                        return (
                            <ProductCard key={index} product={product}/>
                        )
                    })
                }

                {
                    !products.length && (
                        <Col>
                            <Alert variant="info"> Lo sentimos, no encontramos productos que coincidan con la busqueda. </Alert>
                        </Col>
                    )
                }
                
                {filterProducts && (
                    <div>                  
                        {
                            filterProducts.map((e,i) => {
                                return (
                                    <ul key={e.id} >
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
            </Row>
        </Container>
    );
}  

function mapStateToProps(state){
    return {
        products: state.productsReducer.products
    }
}

function mapDispatchToProps(dispatch){
    return {
        getProducts: (value) => dispatch(getProducts(value)),
        filterByCategory: value => dispatch(filterByCategory(value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalogue);