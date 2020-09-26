import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createCategory } from "../actions/categories";

const AddCategory = ({ createCategory }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({
      name: e.target.name.value,
      description: e.target.description.value,
    });
    window.alert("Categoria Creada");
    e.target.name.value = "";
    e.target.name.focus();
    e.target.description.value = "";
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card className="border-0 bg-dark2">
            <Card.Header className="bg-dark2">
              <h3>Crear Categoria</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Nombre de la Categoria</Form.Label>
                  <Form.Control
                    autoFocus
                    autoComplete="off"
                    type="text"
                    placeholder="Nombre"
                    name="name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="textarea"
                    placeholder="Descripcion"
                    name="description"
                  />
                </Form.Group>
                <Button variant="primary px-4" block type="submit">
                  Crear
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCategory: (attributes) => dispatch(createCategory(attributes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
