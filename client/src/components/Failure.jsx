import React, { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Container, Row, Col, Card } from 'react-bootstrap';
import {getNotPayedOrder} from '../actions/payment'
import {FaTimesCircle} from 'react-icons/fa';
import {connect} from 'react-redux'

const Failure = ({token, getNotPayedOrder}) => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    
    const query = useQuery()

    const [ state, setState ] = React.useState({
        products: []
    })

    useEffect(() => {
        if (query.get('external_reference')) {
        const orderId = query.get('external_reference').split('_')[1]
        getNotPayedOrder(token, orderId).then(response => {
            setState({
                ...state,
                products: response.data.order.products
            })
        })
      }
    }, [])

    return (
        <React.Fragment>
        {state.products.length > 0 && <Container>
        <Row className="justify-content-center">
          <Col md={8}>
                <Card className="bg-dark2 text-center">
                  <Card.Header><span className="h3 text-danger"><FaTimesCircle /> </span><h3 className="d-inline">Pago Rechazado!</h3></Card.Header>
                  <Card.Body>
                    <div className="w-75 m-auto pb-4">
                        Lamentablemente no se aprobo tu pago, igualmente la orden quedo guardada en tu cuenta para que vuelvas a intentarlo mas tarde
                    </div>
                    <div className="w-75 m-auto pb-4">
                      {state.products.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 shadow d-flex justify-content-between"
                        >
                          <span>
                            <span className="text-muted">{item.name}</span>{" "}
                            <span className="badge badge-dark">
                              {item.orderline.quantity} x ${item.orderline.price}
                            </span>
                          </span>
                          <span>${item.orderline.quantity * parseFloat(item.orderline.price)}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center p-4">
                    <Link to="/cuenta">Ir a mis cuenta</Link>
                  </Card.Footer>
                </Card>
          </Col>
        </Row>
      </Container>}
      </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
    token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotPayedOrder: (token, orderId) => dispatch(getNotPayedOrder(token, orderId))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Failure)