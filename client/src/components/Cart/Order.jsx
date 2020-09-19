import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "./order.module.scss";
import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";

const Order = ({
  productId,
  id,
  image,
  title,
  name,
  quantity,
  price,
  stock,
  onDelete,
  quantityChange,
}) => {
  const [quantityInput, setQuantityInput] = React.useState(quantity);

  const restar = () => {
    if (quantityInput > 1) {
      setQuantityInput(quantityInput - 1);
      quantityChange(quantityInput - 1, productId);
    }
  };

  const sumar = () => {
    if (quantityInput < stock) {
      setQuantityInput(quantityInput + 1);
      quantityChange(quantityInput + 1, productId);
    }
  };

  const verifyQuantity = (e) => {
    const inputValue = parseInt(e.target.value);
    let filteredValue;
    if (inputValue <= stock && inputValue > 0) {
      filteredValue = inputValue;
    } else {
      if (!inputValue || inputValue < 1) {
        filteredValue = 1;
      }
      if (inputValue > stock) {
        filteredValue = stock;
      }
    }
    setQuantityInput(filteredValue);
    quantityChange(filteredValue, productId || id);
  };

  return (
    <Col className="mb-3">
      <Card className="border-0">
        <Card.Body className="bg-dark2 text-center">
          <Row>
            <Col xs={3} md={2}>
              <img className="w-75" src={image} />
            </Col>
            <Col>
              <Row>
                <Col xs={6} md={4} className="mb-3 text-left">
                  <Link
                    to={`/productos/${productId || id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>{title || name}</h4>
                  </Link>
                </Col>
                <Col xs={6} md={3} className="mb-3 text-center">
                  <InputGroup size="sm">
                    
                    <InputGroup.Prepend>
                      <Button
                        onClick={() => restar()}
                        variant="dark"
                        className="px-2"
                      >
                        -
                      </Button>
                    </InputGroup.Prepend>
                    <Form.Control
                      className="border-dark"
                      onBlur={(e) => verifyQuantity(e)}
                      type="number"
                      disabled
                      value={quantityInput}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={() => sumar()}
                        variant="dark"
                        className="px-2"
                      >
                        +
                      </Button>
                    </InputGroup.Append>
                    
                  </InputGroup>
                </Col>
                <Col className="text-left">
                  <span class="h6">
                    <NumberFormat
                      prefix="$"
                      value={price}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType={"text"}
                    />
                  </span>
                </Col>
                <Col className="text-left">
                  <Button
                    size="sm"
                    onClick={() => onDelete(productId || id)}
                    variant="danger"
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
