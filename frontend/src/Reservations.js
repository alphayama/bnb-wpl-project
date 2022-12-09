import React, { useState, useEffect } from 'react';
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Reservations(props) {
    const [reservations, setReservations] = useState(null);
    useEffect(() => {
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
                console.log(reservations)
            }).catch(error => {
                console.log(error);
            })
    });
    return (
        <div>
            <ListGroup as="ol">
                {reservations?.map((reservation) =>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Modern test - Barrel Sauna - Hot Tub - Mountains</div>
                            Blue Ridge, Georgia, United States
                            <div className="fst-italic">{reservation?.start_date} - {reservation?.end_date}</div>
                        </div>
                        <Badge bg="danger" pill>
                            Cancel Reservation
                        </Badge>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    );
}
export default Reservations;
