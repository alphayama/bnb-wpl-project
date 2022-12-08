import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Description from "./Description";


function Filter({ filterAvailable, searchQuery, onFilterAvailableChange, onSearchQueryChange }) {
  return (
    <div>
      <h2>Search Filter</h2>
      <form>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search Movies..."
          onChange={(e) => onSearchQueryChange(e.target.value)} />
        <br />
        <label>
          <input
            type="checkbox"
            checked={filterAvailable}
            onChange={(e) => onFilterAvailableChange(e.target.checked)} />
          {' '}
          Only show movies that are available
        </label>
      </form>
    </div>
  );
}

function BnBProperties({ props, bnbproperties, filterAvailable, searchQuery }) {
  const filteredProperties = []
  const [modalShow, setModalShow] = React.useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [currentBnbProperty, setCurrentBnbProperty] = React.useState();

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
    <div class="col-md-12 col-lg-12 col-12">
      <div class="row">
        {filteredProperties.map((bnb) =>
          <div class="col-lg-5 col-12 h-100 p-5 bg-light border rounded-3 proptron">
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
            <h3 onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb) }}>{bnb.property_name}</h3>
            <div onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb) }}>
              <h6>{bnb.location}</h6>
              <h6><em>${bnb.night_fee}/Night</em></h6>
              <p>{bnb.description?.length <= 300 ? bnb.description : bnb.description?.substring(0, 298) + "..."}</p>
            </div>
            <Button variant="secondary" onClick={() => { setModalShow(true); setCurrentBnbProperty(bnb) }}>
              Details
            </Button>
            <Description
              show={modalShow}
              onHide={() => setModalShow(false)}
              fullscreen = {fullscreen}
              bnb={currentBnbProperty}
            />
          </div>)}
      </div>
    </div>
  )
};

function App(props) {


  const [bnbproperties, setBnbProperties] = useState([]);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    componentDidMount();
  }, [])

  const componentDidMount = () => {
    axios.get('http://localhost:3000/properties')
      .then(response => {
        setBnbProperties(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="logo.png" style={{ height: "3em" }} /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="col-lg-9 col-12" style={{ display: "flex" }}>
                <div class="col-lg-12 col-12 d-flex flex-column">
                  {/* <label style={{ color: "white", width: "100%" }}>DESTINATION</label> */}
                  <input id="destination" style={{ margin: "10px" }} type="text" name="Destination" placeholder="Search Properties" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                {/* <div class="col-lg-5 col-12 d-flex" >
                  <div class="row" style={{ margin: "0", padding: "0" }}>
                    <div class="col-lg-6 col-12 d-flex flex-column" >
                      <label style={{ color: "white" }}>CHECK-IN</label>
                      <input type="date" name="Check-in" placeholder="check-in" />
                    </div>
                    <div class="col-lg-6 col-12 d-flex flex-column" >
                      <label style={{ color: "white" }}>CHECK-OUT</label>
                      <input type="date" name="Check-out" placeholder="check-out" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-12 d-flex flex-column">
                  <label style={{ color: "white" }}>NO. OF GUESTS</label>
                  <input type="number" name="Guests" placeholder="No. of Guests" />
                </div> */}
              
            </div>
            <div class="col-lg-3 col-12" style={{
              display: "flex",
              "align-items": "center"
            }}>
              <button class="log login" style={{ "width": "100%" }}><i class="bi bi-person-circle"></i> Lara Croft <i class="bi bi-caret-down-fill"></i></button>
              {/* <button class="reg signup">Sign up</button> */}
            </div>
          </div>
        </div>
      </nav>
      <br />
      <BnBProperties
        bnbproperties={bnbproperties}
        filterAvailable={filterAvailable}
        searchQuery={searchQuery}
      />
      <br />
      {/* <Filter
        props={props.onHide}
        filterAvailable={filterAvailable}
        searchQuery={searchQuery}
        onFilterAvailableChange={setFilterAvailable}
        onSearchQueryChange={setSearchQuery}
      /> */}
      <div class="container-12 footer-container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p class="col-md-4 mb-0 text-muted">© 2022 Travelite Inc.</p>

          <a href="#"
            class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <img src="logo2.png" width="80" />
          </a>

          <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Help</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Currency (USD)</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Language (EN-US)</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default App;