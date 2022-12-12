import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Description from "./Description";
import BnBProperties from "./BnBProperties";
import Reservations from "./Reservations";
import Favorites from "./Favorites";
import ManageProperties from "./ManageProperties";


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

function App(props) {


  const [bnbproperties, setBnbProperties] = useState([]);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBnBProperties, setShowBnBProperties] = useState(true);
  const [showReservations, setShowReservations] = useState(true);
  const [showFavorites, setShowFavorites] = useState(true);
  const [reviews, setReviews] = React.useState([]);

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
    axios.get('http://localhost:3000/reviews')
      .then(response => {
        setReviews(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  console.log(reviews);

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
      <div class="row">
        <div class="col-lg-1  col-12" style={{ "background-color": "#0f4b73" }}>
          <div class="row">
            <div class="col-12 sticky" style={{ "background-color": "#0f4b73", "padding-left": "20px" }}>
              <div class="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center custom-sidebar">
                  <li class="nav-item">
                    <a onClick={() => { setShowBnBProperties(true); setShowFavorites(false); setShowReservations(false); }} class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="All Properties">
                      <i class="bi bi-house" style={{ "font-size": "30px" }}></i><br />Home
                    </a>
                  </li>
                  <li>
                    <a onClick={() => { setShowBnBProperties(false); setShowFavorites(true); setShowReservations(false); }} class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Favorite Properties">
                      <i class="bi bi-bookmark-heart" style={{ "font-size": "30px" }}></i><br />Favorites
                    </a>
                  </li>
                  <li>
                    <a onClick={() => { setShowBnBProperties(false); setShowFavorites(false); setShowReservations(true); }} class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="History">
                      <i class="bi bi-clock-history" style={{ "font-size": "30px" }}></i><br />My Reservations
                    </a>
                  </li>
                  <li class="nav-item">
                    <a onClick={() => { setShowBnBProperties(false); setShowFavorites(false); setShowReservations(false); }} class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="All Properties">
                      <i class="bi bi-list-columns" style={{ "font-size": "30px" }}></i><br />Manage Properties
                    </a>
                  </li>
                </ul>
                {/* <div class="dropdown custom-sidebar">
                    <a href="#" class="d-flex align-items-center justify-content-center p-3 text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi-person-circle h2"></i>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                    </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-11 col-12" style={{ "padding": "25px" }}>
          {(showBnBProperties) ? (
            <>
            <h3>All Properties</h3>
            <BnBProperties
              bnbproperties={bnbproperties}
              filterAvailable={filterAvailable}
              searchQuery={searchQuery}
              reviews={reviews}
            />
            </>
          ) : (
            (showFavorites) ? (
              <>
              <h3>My Favorite Properties</h3>
              <Favorites
                userid={1}
                bnbproperties={bnbproperties}

              />
              </>
            ) : (
              (showReservations) ? (
              <>
              <h3>My Reservations</h3>
              <h5>View current and previous reservations.</h5>
              <Reservations
                userid={4}
                bnbproperties={bnbproperties}
              />
              </>
              ):(
                <>
                  <h3>Manage Properties</h3>
                  <ManageProperties
                    userid={1}
                  />
                </>
              )
            )
          )}
        </div>
        {/* <Filter
        props={props.onHide}
        filterAvailable={filterAvailable}
        searchQuery={searchQuery}
        onFilterAvailableChange={setFilterAvailable}
        onSearchQueryChange={setSearchQuery}
      /> */}
      </div>
      {/* <div class="row" style={{ "position": "fixed","left":"0","bottom":"0", "right":"0"}}> */}
      <div class="container-12 footer-container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top" style={{ "margin": "0px"}}>
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
      {/* </div> */}
    </div>
  )
}

export default App;