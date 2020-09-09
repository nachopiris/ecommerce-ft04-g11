import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Col, Card, Carousel, Button} from 'react-bootstrap';
import s from './product.module.scss';
import { CgShoppingCart } from 'react-icons/cg';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import { getProduct } from '../../actions/products';

//***************CONECTADO AL STORE DE REDUX ********************/
export function Product ({product, getProduct}) {
  const { id } = useParams();

  useEffect(() => {

    getProduct(id);
  },[]);

  return(
    <Container>
      {product && (
        <React.Fragment>

          <Row>
            <Col md={7} className="mb-4">
              <Carousel className={s['bootstrap-carousel'] + ' m-auto'}>
              {product.images &&  JSON.parse(product.images).map((image, index) => (
                  <Carousel.Item key={index}>
                    <div className={s['cover-image'] + ' rounded bg-dark'}>
                      <img src={image} />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col className="mb-4">
                  <Card className={"bg-dark border-0 " + s['card-price']}>

                    <Card.Body>


                      <h1>{product.name}</h1>

                      <span className={'text-uppercase ' + s['text-muted']}>Categorías: </span>

                    </Card.Body>

                    <Card.Footer className="border-0 bg-dark2">
                      <div className="mb-4 mt-2 text-center">
                        <span className={s.price}>
                            <NumberFormat prefix="$" value={product.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} />
                        </span>
                        <br />
                        <span className={s['text-muted'] + ' text-uppercase'}>
                          Stock: {product.stock}
                        </span>
                      </div>
                      <Row>
                        <Col className="col-3">
                          <input value="1" min="1" max={product.stock} type="number" className={'bg-dark form-control ' + s['input-quantity']} />
                        </Col>
                        <Col>
                          <Button size="lg" block variant="success">
                            <CgShoppingCart className="mr-1" />
                            Agregar al carrito
                          </Button>
                        </Col>
                      </Row>
                    </Card.Footer>

                  </Card>
            </Col>
          </Row>

          <Row>

            <Col className="mb-5">
                  <Card className="border-0 bg-dark">
                    <Card.Header>
                      Descripción
                    </Card.Header>
                    <Card.Body>
                      <p className="lead">
                        {product.description}
                      </p>
                    </Card.Body>
                  </Card>
            </Col>

          </Row>

        </React.Fragment>
      )}
    </Container>
  );
}

function mapStateToProps(state){
  return {
    product: state.productsReducer.product
  }
}

function mapDispatchToProps(dispatch){
  return {
    getProduct: (value) => dispatch(getProduct(value)),
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
