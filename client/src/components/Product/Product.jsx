import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Col, Card, Carousel, Button} from 'react-bootstrap';
import s from './product.module.scss';
import { CgShoppingCart } from 'react-icons/cg';
import NumberFormat from 'react-number-format';


const Product = () => {
  const { id } = useParams();

  const [{product},setProduct] = useState({});

  useEffect(() => {
    if(!product){
      Axios.get('http://localhost:3001/products/'+id)
      .then(res => res.data)
      .then(res => {
        if (res.data) {
        res.data.images = JSON.parse(res.data.images);
        setProduct({product: res})
        }
        else {
          return res.errors;
        }
      })
    }
  },[]);

  return(
    <Container>
      {product ? (
        <React.Fragment>

          <Row>
            <Col md={7} className="mb-4">
              <Carousel className={s['bootstrap-carousel'] + ' m-auto'}>
                {product.data.images.map((image, index) => (
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


                      <h1>{product.data.name}</h1>

                      <span className={'text-uppercase ' + s['text-muted']}>Categorías: </span>
                      <br />
                      {product.data.categories.map(item => (
                        <Link to="#" className="text-muted2 m-1 badge badge-dark2 badge-pill">{item.name}</Link>
                      ))}

                    </Card.Body>

                    <Card.Footer className="border-0 bg-dark2">
                      <div className="mb-4 mt-2 text-center">
                        <span className={s.price}>
                            <NumberFormat prefix="$" value={product.data.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} />
                        </span>
                        <br />
                        <span className={s['text-muted'] + ' text-uppercase'}>
                          Stock: {product.data.stock}
                        </span>
                      </div>
                      <Row>
                        <Col className="col-3">
                          <input value="1" min="1" max={product.data.stock} type="number" className={'bg-dark form-control ' + s['input-quantity']} />
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
                        {product.data.description}
                      </p>
                    </Card.Body>
                  </Card>
            </Col>

          </Row>

        </React.Fragment>
      ) : (<React.Fragment>
        <h2>No existe el producto</h2>
      </React.Fragment>)}
    </Container>
  );
}

export default Product;