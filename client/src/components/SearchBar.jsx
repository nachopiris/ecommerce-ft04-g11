import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import {updateSearch} from "../actions/search";
import {connect} from 'react-redux';

//*******************CONECTADO AL STORE DE REDUX *********************/
export function SearchBar({ updateSearch }) {

  const [search, setSearch] = useState('')
  const [canSearch, setCanSearch] = useState(false)

  const handleInputChange = function (e) {
    let val = e.target.value;
    setSearch(val);
    setCanSearch(false);
  };

  useEffect(() => {
    if (canSearch) {
      updateSearch(search)
    }
  }, [canSearch,updateSearch,search])

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
          <span className="btn btn-primary">
            <BsSearch />
          </span>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearch: search => dispatch(updateSearch(search))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
