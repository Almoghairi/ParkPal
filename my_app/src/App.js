import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './HomePage';
import Map from './MapViewer'
import ImgMediaCard from './Card';
function App() {
  return (

    
    <div className="App">
      <div className='NavBar mb-5'>
        
        <Navbar fixed ='top' bg="light" data-bs-theme="light" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand>ParkPal.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#ticket">Buy Ticket</Nav.Link>
                <Nav.Link href="#map">Map</Nav.Link>
                <Nav.Link href="#queue">Virtual Queue</Nav.Link>
                <Nav.Link href="#info">Ride Info</Nav.Link>
                <Nav.Link href="#reviews">Reviews</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div id="home">
        <Container fluid>
          <Home />
        </Container>
      </div>
      <div id="ticket">
        <Container className='vh-100'>
          {/* Todo later */}
        </Container>
      </div>
      <div id="map">
        <Container className='vh-100'>
          <Map/>
        </Container>
      </div>
      

    </div>


      
      );
}

export default App;

