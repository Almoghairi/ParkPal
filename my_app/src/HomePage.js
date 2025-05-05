import React , {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import ParkAnimation from './ParkAnimation';


import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import ParkAnimation from './ParkAnimation';

function Home() {
  const description =
    "ParkPal is a web application designed to streamline and enhance the theme park experience. It enables users to purchase tickets quickly and locate all park attractions through an intuitive map. Comprehensive ride and activity details allow visitors to plan their day effectively. With the Virtual Queue feature, users can secure their place in line without waiting in person, giving them more time to explore other offerings. The application also facilitates user-generated reviews, helping visitors discover the most worthwhile rides. ParkPal is ideal for families, friends, and anyone seeking a more efficient and enjoyable theme park visit, with reduced wait times and increased opportunities for fun.";

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        {/* Text Column - stacks on small, side-by-side on md+ */}
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
          >
            <h1
              className="fw-bold text-light mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              <Typewriter
                options={{
                  strings: [
                    'Welcome to ParkPal',
                    'Effortless Ticketing & Navigation',
                    'Join Virtual Queues with Confidence',
                    'Discover Top-Rated Attractions',
                    'Plan Your Day Like a Pro',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </h1>

            <motion.p
              className="text-light"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                textAlign: 'justify',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {description}
            </motion.p>
          </motion.div>
        </Col>

        {/* Animation/Image Column */}
        <Col xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
          >
            <ParkAnimation />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
