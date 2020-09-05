import React from 'react';
import s from './productCard.module.scss';
import {Card, Col, Button, Badge} from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import NumberFormat from 'react-number-format';

export default function ProductCard({name,price,img}) {
    const MAX_NAME_LENGTH = 40
    if(name.length > MAX_NAME_LENGTH){
        name = name.substring(0,MAX_NAME_LENGTH - 3) + '...';
    }
    return (
        <Col xl="2" md="3" sm="4" xs="6" className="mb-4">
            <div className={s.card}>
                <Card className={'border-0 bg-dark rounded-0 ' + s['card-bootstrap']}>
                    
                    
                    <Card.Body className={s['card-bootstrap-body'] + ' p-0'}>
                        <a href="#" className={s['cover-image']}>
                            <img
                                src={img} alt=""
                                title=""
                            />

                            <div className={s['product-title'] + ' position-absolute p-2'}>
                                <p className={'mb-0 text-uppercase ' + s['card-title']}>{name}</p>
                            </div>
                        </a>
                    </Card.Body>
                    <Card.Footer className="border-0 d-flex align-items-center py-1 bg-dark2 px-1 justify-content-between">
                            <span className={s.price + ' ml-2'}>
                                <NumberFormat prefix="$" value={price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} decimalSeparator={','} thousandSeparator={'.'} />
                            </span>
                            <Button variant="outline-light border-0" size="sm"><CgShoppingCart /></Button>
                    </Card.Footer>
                </Card>
            </div>
        </Col>
    );
}