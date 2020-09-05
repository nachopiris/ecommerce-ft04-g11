import React from 'react';
import { useEffect } from 'react';
import {Form, Button, Col, Row, FormControl, InputGroup} from 'react-bootstrap';
import  {BsSearch} from 'react-icons/bs';
import s from '../styles/searchBar.module.scss'

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
            <InputGroup className="mb-3">
                <input
                    placeholder="Buscar..."
                    autoFocus={true}
                    name="search"
                    value={input.search}
                    autoComplete='off'
                    className={s['input-search'] + ' form-control'}
                    onChange={handleInputChange}
                />
                <InputGroup.Append>
                    <Button type="submit" variant="primary"><BsSearch /></Button>
                </InputGroup.Append>
            </InputGroup>

        </Form>
    );
}

export default SearchBar;