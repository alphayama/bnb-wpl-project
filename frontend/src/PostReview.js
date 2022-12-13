import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function PostReview(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/reviews', {
            property_id: props?.property_id,
            user_id: props?.userid,
            comments: e.target.comments.value,
            stars: parseInt(e.target.rating.value)
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        props.onHide()
    }

    return (
        // props.showModal ?
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rate and Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control name="comments" type="text" placeholder="Enter comment..." />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rating (1-5)</Form.Label>
                        <Form.Control name="rating" type="number" min="1" max="5" placeholder="Enter number of bedroom(s)" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PostReview;