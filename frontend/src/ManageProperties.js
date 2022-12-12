import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import AddProperty from './AddProperty';
import ModifyProperty from './ModifyProperty';
import Button from "react-bootstrap/esm/Button";

function ManageProperties(props) {
    const [show, setShow] = useState(false);
    const [properties, setProperties] = useState(null);
    const [currentProperty, setCurrentProperty] = useState([]);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        componentDidMount();
    }, []);
    const componentDidMount = () => {
        axios
            .get("http://localhost:3000/properties?host_id=" + props.userid)
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const toggleListProperty = (property) => {
        console.log(property);
        axios.put('http://localhost:3000/properties/' + property.property_id, {
            "property_id": property.property_id,
            "property_name": property.property_name,
            "host": property.host,
            "available": !property.available,
            "description": property.description,
            "location": property.location,
            "night_fee": property.night_fee,
            "cleaning_fee": property.cleaning_fee,
            "service_fee": property.service_fee,
            "bedrooms": property.bedrooms,
            "amenities": property.amenities,
            "images": property.images
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div>
            <Button variant="primary" onClick={() => { setShowAddModal(true) }}>
                Add a Property
            </Button>
            <hr />
            <ListGroup as="ol">
                {properties?.map((property) =>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            {(property?.available) ? <div className="fw-bold">{property?.property_name}</div> :
                                <s className="fw-bold">{property.property_name}</s>}
                            <div>{property?.location}</div>
                        </div>

                        <Badge bg="primary" style={{ cursor: "pointer", "margin-right": "5px" }} onClick={() => {
                            setCurrentProperty(property);
                            setShowModifyModal(true);
                        }}>
                            Modify Property
                        </Badge>

                        {
                            (property.available) ?
                                <Badge bg="danger" style={{ cursor: "pointer" }} onClick={() => {
                                    toggleListProperty(property);
                                }}>
                                    Unlist Property
                                </Badge> :
                                <Badge bg="secondary" style={{ cursor: "pointer" }} onClick={() => { toggleListProperty(property) }}>
                                    Relist Property
                                </Badge>
                        }

                    </ListGroup.Item>
                )}
            </ListGroup>
            {(showAddModal) ? <AddProperty show={showAddModal}
                onHide={() => setShowAddModal(false)} /> : <></>}
            {(showModifyModal) ? <ModifyProperty show={showModifyModal}
                onHide={() => setShowModifyModal(false)}
                property={currentProperty} /> : <></>}
        </div>
    );
}

export default ManageProperties;
