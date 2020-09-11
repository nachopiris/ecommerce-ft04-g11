import React, { useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import style from "../styles/catalogue.module.scss";
import axios from "axios";
import { getProducts, filterByCategory } from "../actions/products";
import { getCategories } from "../actions/categories";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Alert, Card } from "react-bootstrap";
import SearchBar from "./SearchBar";

//******************CONECTADO AL STORE DE REDUX ********************/
export function Catalogue({
  products,
  categories,
  getCategories,
  getProducts,
  filterByCategory,
}) {
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  function getFilterCategories(e) {
    let nombreCat = e.target.value;
    if (!nombreCat) {
      return getProducts();
    }
    filterByCategory(nombreCat);
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mb-4">
          <Card className="bg-transparent border-0">
            <Card.Body>
              <Row>
                <Col sm={4} className="my-1">
                  {categories && (
                    <Form.Control
                      onChange={getFilterCategories}
                      as="select"
                      custom
                    >
                      <option key={0} value="">
                        {" "}
                        Cualquier categoría{" "}
                      </option>
                      {categories.map((e, i) => {
                        return <option key={e.id}> {e.name} </option>;
                      })}
                    </Form.Control>
                  )}
                </Col>
                <Col sm={8} className="my-1">
                  <SearchBar />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className={style.catalogue}>
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}

        {!products.length && (
          <Col>
            <Alert variant="info">
              {" "}
              Lo sentimos, no encontramos productos que coincidan con la
              busqueda.{" "}
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    products: state.productsReducer.products,
    categories: state.categoriesReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (value) => dispatch(getProducts(value)),
    filterByCategory: (value) => dispatch(filterByCategory(value)),
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
