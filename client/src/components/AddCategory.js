import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';

const AddCategory = () => {

    const [inputs, setInputs] = useState({
        name: '',
        description: ''
    });
    

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
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
                            <Form.Control value={inputs.name} onChange={handleInputChange} type="text" placeholder="Nombre" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Descripcion
                            </Form.Label>
                            <Form.Control value={inputs.description} onChange={handleInputChange} type="textarea" placeholder="Descripcion" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Crear</Button>
                    </Form>
                </Card.Body>
            </Card>
    )
}

export default AddCategory;