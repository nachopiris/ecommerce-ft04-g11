import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { MdStar } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
const REVIEW_DATE_FORMAT = "DD [de] MMMM [del] YYYY";

export default function Review({ props }) {
    const { user: { fullname }, rating, createdAt, description } = props;
    return (
        <Container className="p-0">
            <Row className="bg-dark pt-2 pb-2">
                <Col md="4">
                    <span>{fullname}</span>
                </Col>
                <Col>
                    <Rating
                        initialRating={rating}
                        readonly="true"
                        emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                        fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                    /><br />
                    <small>Publicada el {moment(createdAt).format(REVIEW_DATE_FORMAT)}</small><br />
                    <span>{description}</span>
                </Col>
            </Row>
        </Container>
    )
}