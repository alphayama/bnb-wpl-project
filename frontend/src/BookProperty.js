import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UUID from 'uuid-int'


function BookProperty(props) {
    const [checkin, setCheckin] = React.useState(null);
    const [checkout, setCheckout] = React.useState(null);
    const [reservations, setReservations] = useState(null);
    useEffect(() => {
        componentDidMount();
    }, []);
    const componentDidMount = () => {
        axios
            .get("http://localhost:3000/reservations")
            .then((response) => {
                setReservations(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function addOneDay(date) {
        date.setDate(date.getDate() + 1);
        return date;
    }

    const isNotValid = () => {
        for (const reservation in reservations) {
            let data = reservations[reservation]
            if (!(checkin > new Date(data["end_date"].replace(/-/g, '\/').replace(/T.+/, '')) || checkout < new Date(data["start_date"].replace(/-/g, '\/').replace(/T.+/, ''))) || (checkin === null || checkout === null)) {
                return true
            }
        }
        console.log("false")
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/reservations', {
            "reservation_id": UUID(props.bnb.property_id + 4).uuid(),
            "user_id": 4,
            "property_id": props.bnb.property_id,
            "start_date": checkin,
            "end_date": checkout
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        props.onHide()
    }

    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Book Property
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Pick dates for your stay</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control id="checkin" type="date" placeholder="Enter date" onChange={e => setCheckin(new Date(e.target.value.replace(/-/g, '\/').replace(/T.+/, '')))} />
                    <Form.Text className="text-muted">
                        Check-in occurs in the afternoon
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Checkout</Form.Label>
                    <Form.Control id="checkout" type="date" placeholder="Enter date" onChange={e => setCheckout(new Date(e.target.value.replace(/-/g, '\/').replace(/T.+/, '')))} />
                    <Form.Text className="text-muted">
                        Checkout occurs in the morning
                    </Form.Text>
                    {isNotValid() ? (<p><Form.Text style={{ "color": "red" }}>
                        Dates have not been selected or overlaps an existing booking
                    </Form.Text></p>) : null}
                </Form.Group>
                {isNotValid() ? (<Button variant="primary" type="submit" disabled>
                    Submit
                </Button>) : (<Button variant="primary" type="submit">
                    Submit
                </Button>)}
            </Form>
        </Modal.Body>
    </Modal>)

}

export default BookProperty;