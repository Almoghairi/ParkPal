import ForgottenAsylumReviews from './ForgottenAsylumReviews';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './HomePage';
import Map from './MapViewer'
import Info from './info';
import { useNavigate, useLocation } from 'react-router';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.replace('/', '') || 'home';

  return (
    <div className="App">
      <div className="NavBar mb-5">
        <Navbar fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand>ParkPal.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={currentTab} onSelect={(key) => navigate(`/${key}`)}>
                <Nav.Link eventKey="home">Home</Nav.Link>
                <Nav.Link eventKey="ticket">Buy Ticket</Nav.Link>
                <Nav.Link eventKey="map">Map</Nav.Link>
                <Nav.Link eventKey="queue">Virtual Queue</Nav.Link>
                <Nav.Link eventKey="info">Ride Info</Nav.Link>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div style={{ paddingTop: '80px', padding: '20px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/ticket" element={<div>Buy Ticket</div>} />
            <Route path="/map" element={<div style={{ padding: '40px' }}><Map /></div>} />
            <Route path="/queue" element={<div>Virtual Queue</div>} />
            <Route path="/info" element={<Info />} />
            <Route path="/reviews" element={<ForgottenAsylumReviews />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App;

