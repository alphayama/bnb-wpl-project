import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Description(props) {
    // console.log({ props });
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
                <h5><i class="bi bi-camera"></i>  Gallery</h5>
                {props?.bnb?.images != null ? <div class="row">
                    {Object.entries(props?.bnb?.images).map(([k, v]) =>
                        <div class="col-4" style={{ "padding": "10px" }}>
                            <img src={v} class="d-block w-100" />
                        </div>)}
                </div> : <></>}
            </Modal.Body>
            <Modal.Footer>
                {(props.isFavorite)?(<Button variant="warning" onClick={props.onHide}><i class="bi bi-heart"></i> Add to Favorites</Button>):(<></>)}
                <Button variant="success" onClick={props.onHide}><i class="bi bi-bag-plus"></i> Book Property</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
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