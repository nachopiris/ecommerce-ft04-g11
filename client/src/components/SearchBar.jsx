import React from 'react';
import { useEffect } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

export function SearchBar({searchProducts}) {

    const handleInputChange = function(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

   
    const [input, setInput] = React.useState({
        search: ''
    });

    const handleSearch = function(e){
        e.preventDefault();
        searchProducts(input.search);
    }

    useEffect(() => {
    },[])

    return (
        <Form onSubmit={handleSearch}>
            <Form.Group className="row p-2">
                <Col className="col-10">
                    <input
                        autoFocus={true}
                        name="search"
                        value={input.search}
                        placeholder="Buscar..."
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </Col>
                <Col>
                    <Button type="submit" variant="primary" block>Buscar</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default SearchBar;