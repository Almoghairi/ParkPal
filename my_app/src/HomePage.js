import React , {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import ParkAnimation from './ParkAnimation';


function Home() {
    const [title,setTitle] = useState("PARKPAL.");
    const description = "ParkPal is a web application designed to streamline and enhance the theme park experience. It enables users to purchase tickets quickly and locate all park attractions through an intuitive map. Comprehensive ride and activity details allow visitors to plan their day effectively. With the Virtual Queue feature, users can secure their place in line without waiting in person, giving them more time to explore other offerings. The application also facilitates user-generated reviews, helping visitors discover the most worthwhile rides. ParkPal is ideal for families, friends, and anyone seeking a more efficient and enjoyable theme park visit, with reduced wait times and increased opportunities for fun."
    return(
            <Container className='vh-100 mt-5'>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Row className='mt-5 mb-4 fs-1 fw-bold'> 

                            <motion.p className='actor-font'style={{ 
                                color: 'light',
                                textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                                fontSize: '2rem' 
                            }}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: 'easeIn'
                            
                             }}
                                >
                                
                                <Typewriter
                                    options={{
                                    strings: [
                                        'Welcome to ParkPal',
                                        'Effortless Ticketing & Navigation',
                                        'Join Virtual Queues with Confidence',
                                        'Discover Top-Rated Attractions',
                                        'Plan Your Day Like a Pro'
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 75,
                                    deleteSpeed: 50,
                                    
                                    }}
                                />
                            </motion.p>

                        </Row>
                        <Row><motion.p
                            className='times-font fs-6'
                            style={{ textAlign: 'justify' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        >
                            {description}
                        </motion.p></Row>
                    </Col>

                {/* Right column: image */}
                    <Col md={6}>
                        <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: 'easeIn' }}>
                        <ParkAnimation/>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
    )
}
export default Home;