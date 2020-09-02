import React from 'react';

class AddCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Nombre de la categoria:</label><br />
                    <input type="text" name="name" onChange={(e) => this.handleChange(e)} placeholder="Nombre de categoria" /><br />
                    <label>Descripcion:</label><br />
                    <input type="text" name="description" onChange={(e) => this.handleChange(e)} placeholder="Descripcion" /><br />
                    <button type="submit">Crear</button>
                </form>
            </div>
        );
    };
};

export default AddCategory;