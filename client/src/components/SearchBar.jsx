import React from "react";
import { useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { connect } from "react-redux";
import { getProducts, searchProducts } from "../actions/products";

//******************CONECTADO AL STORE DE REDUX ********************/
export function SearchBar({ search, getProducts, searchProducts }) {
  const handleInputChange = function (e) {
    let searchWord = e.target.value;
    searchProducts(searchWord);
  };

  const handleSearch = function (e) {
    e.preventDefault();
    getProducts(search);
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <FormControl
          placeholder="Buscar..."
          autoFocus={true}
          name="search"
          autoComplete="off"
          onChange={handleInputChange}
        />
        <InputGroup.Append>
          <Button type="submit" variant="primary">
            <BsSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    search: state.productsReducer.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (value) => dispatch(getProducts(value)),
    searchProducts: (value) => dispatch(searchProducts(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
