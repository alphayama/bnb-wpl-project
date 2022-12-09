import React, { useState, useEffect } from 'react';
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Reservations(props) {
    const [reservations, setReservations] = useState(null);
    useEffect(() => {
        componentDidMount();
    }, [])
    const componentDidMount = () => {
        axios.get('http://localhost:3000/reservations?userid=' + props.userid)
            .then(response => {
                const sortedData = response.data.sort((a, b) => {
                    if (new Date(a.start_date < b.start_date)) {
                        return 1;
                    }
                    if (new Date(a.start_date > b.start_date)) {
                        return -1;
                    }
                    return 0;
                });
                setReservations(sortedData)
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <ListGroup as="ol">
                {reservations?.map((reservation) => {
                    const item = props.bnbproperties.find(property => property.property_id === reservation.property_id);
                    return (<ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.property_name}</div>
                            {item.location}
                            <div className="fst-italic">{new Date(reservation?.start_date).toDateString().toLocaleString('en-US')} - {new Date(reservation?.end_date).toDateString().toLocaleString('en-US')}</div>
                        </div>
                        <Badge bg="danger" pill>
                            Cancel Reservation
                        </Badge>
                    </ListGroup.Item>)
                })}
            </ListGroup>
        </div>

    );
}
export default Reservations;
