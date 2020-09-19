import React from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { FiUser } from "react-icons/fi";

function Account({ auth }) {
    const { user, token } = auth;
    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="align-items-center d-flex">
                        <FiUser class="mr-2" /> Mi cuenta
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col md={4} lg={3}>
                    <Card className="bg-dark2 border-0 shadow">
                        <Card.Body className="text-center">
                            <img
                                width="128"
                                height="128"
                                className="rounded-circle mb-2"
                                src="https://image.freepik.com/vector-gratis/gamer-girl-character-esport-plantilla-logotipo_162048-110.jpg"
                            />
                            <Card.Title>{user.fullname}</Card.Title>
                            <Button variant="primary" onClick={() => logOut()}>Cerrar sesión</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Card className="bg-dark2">
                                <Card.Header className>
                                    <Nav
                                        className="border-0"
                                        justify
                                        variant="tabs"
                                        defaultActiveKey="/home"
                                    >
                                        <Nav.Item>
                                            <Nav.Link eventKey="/home">
                                                Ordenes
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1">
                                                Mis datos
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body className="bg-default"></Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
