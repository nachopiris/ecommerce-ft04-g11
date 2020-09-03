import React from 'react';
import s from './productCard.module.scss';
import {Card, Col, Button, Badge} from 'react-bootstrap';

export default function ProductCard({name,price,img}) {
    return (
        <Col md="3" className="mb-4">
            <Card className={'h-100 bg-dark shadow ' + s.card}>
                
                <div className={'rounded ' + s['cover-image']}>
                    <img
                        src={img} alt=""
                        title=""
                    />
                </div>
                <Card.Body>
                    <p className="mb-0 text-uppercase">{name}</p>
                </Card.Body>
                <Card.Footer className="border-0 bg-transparent text-right">
                    <span className="lead font-weight-bold text-success">${price}</span>
                    <Button variant="primary" size="lg" block>Agregar al carrito</Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}