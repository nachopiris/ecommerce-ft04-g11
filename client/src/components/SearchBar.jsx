import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

//*******************CONECTADO AL STORE DE REDUX *********************/
export function SearchBar({ searchProducts }) {

  const [search, setSearch] = useState('')
  const [canSearch, setCanSearch] = useState(false)

  const handleInputChange = function (e) {
    let val = e.target.value;
    setSearch(val);
    setCanSearch(false);
  };

  useEffect(() => {
    if (canSearch) {
      searchProducts(search)
    }
  }, [canSearch])

  useEffect(() => {
    window.setTimeout(() => {
      setCanSearch(true);
    }, 800)
  }, [search])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup>
        <FormControl
          placeholder="Buscar..."
          autoFocus={true}
          name="search"
          autoComplete="off"
          onChange={handleInputChange}
        />
        <InputGroup.Append>
          <span class="btn btn-primary">
            <BsSearch />
          </span>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
