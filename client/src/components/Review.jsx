import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { MdStar } from 'react-icons/md'
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
const DATE_FORMAT = "DD [de] MMMM [del] YYYY"

export default function Review({ props }) {
    const { fullName, review, createdAt, description } = props;
    return (
        <Container className="p-0">
            <Row className="bg-dark pt-2 pb-2">
                <Col md="4">
                    <span>{fullName}</span>
                </Col>
                <Col>
                    <Rating
                        initialRating={review}
                        readonly="true"
                        emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                        fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                    /><br />
                    <small>PUBLICADA EL {moment(createdAt).format(DATE_FORMAT).toUpperCase()}</small><br />
                    <span>{description}</span>
                </Col>
            </Row>
        </Container>
    )
}