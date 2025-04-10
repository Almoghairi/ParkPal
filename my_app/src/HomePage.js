import React , {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import Coaster from './RollerCoaster';
import Typewriter from 'typewriter-effect';


function Home() {
    const [title,setTitle] = useState("PARKPAL.");
    const description = "ParkPal is a web application designed to streamline and enhance the theme park experience. It enables users to purchase tickets quickly and locate all park attractions through an intuitive map. Comprehensive ride and activity details allow visitors to plan their day effectively. With the Virtual Queue feature, users can secure their place in line without waiting in person, giving them more time to explore other offerings. The application also facilitates user-generated reviews, helping visitors discover the most worthwhile rides. ParkPal is ideal for families, friends, and anyone seeking a more efficient and enjoyable theme park visit, with reduced wait times and increased opportunities for fun."
    return(
            <Container className='vh-100'>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Row className='mt-5 mb-4 fs-1 fw-bold'> 
                            <p className='actor-font'style={{ color: 'Black', fontSize: '2rem' }}>
                                <Typewriter
                                    options={{
                                    strings: ['Welcome to ParkPal!', 'Your adventure starts here!'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 75,
                                    deleteSpeed: 50,
                                    }}
                                />
                            </p>
                        </Row>
                        <Row><p className='times-font'>{description}</p></Row>
                    </Col>

                {/* Right column: image */}
                    <Col md={6}>
                        <Coaster/>
                    </Col>
                </Row>
            </Container>
    )
}
export default Home;