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
import VQ from './VQ';
import TicketPage from './Ticket';
import { useNavigate, useLocation } from 'react-router';
import "./TicketPage.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.replace('/', '') || 'home';

  return (
    <div className="App">
      <div className="NavBar mb-5">
        <Navbar bg="light" expand="lg"> 
          <Container>
            <Navbar.Brand>ParkPal.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={currentTab} onSelect={(key) => navigate(`/${key}`)}>
                <Nav.Link eventKey="home">Home</Nav.Link>
                <Nav.Link eventKey="ticket">Buy Ticket</Nav.Link>
                <Nav.Link eventKey="map">Map</Nav.Link>
                <Nav.Link eventKey="info">Ride Info</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div >
          <Routes>
            <Route path="/home" element={<Home />} />
<<<<<<< HEAD

            <Route path="/ticket" element={<div>Buy Ticket</div>} />
            <Route path="/map" element={<div style={{ padding: '40px' }}><Map /></div>} />
            <Route path="/queue" element={<VQ />} />
            <Route path="/info" element={<div>Ride Info</div>} />
            <Route path="/queue" element={<div>Virtual Queue</div>} />

            <Route path="/ticket" element={<div><TicketPage /></div>} />
            <Route path="/map" element={<div ><Map /></div>} />
=======
            <Route path="/ticket" element={<div ><TicketPage /></div>} />
            <Route path="/map" element={<div  style={{marginTop:'60px'}}><Map /></div>} />
>>>>>>> 681ada4b61a64c73570ec1bcfcb9621367ce6fd8
            <Route path="/queue" element={<VQ />} />

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

