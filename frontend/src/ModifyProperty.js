import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import UUID from 'uuid-int'

function ModifyProperty(props) {
    const [propertyName, setPropertyName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [nightFee, setNightFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    // const []

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/properties/'+props.property.property_id, {
            "property_id": props.property.property_id,
            "host": props.property.host,
            "availability": props.property.availability
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
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Property
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control id="propertyname" type="text" placeholder="Enter property name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control id="location" type="text" placeholder="Enter location" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control id="location" as="textarea" rows={3} placeholder="Enter description" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Night Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="nightfee">$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Night Fee"
                            aria-label="nightfee"
                            aria-describedby="nightfee"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cleaning Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="cleaningfee">$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Cleaning Fee"
                            aria-label="cleaningfee"
                            aria-describedby="cleaningfee"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Service Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="servicefee">$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Service Fee"
                            aria-label="servicefee"
                            aria-describedby="servicefee"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control id="bedrooms" type="number" placeholder="Enter number of bedroom(s)" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amenities</Form.Label>
                    <Form.Control id="amenities" type="text" placeholder="Enter amenities (e.g. Kitchen, Wifi, etc)" />
                    <Form.Text className="text-muted">
                        Enter the amenities separated with commas
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>)

}

export default ModifyProperty;