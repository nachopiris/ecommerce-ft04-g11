import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/users';
import { Container, Row, Col } from 'react-bootstrap'

function Users({ getUsers, allUsers }) {

    useEffect(() => {
        getUsers();
    }, []);

    console.log(allUsers)
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="d-flex p-2 justify-content-between aling-items-center">
                        <h1>Usuarios</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="table-responsive" >
                        <table className="table table-dark table-sm table-striped table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Usuario N°</th>
                                    <th>Nombre completo</th>
                                    <th>Correo electrónico</th>
                                    <th>Rol</th>
                                    <th>Registrado</th>
                                    <th>Modificado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers && allUsers.map((user, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{user.id}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            {/* Acá cambiamos el texto del valor recibido */}
                                            <td>{user.role === "client" && ("Usuario") ||
                                                user.role === "admin" && ("Administrador")}</td>
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                            <td>{user.createdAt.substr(11, 8) + " - " + user.createdAt.substr(8, 2) + "/" + user.createdAt.substr(5, 2) + "/" + user.createdAt.substr(0, 4)}</td>
                                            <td>{user.updatedAt.substr(11, 8) + " - " + user.updatedAt.substr(8, 2) + "/" + user.updatedAt.substr(5, 2) + "/" + user.updatedAt.substr(0, 4)}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                        {!allUsers && (<div className="alert alert-info">No hay usuarios registrados.</div>)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        allUsers: state.usersReducer.users,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);