import React, {useEffect, useState} from "react";
import s from "./productCard.module.scss";
import { Card, Col, Button } from "react-bootstrap";
import { CgShoppingCart } from "react-icons/cg";
import { FiCheck } from 'react-icons/fi';
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

export function ProductCard({ product: { id, name, price, images, stock }, setToCart, userCart, guestCart, isGuest, token}) {
  var img = JSON.parse(images)[0];

  const [state, setState] = useState({
    isAdded: false
  });
  
  useEffect(()=>{
    if(!Array.isArray(userCart.products)) return;
    if(isGuest){
      setState({...state,isAdded:guestCart.find(item => item.id === id) ? true : false})
    }else{
      setState(state => {
        return {
          ...state,
          isAdded: userCart.products.find(item => item.id === id) ? true : false
        }
      })
    }
  },[userCart.products, guestCart,id,isGuest])


  const MAX_NAME_LENGTH = 40;
  if (name.length > MAX_NAME_LENGTH) {
    name = name.substring(0, MAX_NAME_LENGTH - 3) + "...";
  }

  const handleSetToCart = () => {
    if(isGuest){
      return () => setToCart({id, name, price, image: img, quantity: 1, stock})
    }
      return () => setToCart({productId: id, token, quantity: 1})
  }

  return (
    <Col xl="2" md="3" sm="4" xs="6" className="mb-4">
      <div className={s.card}>
        <Card
          className={"border-0 bg-dark rounded-0 shadow " + s["card-bootstrap"]}
        >
          <Card.Body className={s["card-bootstrap-body"] + " p-0"}>
            <Link to={"/productos/" + id} className={s["cover-image"]}>
              <img src={img} alt="" title="" />

              <div className={s["product-title"] + " position-absolute p-2"}>
                <p className={"mb-0 text-uppercase " + s["card-title"]}>
                  {name}
                </p>
              </div>
            </Link>
          </Card.Body>
          <Card.Footer className="border-0 d-flex align-items-center py-1 bg-dark2 px-1 justify-content-between">
            <span className={s.price + " ml-2"}>
              <NumberFormat
                prefix="$"
                value={price}
                decimalScale={2}
                fixedDecimalScale={true}
                displayType={"text"}
              />
            </span>
            {stock > 0 && !state.isAdded && <Button onClick={handleSetToCart()} variant="outline-light border-0" size="sm">
              <CgShoppingCart />
            </Button>}

            {state.isAdded && <Link to="/carrito" className="btn btn-outline-light btn-sm border-0">
              <span className="text-primary"><FiCheck /></span>
              <CgShoppingCart />
            </Link>}

            {stock < 1 && <Button disabled variant="outline-danger border-0" size="sm">
              <CgShoppingCart />
              <small>Agotado</small>
            </Button>}
          </Card.Footer>
        </Card>
      </div>
    </Col>
  );
}

function mapStateToProps(state){
  return {
    userCart: state.usersReducer.userCart
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);