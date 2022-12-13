import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BookProperty from './BookProperty';
import ListGroup from "react-bootstrap/ListGroup";
import Badge from 'react-bootstrap/Badge';
import axios from "axios";

function Description(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    
    // console.log({ props });
    // function getCurrentBnBReview(propsbnb){
    //     console.log(bnb.property_id);
    //     let data=null;
    // useEffect(()=>{loadReviews();console.log(reviews)},[])
    //     return data;
    // }
    // console.log(props?.reviews)

    useEffect(() => {
        componentDidMount();
    }, []);
    const componentDidMount = () => {
        axios.get("http://localhost:3000/reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // function loadReviews(){
    //     axios.get('http://localhost:3000/reviews?propertyid=' + props?.bnb?.property_id)
    // .then(response => {
    //     console.log(response.data);
    //     setReviews(response.data);
    //     // data= response.data;
    // }).catch(error => {
    //     console.log(error);
    // })
    // }

    function addToFavourites(prop_id){
        axios.post('http://localhost:3000/favorites', {
            property_id: prop_id,
            user_id: props?.user_id
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    function deleteFavorite(prop_id){
        axios.delete('http://localhost:3000/favorites/' + prop_id)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
        props.onHide();
    }

    // console.log(props?.reviews);

    return (
        // props.showModal ?
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props?.bnb?.property_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>
                        <i class="bi bi-geo-alt"></i>  <em>{props?.bnb?.location}</em>
                    </h5>
                    <hr />
                    <h5><i class="bi bi-cash"></i>  <b>${props?.bnb?.night_fee}</b> / Night</h5>
                    <ul>
                        <li><em>Cleaning Fee:</em> ${props?.bnb?.cleaning_fee}</li>
                        <li><em>Service Fee:</em> ${props?.bnb?.service_fee}</li>
                    </ul>
                    <hr />
                    <h5><i class="bi bi-square-half"></i>  Bedrooms: <b>{props?.bnb?.bedrooms}</b></h5>
                    <hr />
                    <h5><i class="bi bi-info-circle"></i>  About</h5>
                    <p>
                        {props?.bnb?.description}
                    </p>
                    <hr />
                    <h5><i class="bi bi-stars"></i>  Amenities</h5>
                    <ul>
                        {props?.bnb?.amenities.map((amenity) => <li>{amenity}</li>)}
                    </ul>
                    <hr />
                    <h5><i class="bi bi-chat-left-quote"></i>  Reviews</h5>
                    <h6>Average Rating: 4.5</h6>
                    <ListGroup as="ul">
                        {/*reviews.length && reviews ? reviews.forEach((review)=>(review.property_id==props?.bnb?.property_id)&&<ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            {review.comments}
                            </div>
                            <Badge bg="primary" pill>
                            {review.stars} <i class="bi bi-star-fill"></i>
                            </Badge>
                        </ListGroup.Item>):<p>No reviews!</p>*/}
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            Great country living vibe! The location was about 1 hr 30 minutes from Dallas city center so pretty convenient for a weekend getaway. Clean and tastefully decorated. Would rent again.
                            </div>
                            <Badge bg="primary" pill>
                            5 <i class="bi bi-star-fill"></i>
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                            The cabin is located in quiet and peaceful neighborhood. It is very clean and comfortable and was perfectly equipped for our family of 4 plus dog.
                            </div>
                            <Badge bg="primary" pill>
                            4 <i class="bi bi-star-fill"></i>
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                    <hr />
                    <h5><i class="bi bi-camera"></i>  Gallery</h5>
                    {props?.bnb?.images != null ? <div class="row">
                        {Object.entries(props?.bnb?.images).map(([k, v]) =>
                            <div class="col-4" style={{ "padding": "10px" }}>
                                <img src={v} class="d-block w-100" />
                            </div>)}
                    </div> : <></>}
                </Modal.Body>
                <Modal.Footer>
                    {
                        (props.isFavorite) ? (<Button variant="warning" onClick={()=>addToFavourites(props?.bnb?.property_id)}><i class="bi bi-bookmark-plus"></i> Add to Favorites</Button>
                        ) : (
                            <Button variant="danger" onClick={()=>{deleteFavorite(props.favoritePropertyID)}}><i class="bi bi-bookmark-x"></i> Remove from Favorites</Button>
                            )}
                    <Button variant="success" onClick={() => { setModalShow(true) }}><i class="bi bi-bag-plus"></i> Book Property</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <BookProperty
                show={modalShow}
                onHide={() => setModalShow(false)}
                bnb={props.bnb}
            //Need to pass in user id or some redux thingy
            />
        </div>
    );
}

// function Description(props) {
//     // console.log({ props });
//     return (
//         <div class="col-md-12 col-lg-12 col-12">
//             <div class="row" style={{ "float": "right" }}>
//                 <Button variant="secondary" onClick={() => { }}>
//                     <i class="bi bi-x"></i> Close
//                 </Button>
//             </div>
//             <div class="row">
//                 <h3>{props?.bnb?.property_name}</h3>
//                 <h5>
//                     <i class="bi bi-geo-alt"></i>  <em>{props?.bnb?.location}</em>
//                 </h5>
//                 <h5><i class="bi bi-cash"></i>  <b>${props?.bnb?.night_fee}</b> / Night</h5>
//                 <ul>
//                     <li><em>Cleaning Fee:</em> ${props?.bnb?.cleaning_fee}</li>
//                     <li><em>Service Fee:</em> ${props?.bnb?.service_fee}</li>
//                 </ul>
//                 <hr />
//                 <h5><i class="bi bi-square-half"></i>  Bedrooms: <b>{props?.bnb?.bedrooms}</b></h5>
//                 <hr />
//                 <h5><i class="bi bi-info-circle"></i>  About</h5>
//                 <p>
//                     {props?.bnb?.description}
//                 </p>
//                 <hr />
//                 <h5><i class="bi bi-stars"></i>  Amenities</h5>
//                 <ul>
//                     {props?.bnb?.amenities.map((amenity) => <li>{amenity}</li>)}
//                 </ul>
//                 <hr />
//                 <h5><i class="bi bi-camera"></i>  Gallery</h5>
//                 {props?.bnb?.images != null ? <div class="row">
//                     {Object.entries(props?.bnb?.images).map(([k, v]) =>
//                         <div class="col-6" style={{ "padding": "10px" }}>
//                             <img src={v} class="d-block w-100" />
//                         </div>)}
//                 </div> : <></>}
//             </div>
//         </div>
//     )
// }

export default Description;