import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, updateUser, giveAdminRights, giveUserRights, deleteUser } from '../../actions/users';
import moment from 'moment';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import { FiTrash2, FiEdit3, FiExternalLink } from 'react-icons/fi';

export function Users({ getUsers, allUsers, updateUser, giveAdminRights, giveUserRights, deleteUser }) {
    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"
    const idLocal = JSON.parse(localStorage.redux).authReducer.user.id;
    const [state, setState] = useState({
        newData: false,
        editing: false,
        deleting: false,
        user: {
            id: "",
            fullname: "",
            email: "",
            role: "",
            address: "",
            doc_number: "",
            phone: ""
        }
    });

    const handleEditing = (user) => {
        setState({
            ...state,
            editing: !state.editing,
            user: user ? user : { id: "", fullname: "", email: "", role: "", address: "", doc_number: "", phone: "" }
        })
    }

    const handleDeleting = (user) => {
        setState({
            ...state,
            deleting: !state.deleting,
            user: user ? user : { id: "", fullname: "", email: "", role: "", address: "", doc_number: "", phone: "" }
        })
    }

    const handleUpdate = () => {
        handleEditing();
        return (id, data) => {
            setState({
                ...state,
                newData: true
            })
            updateUser(id, data)
        }
    }

    const updateToAdminRights = () => {
        return (id) => {
            setState({
                ...state,
                newData: true
            })
            giveAdminRights(id)
        }
    }

    const updateToUserRights = () => {
        return (id) => {
            setState({
                ...state,
                newData: true
            })
            giveUserRights(id)
        }
    }

    const handleDelete = () => {
        handleDeleting();
        return id => {
            setState({
                ...state,
                newData: true
            })
            deleteUser(id)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        getUsers();
        setState(state => {
            return {
                ...state,
                editing: false,
                deleting: false,
                newData: false
            }
        })
    }, [state.newData === true, getUsers]);

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
                    <div className="table-responsive">
                        <Table className="table table-dark table-sm table-striped table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Usuario N°</th>
                                    <th>Nombre completo</th>
                                    <th>Correo electrónico</th>
                                    <th>Rol</th>
                                    <th>Registrado</th>
                                    <th>Última modificación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers && allUsers.map((user, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="align-middle">{user.id}</td>
                                            <td className="align-middle">{user.fullname}</td>
                                            <td className="align-middle">{user.email}</td>
                                            {/* Acá cambiamos el texto del valor recibido */}
                                            <td className="align-middle">{((user.role === "client" || user.role === "Usuario") && ("Usuario")) ||
                                                ((user.role === "admin" || user.role === "Administrador") && ("Administrador"))}</td>
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                            <td className="align-middle">{moment(user.createdAt).format(DATE_FORMAT)}</td>
                                            <td className="align-middle">{user.createdAt === user.updatedAt ? "Sin modificaciones" : moment(user.updatedAt).format(DATE_FORMAT)}</td>
                                            <td className="align-middle">
                                                <Link to={"usuario/" + user.id} className="m-1 btn btn-light btn-sm" title="Detalles de usuario"><FiExternalLink /></Link>
                                                <Button size="sm" onClick={() => handleEditing(user)} className="m-1" title="Modificar" variant="warning"><FiEdit3 /></Button>
                                                {user.id === idLocal ?
                                                    <Button disabled size="sm" onClick={() => handleDeleting(user)} className="m-1" title="Borrar" variant="danger"><FiTrash2 /></Button> :
                                                    <Button size="sm" onClick={() => handleDeleting(user)} className="m-1" title="Borrar" variant="danger"><FiTrash2 /></Button>}
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                                <EditUser show={state.editing} updateUser={handleUpdate} giveAdminRights={updateToAdminRights} giveUserRights={updateToUserRights} handleClose={handleEditing} user={state.user} />
                                <DeleteUser show={state.deleting} deleteUser={handleDelete} handleClose={handleDeleting} user={state.user} />
                            </tbody>
                        </Table>
                        {(!allUsers || allUsers.length < 1) && (<div className="alert alert-info">No hay usuarios registrados.</div>)}
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

function mapStateToProps(state) {
    return {
        allUsers: state.usersReducer.users,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers()),
        updateUser: (id, data) => dispatch(updateUser(id, data)),
        giveAdminRights: (id) => dispatch(giveAdminRights(id)),
        giveUserRights: (id) => dispatch(giveUserRights(id)),
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);