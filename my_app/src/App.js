import logo from './logo.svg';
import ForgottenAsylumReviews from './ForgottenAsylumReviews';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './HomePage';
import Map from './MapViewer'
import ImgMediaCard from './Card';
import { useState } from 'react';
function App() {
        
const [activeTab, setActiveTab] = useState('home');

const renderContent = () => {
  switch (activeTab) {
    case 'home':
      return <Home/>;
    case 'ticket':
      return <div> buy tickets </div>;
    case 'map':
      return <div style={{padding: '40px'}}><Map /></div>;
    case 'queue':
      return <div> Virtual Queue </div>;
    case 'info':
      return <div></div>;
    case 'reviews':
      return <div><ForgottenAsylumReviews/></div>;
    default:
      return <div><Home/></div>;
  }
};

return (
  <div className="App">
      <div className='NavBar mb-5'>
        <Navbar fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand>ParkPal.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
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

        {/* Padding to avoid content being hidden behind the fixed navbar */}
        <div style={{ paddingTop: '80px', padding: '20px' }}>
          {renderContent()}
        </div>
        
        

      </div>
    </div>


      
      );
}

export default App;

