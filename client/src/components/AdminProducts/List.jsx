import React, { useEffect } from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';

function List({ products, page }) {

        return (
                <Table striped bordered hover responsive size="sm" variant="dark">
                        <thead>
                                <tr>
                                        <th>Image</th>
                                        <th>Título</th>
                                        <th>Stock</th>
                                        <th>Precio</th>
                                        <th>Acción</th>
                                </tr>
                        </thead>
                        <tbody>
                                {products.map((item, index) => (
                                        <ItemList key={index} page={page} product={item} />
                                ))}
                        </tbody>
                </Table>
        )
}

export default List