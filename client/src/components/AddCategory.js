import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import { createCategory } from '../actions/categories';

const AddCategory = ({createCategory}) => {


    const handleSubmit = (e) => {
        e.preventDefault()
        createCategory({name: e.target.name.value , description: e.target.description.value});
        let confirm= window.confirm('Categoria Creada');
        window.location.reload(true);

    }


    return (
            <Card style={{width: '400px'}}>
                <Card.Header>
                    <h3>Crear Categoria</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Nombre de la Categoria
                            </Form.Label>
                            <Form.Control  type="text" placeholder="Nombre" name="name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Descripcion
                            </Form.Label>
                            <Form.Control  type="textarea" placeholder="Descripcion" name="description"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Crear</Button>
                    </Form>
                </Card.Body>
            </Card>
    )
}

function mapStateToProps(state){
    return {
        categories: state.categoriesReducer.categories
    }
}

function mapDispatchToProps(dispatch){
    return {
        createCategory: attributes => dispatch(createCategory(attributes)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategory);