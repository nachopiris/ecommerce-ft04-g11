import React, {useState, useEffect} from "react";
import NumberFormat from "react-number-format";
import {
  emptyCart,
  changeQuantity,
  deleteItem,
} from "../../actions/users";
import { Link } from "react-router-dom";

import { getProducts } from "../../actions/products";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

import { MdCameraAlt, MdDelete } from "react-icons/md";
import Order from "./Order";
import {
  removeProductToCart,
  changeProductQuantity,
  clearCart
} from "../../actions/guest";

function Cart({cart, token, deleteItem, changeQuantity, emptyCart, guestCart, emptyGuestCart, deleteGuestItem, changeGuestQuantity}){


    const [state,setState] = useState({
      products: [],
      totalCost: 0,
    });

    const handleDelete = id => {
      if(!token) {
        return () => {
          deleteGuestItem(id);
        }
      }
      return () => {
        deleteItem({productId: id, token})
      }
    }

    const handleChangeQuantity = () => {
      if(!token) return changeGuestQuantity;
      return changeQuantity
    }

    const handleEmptyCart = () => {
      if(!token) return emptyGuestCart();
      return emptyCart(token);
    }

    useEffect(() => {
      
      if(!cart.products) return;
      console.log('MOSTRAR CARRITO')
      let products = [];
      let total = 0;
      cart.products.forEach(item => {
        let product = {
          id: item.id,
          name: item.name,
          price: item.orderline.price,
          quantity: item.orderline.quantity,
          stock: item.stock,
          subtotal: item.orderline.price * item.orderline.quantity,
          image: JSON.parse(item.images)[0]
        }
        products.push(product);
        total += product.subtotal;
      });

      if(!token){
        products = guestCart;
        products.map(item => {
          item.subtotal = item.price * item.quantity;
          total += item.subtotal;
          return item;
        });

      }

      setState(state => {
        return {
          ...state,
          products,
          totalCost:total
        }
      });
    },[cart.products,guestCart,token]);


  return (
      <Container>
        <Row className="m-3 d-none d-md-block">
          <Col>
            <Row className="bg-dark text-center py-2">
              <Col xs={3} md={2}>
                <span className="h3">
                  <MdCameraAlt />
                </span>
              </Col>
              <Col>
                <Row>
                  <Col xs={6} md={4} className="text-left">
                    <span className="h6">Producto</span>
                  </Col>
                  <Col xs={6} md={3} className="text-left ml-2">
                    <span className="h6">Cantidad</span>
                  </Col>
                  <Col className="text-left">
                    <span className="h6">Precio</span>
                  </Col>
                  <Col className="text-left ml-4">
                    <span className="h3">
                      <MdDelete />
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        {state.products.length < 1 && (
          <Row>
            <Col className="mx-3">
              <Alert variant="info">
                {" "}
                Lo sentimos, no tienes productos agregados al carrito.{" "}
              </Alert>
            </Col>
          </Row>
        )}
        
        {state.products.map(item => (
           <Order
              key={item.id}
              productId={item.id}
              image={item.image}
              title={item.name}
              quantity={item.quantity}
              price={item.price}
              stock={item.stock}
              onDelete={handleDelete(item.id)}
              quantityChange={handleChangeQuantity()}
              token={token}
            />
        ))}

        {state.products.length > 0 && (
          <Row className="mx-3 py-2 text-center">
            <Col xs={4} className="text-center bg-dark p-3 ml-auto">
              <h4 className="shadow mb-4 py-2">
                Precio total:
                <NumberFormat
                  prefix=" $"
                  value={state.totalCost}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Link to="/comprando" className="btn btn-success mx-3">
                Finalizar Compra
              </Link>
              <Button
                className="btn btn-danger"
                onClick={handleEmptyCart}
              >
                Vaciar Carrito
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
}

function mapStateToProps(state) {
  return {
    cart: state.usersReducer.userCart,
    products: state.productsReducer.products.rows,
    token: state.authReducer.token,
    user: state.authReducer.user,
    guestCart: state.guestReducer.cart,
    totalCost: state.usersReducer.totalCost,
    totalCostGuest: state.guestReducer.totalCost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    emptyCart: (token) => dispatch(emptyCart(token)),
    changeQuantity: (userId, body) => dispatch(changeQuantity(userId, body)),
    deleteItem: (userId, productId) => dispatch(deleteItem(userId, productId)),
    deleteGuestItem: (id) => dispatch(removeProductToCart(id)),
    changeGuestQuantity: (data) => dispatch(changeProductQuantity(data)),
    emptyGuestCart: () => dispatch(clearCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
