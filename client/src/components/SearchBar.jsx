import React from 'react';
import { useEffect } from 'react';

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
        <form className="row" onSubmit={handleSearch}>
            <div className="col-10 p-2">
                <input
                    autoFocus={true}
                    name="search"
                    value={input.search}
                    placeholder="Buscar..."
                    className="form-control"
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-2 p-2">
                <button type="submit">
                    Buscar
                </button>
            </div>
        </form>
    );
}

export default SearchBar;