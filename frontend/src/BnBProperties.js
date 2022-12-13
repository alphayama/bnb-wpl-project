import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Description from "./Description";
import PostReview from "./PostReview";

function BnBProperties({ props, bnbproperties, filterAvailable, searchQuery }) {
    const filteredProperties = []
    const [modalShow, setModalShow] = React.useState(false);
    const [reviewModalShow, setReviewModalShow] = React.useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [currentBnbProperty, setCurrentBnbProperty] = React.useState();

    // function getCurrentBnBReview(bnb){
    //     console.log(bnb.property_id);
    //     let data=null;
    //     axios.get('http://localhost:3000/reviews?propertyid=' + bnb.property_id)
    //         .then(response => {
    //             setReviews(response.data);
    //             data= response.data;
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     return data;
    // }

    // console.log(props?.reviews);

    bnbproperties.forEach(bnb => {
        if (bnb?.property_name?.toLowerCase().indexOf(searchQuery?.toLowerCase()) === -1 &&
            bnb?.location?.toLowerCase().indexOf(searchQuery?.toLowerCase()) === -1) {
            return;
        }
        else {
            filteredProperties.push(bnb)
        }
    }
    );

    return (
        <div class="col">
            <div class="row cont-row" style={{ "margin": "0px" }}>
                {filteredProperties.map((bnb) =>
                    <div class="col-lg-5 col-12 p-5 bg-light border rounded-3 proptron">
                        <div id={"carousel" + bnb.property_id} class="carousel slide" data-bs-ride="carousel"
                            style={{ "marginBottom": "5px" }}>
                            <div class="carousel-indicators" >
                                <button type="button" data-bs-target={"#carousel" + bnb.property_id} data-bs-slide-to="0" class="active"
                                    aria-current="true" aria-label={"Slide " + 0}></button>
                                {Object.entries(bnb.images).slice(1).map(([k, v]) =>
                                    <button type="button" data-bs-target={"#carousel" + bnb.property_id} data-bs-slide-to={("" + k.substring(1)) - 1}
                                        aria-current="true" aria-label={"Slide " + k.substring(1)}></button>)}
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={bnb.images["p1"]} class="d-block w-100" alt="..." onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb) }} />
                                </div>
                                {Object.entries(bnb.images).slice(1).map(([k, v]) => <div class="carousel-item">
                                    <img src={v} class="d-block w-100" alt="..." onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb) }} />
                                </div>)}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target={"#carousel" + bnb.property_id}
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target={"#carousel" + bnb.property_id}
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <br />
                        <h3 onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb); }}>{bnb.property_name}</h3>
                        <div onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb); }}>
                            <h6>{bnb.location}</h6>
                            <h6><em>${bnb.night_fee}/Night</em></h6>
                            <p>{bnb.description?.length <= 300 ? bnb.description : bnb.description?.substring(0, 298) + "..."}</p>
                        </div>
                        <Button variant="secondary" onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb); /*console.log(reviews) */}}>
                            Details
                        </Button> <span>   </span>
                        <Button variant="warning" onClick={() => { setReviewModalShow(true); setCurrentBnbProperty(bnb); /*console.log(reviews) */}}>
                            <i class="bi bi-pencil-square"></i> Post Review
                        </Button>
                        <Description
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            fullscreen={fullscreen}
                            bnb={currentBnbProperty}
                            reviews={props?.reviews}
                            isFavorite={true}
                            user_id={1}
                        />
                        <PostReview
                            show={reviewModalShow}
                            onHide={() => setReviewModalShow(false)}
                            bnb={currentBnbProperty}
                            userid={1}
                        />
                    </div>)}
            </div>
        </div>
    )
};

export default BnBProperties;