import ForgottenAsylumReviews from './ForgottenAsylumReviews';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router';
import { useState } from 'react';
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
import "./Ticket.css";
import ForgottenAsylum from './ForgottenInfo';
import Tampet from './TampetInfo';
import Inferno from './InfernoInfo';
import CryzoneX from './CryzoneInfo';
import Pharoah from './PharoahInfo';
import Login from './Login';
import "./Login.css";
import TempestWrathReviews from './TempestWrathReviews';
import CryZoneXReviews from './CryZoneXReviews';
import PharaohCurseReviews from './PharaohCurseReviews';
import InfernoSpiralReviews from './InfernoSpiralReviews';
import { motion } from 'framer-motion';
import Contact from './Contact';
import SignUp from './SignUp';
import LogoutPage from './LogOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.replace('/', '') || 'home';
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const authPath = isLoggedIn ? "/logout" : "/login";
  const authLabel = isLoggedIn ? "Log out" : "Log in";

  return (
    <div className="App" style={{
      color:'#EDEDED',
    }}>

      <motion.div className="NavBar mt-4 mb-5 " 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeIn' }}
      >
        <Navbar expand="lg" variant="dark"> 
          <Container>
            <Navbar.Brand className='light-text'>ParkPal.</Navbar.Brand>
              <Nav className="me-auto flex-row justify-content-around" activeKey={currentTab} onSelect={(key) => navigate(`/${key}`)}>
              <Nav.Link eventKey="home" className="light-text">
                <span className="d-none d-lg-inline">Home</span>
                <i className="bi bi-house-fill d-inline d-lg-none"></i>
              </Nav.Link>

              <Nav.Link eventKey="ticket" className="light-text">
                <span className="d-none d-lg-inline">Buy Ticket</span>
                <i className="bi bi-ticket-perforated d-inline d-lg-none"></i>
              </Nav.Link>

              <Nav.Link eventKey="map" className="light-text">
                <span className="d-none d-lg-inline">Map</span>
                <i className="bi bi-map-fill d-inline d-lg-none"></i>
              </Nav.Link>

              <Nav.Link eventKey="info" className="light-text">
                <span className="d-none d-lg-inline">Rides Info</span>
                <i className="bi bi-info-circle-fill d-inline d-lg-none"></i>
              </Nav.Link>

              <Nav.Link eventKey="contact" className="light-text">
                <span className="d-none d-lg-inline">Contact</span>
                <i className="bi bi-envelope-fill d-inline d-lg-none"></i>
              </Nav.Link>
              </Nav>
              <Nav.Link
                className="light-text"
                onClick={() => navigate(authPath)}
              >
                <span className="d-none d-lg-inline">{authLabel}</span>
                <i className="bi bi-person-circle d-inline d-lg-none"></i>
              </Nav.Link>
          </Container>
        </Navbar>

        <div >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/ticket" element={<div><TicketPage /></div>} />
            <Route path="/map" element={<div ><Map /></div>} />
            <Route path="/queue" element={<VQ  />} />
            <Route path="/forgotten-info" element={<ForgottenAsylum/>} />
            <Route path="/tampet-info" element={<Tampet />} />
            <Route path="/inferno-info" element={<Inferno />} />
            <Route path="/cryzone-info" element={<CryzoneX />} />
            <Route path="/pharoah-info" element={<Pharoah />} />
            <Route path="/info" element={<Info />} /> {/* generic info */}
            <Route path="/forgotten-reviews" element={<ForgottenAsylumReviews />} />
            <Route path="/tampet-reviews" element={<TempestWrathReviews />} />
            <Route path="/inferno-reviews" element={<InfernoSpiralReviews />} />
            <Route path="/cryzone-reviews" element={<CryZoneXReviews />} />
            <Route path="/pharoah-reviews" element={<PharaohCurseReviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/logout" element={<LogoutPage setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
      </motion.div>
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar />
    </div>
  );
}


export default App;

