import React, {useState, useEffect} from "react";
import NumberFormat from "react-number-format";
import {
  getUserCart,
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
  clearCart,
} from "../../actions/guest";

function Cart({getCart, cart, token, deleteItem, changeQuantity, emptyCart}){

    // this.delete = this.delete.bind(this);
    // this.quantityChange = this.quantityChange.bind(this);
    // this.deleteAll = this.deleteAll.bind(this);

    const [state,setState] = useState({
      products: [],
      totalCost: 0,
    });

    useEffect(()=> {
      getCart(token);
    },[]);


    const handleDelete = id => {
      return () => {
        deleteItem({productId: id, token})
      }
    }

    useEffect(() => {
      if(!cart.products) return;
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
      setState({
        ...state,
        products,
        totalCost:total
      });
    },[cart.products]);

  // componentDidMount() {
  //   if (!!this.props.token) {
  //     this.props.getUserCart(1).then(() => {
  //       if (this.props.orders.length) {
  //         this.getCartProducts();
  //       }
  //     });
  //   }
  //   this.getCartProducts();
  // }

  // getCartProducts() {
  //   if (!!this.props.token) {
  //     let productsIds = [];
  //     this.props.orders.forEach((order) => {
  //       productsIds.push(order.productId);
  //     });
  //     this.props.getProducts().then(() => {
  //       const cartProducts = this.props.products.filter((product) =>
  //         productsIds.includes(product.id)
  //       );
  //       this.setState({
  //         cartProducts: cartProducts,
  //         totalCost: this.props.totalCost,
  //       });
  //     });
  //   } else {
  //     this.setState({
  //       cartProducts: this.props.guestCart,
  //     });
  //   }
  // }

  // quantityChange(quantity, productId) {
  //   if (!!this.props.token) {
  //     const body = {
  //       idProduct: productId,
  //       quantityProduct: quantity,
  //     };
  //     this.props.changeQuantity(1, body);
  //   } else {
  //     this.props.changeGuestQuantity({ id: productId, quantity });
  //   }
  // }

  // delete(productId) {
  //   if (!!this.props.token) {
  //     this.props.deleteItem(1, productId).then(() => {
  //       const products = this.state.cartProducts;
  //       const productToRemove = products.findIndex(
  //         (product) => product.id === productId
  //       );
  //       products.splice(productToRemove, 1);
  //       this.setState({
  //         cartProducts: products,
  //       });
  //     });
  //   } else {
  //     this.props.deleteGuestItem(productId);
  //     const products = this.state.cartProducts;
  //     const productToRemove = products.findIndex(
  //       (product) => product.id === productId
  //     );
  //     products.splice(productToRemove, 1);
  //     this.setState({
  //       cartProducts: products,
  //     });
  //   }
  // }

  // deleteAll() {
  //   if (!!this.props.token) {
  //     this.props.emptyCart(1).then(() => {
  //       this.setState({
  //         cartProducts: [],
  //       });
  //     });
  //   } else {
  //     this.props.emptyGuestCart();
  //     this.setState({
  //       cartProducts: [],
  //     });
  //   }
  // }

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
              quantityChange={changeQuantity}
              token={token}
            />
        ))}

        {state.products.length > 0 && (
          <Row className="mx-3 py-2">
            <Col>
              <Button
                className="btn btn-danger"
                onClick={() => emptyCart(token)}
              >
                Vaciar Carrito
              </Button>
            </Col>
            <Col className="text-right">
              <h4>
                Precio total:
                <NumberFormat
                  prefix=" $"
                  value={
                    !!token
                      ? state.totalCost
                      : 0
                  }
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Link to="/comprando" className="btn btn-success mx-3">
                Finalizar Compra
              </Link>
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
    getCart: (token) => dispatch(getUserCart(token)),
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
