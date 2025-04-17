import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Contact() {
  return (
    <div style={{ backgroundColor: '#1c1c2b', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <Container>
        <Card className="p-5 text-white shadow" style={{ backgroundColor: '#2a2a3d', borderRadius: '16px' }}>
          <h2 className="text-center mb-4" style={{ color: '#b39ddb' }}>Contact ParkPal</h2>
          <p className="text-center mb-5" style={{ color: '#ddd' }}>
            Have questions or feeback? Reach out to us:
          </p>

          <Row className="justify-content-center">
            <Col md={6}>
              <div className="mb-4">
                <h5 style={{ color: '#d1c4e9' }}>Questions:</h5>
                <p><a href="mailto:s202182990@kfupm.edu.sa" className="text-light">s202182990@kfupm.edu.sa</a></p>
                <p><a href="mailto:s202159870@kfupm.edu.sa" className="text-light">s202159870@kfupm.edu.sa</a></p>
              </div>

              <div className="mb-4">
                <h5 style={{ color: '#d1c4e9' }}>Feedback:</h5>
                <p><a href="mailto:s202159310@kfupm.edu.sa" className="text-light">s202159310@kfupm.edu.sa</a></p>
                <p><a href="mailto:s202244560@kfupm.edu.sa" className="text-light">s202244560@kfupm.edu.sa</a></p>
                <p><a href="mailto:s202157210@kfupm.edu.sa" className="text-light">s202157210@kfupm.edu.sa</a></p>
              </div>

            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default Contact;