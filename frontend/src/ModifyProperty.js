import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import UUID from 'uuid-int'

function ModifyProperty(props) {
    const [imageList, setImageList] = useState([]);
    const [nightFee, setNightFee] = useState(0);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);


    const handleFileChange = (e) => {
        setImageList(e.target.images);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/properties/' + props.property.property_id, {
            available: props.property.available,
            host: props.property.host,
            property_name: e.target.property_name.value,
            location: e.target.location.value,
            description: e.target.description.value,
            night_fee: parseInt(nightFee),
            cleaning_fee: parseInt(cleaningFee),
            service_fee: parseInt(serviceFee),
            bedrooms: parseInt(e.target.bedrooms.value),
            amenities: e.target.amenities.value.split(','),
            images: imageList
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        props.onHide()
    }

    console.log("description is this", props.property.description)

    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modify Property
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control name="property_name" type="text" placeholder="Enter property name" defaultValue={props.property.property_name} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control name="location" type="text" placeholder="Enter location" defaultValue={props.property.location} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} placeholder="Enter description" defaultValue={props.property.description} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Night Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text name="night_fee" >$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Night Fee"
                            aria-label="night_fee"
                            aria-describedby="night_fee"
                            onChange={e => setNightFee(e.target.value)}
                            defaultValue={props.property.night_fee}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cleaning Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text name="cleaning_fee" >$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Cleaning Fee"
                            aria-label="cleaning_fee"
                            aria-describedby="cleaning_fee"
                            onChange={e => setCleaningFee(e.target.value)}
                            defaultValue={props.property.cleaning_fee}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Service Fee</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text name="service_fee" >$</InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Service Fee"
                            aria-label="service_fee"
                            aria-describedby="service_fee"
                            onChange={e => setServiceFee(e.target.value)}
                            defaultValue={props.property.service_fee}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control name="bedrooms" type="number" placeholder="Enter number of bedroom(s)" defaultValue={props.property.bedrooms} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amenities</Form.Label>
                    <Form.Control name="amenities" type="text" placeholder="Enter amenities (e.g. Kitchen, Wifi, etc)" defaultValue={props.property.amenities} />
                    <Form.Text className="text-muted">
                        Enter the amenities separated with commas
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Upload Images</Form.Label>
                    <Form.Control name="images" type="file" multiple placeholder="Choose Image(s)" onChange={() => handleFileChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>)

}

export default ModifyProperty;