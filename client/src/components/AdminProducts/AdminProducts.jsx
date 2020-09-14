import React, { useEffect, useState } from 'react';

//components
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import Create from './Create';
import List from './List';
import Loading from '../Loading';

//actions
import { createProduct, getProducts } from '../../actions/products';
import { getCategories } from '../../actions/categories';
import { switchLoading } from '../../actions/global';
import { connect } from 'react-redux';

function AdminProducts({ switchLoading, products, getProducts, createProduct, getCategories }) {
        const perPage = 12;
        const [state, setState] = useState({
                creating: false,
                products: products.rows,
                totalProducts: products.count,
                currentPage: 1,
                pages: 1,
        });

        const onPaginate = (page) => {
                // switchLoading(true);
                getProducts(null, page);
                console.log(page)
                setState({
                        ...state,
                        currentPage: page
                })
        }
        const handleCreating = () => {
                setState({
                        ...state,
                        creating: !state.creating
                })
        }

        const handleCreate = () => {
                // switchLoading(true);
                handleCreating();
                return attributes => {
                        createProduct(attributes)
                                .then(() => {
                                        getProducts(null, state.currentPage);
                                });
                };
        }

        useEffect(() => {
                switchLoading(true);
                getProducts(null, state.currentPage).then(() => {
                        // switchLoading(false);
                });
                getCategories();
        }, []);

        useEffect(() => {
                // switchLoading(false);
                setState({
                        ...state,
                        products: products.rows,
                        totalProducts: products.count,
                        pages: Math.ceil(products.count / perPage),
                })
        }, [products]);


        return (
                <Container fluid>
                        {/* <Loading /> */}
                        <Create show={state.creating} createProduct={handleCreate} handleClose={handleCreating} />
                        <Row>
                                <Col>
                                        <div className="d-flex p-2 justify-content-between aling-items-center">
                                                <h1>Productos</h1>
                                                <span><Button onClick={handleCreating} variant="info"><FiPlus /> Añadir producto</Button></span>
                                        </div>
                                </Col>
                        </Row>
                        <Row>
                                <Col>
                                        {state.products.length > 0 && <List page={state.currentPage} products={state.products} />}
                                </Col>
                        </Row>

                        {state.pages > 1 && <Row className="justify-content-center mb-4">
                                {state.pages > 0 && (
                                        <ButtonGroup>
                                                {state.currentPage > 1 ? <Button onClick={() => onPaginate(state.currentPage - 1)} variant="primary border-dark2" size="sm">«</Button> : <Button variant="primary border-dark2" disabled size="sm">«</Button>}
                                                {state.currentPage > 1 && <Button onClick={() => onPaginate(1)} variant="primary border-dark2" size="sm">1</Button>}
                                                {state.currentPage > 2 && (
                                                        <React.Fragment>
                                                                {state.currentPage - 2 > 1 && <Button variant="primary border-dark2" disabled>...</Button>}
                                                                <Button variant="primary border-dark2" onClick={() => onPaginate(state.currentPage - 1)} >{state.currentPage - 1}</Button>
                                                        </React.Fragment>
                                                )}
                                                <Button variant="dark2" disabled>{state.currentPage}</Button>
                                                {state.pages - state.currentPage > 1 && (
                                                        <React.Fragment>
                                                                <Button variant="primary border-dark2" onClick={() => onPaginate(state.currentPage + 1)} size="sm">{state.currentPage + 1}</Button>
                                                        </React.Fragment>
                                                )}
                                                {state.currentPage + 2 < state.pages - 1 && (
                                                        <Button variant="primary border-dark2" disabled>...</Button>
                                                )}
                                                {state.pages !== state.currentPage && <Button variant="primary border-dark2" onClick={() => onPaginate(state.pages)} size="sm">{state.pages}</Button>}
                                                {state.currentPage < state.pages ? <Button onClick={() => onPaginate(state.currentPage + 1)} variant="primary border-dark2" size="sm">»</Button> : <Button disabled variant="primary border-dark2" size="sm">»</Button>}

                                        </ButtonGroup>
                                )
                                }
                        </Row >}
                </Container>
        )
}

function mapStateToProps(state) {
        return {
                products: state.productsReducer.products,
                loading: state.globalReducer.loading
        }
}


function mapDispatchToProps(dispatch) {
        return {
                createProduct: (attributes) => dispatch(createProduct(attributes)),
                getCategories: () => dispatch(getCategories()),
                getProducts: (keyword, page) => dispatch(getProducts(keyword, page)),
                switchLoading: (isLoading) => dispatch(switchLoading(isLoading))
                // addCategoryToProduct: (idCat, idProduct) => dispatch(addCategoryToProduct(idCat, idProduct)),
                // deleteCategoryToProduct: (idCat, idProduct) => dispatch(deleteCategoryToProduct(idCat, idProduct)),
                //updateProduct: (idProduct, attributes) => dispatch(updateProduct(idProduct, attributes))

        }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(AdminProducts);