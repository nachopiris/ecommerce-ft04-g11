import React, { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Container, Row, Col, Card } from 'react-bootstrap'
import { processOrder } from '../actions/checkout';
import { connect } from 'react-redux'
import {FaCheckCircle} from 'react-icons/fa'

const Success = ({token, processOrder}) => {

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
        processOrder(token, orderId).then(response => {
            if(response.data !== undefined){
              window.location.replace("http://localhost:3000/cuenta",'_self');
            }
        })
      }
    }, [processOrder,token,query])

    return (
      <React.Fragment>
        {state.products.length > 0 && 
        <Container>
        <Row className="justify-content-center">
          <Col md={8}>
                <Card className="bg-dark2 text-center">
                  <Card.Header><span className="h3 text-success"><FaCheckCircle /> </span><h3 className="d-inline">Pago Aprobado!</h3></Card.Header>
                  <Card.Body>
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
        processOrder: (token, orderId) => dispatch(processOrder(token, orderId))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Success)