import React from "react";
import {
  getUserCart,
  emptyCart,
  changeQuantity,
  deleteItem,
} from "../../actions/users";
import { Link } from 'react-router-dom';

import { getProducts } from "../../actions/products";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

import { MdCameraAlt, MdDelete } from "react-icons/md";
import Order from "./Order";
import { removeProductToCart, changeProductQuantity, clearCart } from "../../actions/guest";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.deleteAll = this.deleteAll.bind(this);

    this.state = {
      cartProducts: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('okk')
  }
  componentDidMount() {
    if(!!this.props.token){
      this.props.getUserCart(1).then(() => {
        if (this.props.orders.length) {
          this.getCartProducts();
        }
      });
    }
    this.getCartProducts();
  }

  getCartProducts() {
    if(!!this.props.token){
      let productsIds = [];
      this.props.orders.forEach((order) => {
        productsIds.push(order.productId);
      });
      this.props.getProducts().then(() => {
        const cartProducts = this.props.products.filter((product) =>
          productsIds.includes(product.id)
        );
        this.setState({
          cartProducts: cartProducts,
        });
      });
    }else{
      this.setState({
        cartProducts: this.props.guestCart,
      });
    }
  
  }

  quantityChange(quantity, productId) {
    if(!!this.props.token){
      const body = {
        idProduct: productId,
        quantityProduct: quantity,
      };
      this.props.changeQuantity(1, body);
    }else{
      this.props.changeGuestQuantity({id: productId, quantity});
    }
  }

  delete(productId) {
    if(!!this.props.token){
      this.props.deleteItem(1, productId).then(() => {
        const products = this.state.cartProducts;
        const productToRemove = products.findIndex(
          (product) => product.id === productId
        );
        products.splice(productToRemove, 1);
        this.setState({
          cartProducts: products,
        });
      });
    }else{
      this.props.deleteGuestItem(productId);
      const products = this.state.cartProducts;
      const productToRemove = products.findIndex(
        (product) => product.id === productId
      );
      products.splice(productToRemove, 1);
      this.setState({
        cartProducts: products,
      });
    }
  }

  deleteAll() {
    if(!!this.props.token){
      this.props.emptyCart(1).then(() => {
        this.setState({
          cartProducts: [],
        });
      });
    }else{
      this.props.emptyGuestCart();
      this.setState({
        cartProducts: [],
      });
    }
  }

  render() {
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
        {!this.state.cartProducts.length && (
          <Row>
            <Col className="mx-3">
              <Alert variant="info">
                {" "}
                Lo sentimos, no tienes productos agregados al carrito.{" "}
              </Alert>
            </Col>
          </Row>
        )}
        {this.state.cartProducts.map((product, index) => {
          if (this.props.guestCart.length || this.props.orders.length) {
            console.log('ff')
            const findOrder = this.props.orders.find(
              (order) => order.productId === product.id
            );
            return (
              <Order
                key={index}
                productId={product.id}
                image={product.images ? JSON.parse(product.images)[0] : product.image}
                title={product.name}
                quantity={!!this.props.token && findOrder ? findOrder.quantity : product.quantity}
                price={product.price}
                stock={product.stock}
                onDelete={this.delete}
                quantityChange={this.quantityChange}
              />
            );
          }
        })}
        {this.state.cartProducts.length !== 0 && (
          <Row>
            <Col className="text-right">
              <Button
                className="btn btn-danger"
                onClick={() => this.deleteAll()}
              >
                Vaciar Carrito
              </Button>
              <Link to="/comprando" className="btn btn-success mx-3">Pagar</Link>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.usersReducer.userCart,
    products: state.productsReducer.products.rows,
    token: state.authReducer.token,
    user: state.authReducer.user,
    guestCart: state.guestReducer.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserCart: (userId) => dispatch(getUserCart(userId)),
    getProducts: () => dispatch(getProducts()),
    emptyCart: (userId) => dispatch(emptyCart(userId)),
    changeQuantity: (userId, body) => dispatch(changeQuantity(userId, body)),
    deleteItem: (userId, productId) => dispatch(deleteItem(userId, productId)),
    deleteGuestItem: (id) => dispatch(removeProductToCart(id)),
    changeGuestQuantity: (data) => dispatch(changeProductQuantity(data)),
    emptyGuestCart: () => dispatch(clearCart())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
