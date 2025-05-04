import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router';
import Ani from './Ani3.json';
import Ani2 from './Ani2.json';
import Lottie from 'lottie-react';
import { jwtDecode } from 'jwt-decode';
import emailjs from '@emailjs/browser';


function VQ(){
    const location = useLocation();
    const { gameT, image } = location.state || {};
    const title = gameT.title;
    const [randomNumber, setRandomNumber] = useState(0);
    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 90)); 
      }, []);
    const numOfPeople= Math.floor(randomNumber/5);


        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState(null);
        const [error, setError] = useState('');

        const token = localStorage.getItem('token');

        let userId;
        try {
            const decoded = jwtDecode(token);
            userId = decoded.userId;
        } catch (err) {
            alert("Invalid token.");
            return;
        }
      
      
        const handle1Submit = async (e) => {
            e.preventDefault();
            setError('');
            try {
              const response = await fetch('/api/vq/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  gameName: gameT,
                  visitor: {
                    name: userId,
                  }
                })
              });
        
              if (!response.ok) throw new Error(await response.text());
              
              const data = await response.json();
            
              const token = localStorage.getItem('token');
              const decoded = jwtDecode(token);

              setResult(data);
              sendEmail(e, data.queuePosition, data.token, data.expires, decoded.email);
            } catch (err) {
              setError(err.message);
            }finally {
                setLoading(false);
            }
        };

        

    return(

        <>
            <Row className="align-items-center"style={{padding:"0",margin:"0"}}>

                <Col md={6}  className="align-items-center" style={{display: 'grid',placeItems: 'center',height: '70vh',}}>
                    <Lottie animationData={Ani} style={{ width: 300, height: 300 }} />
                    <button className="btn btn-dark" onClick={handle1Submit}>Enter Queue</button>

                    {result && (
                    <div className="confirmation">
                        <h3>🎉 Queue Joined Successfully!</h3>
                        <div className="confirmation-details">
                            <p><strong>Token:</strong> {result.token}</p>
                            <p><strong>Position:</strong> #{result.queuePosition}</p>
                            <p><strong>Estimated Waiting:</strong> {(result.queuePosition/10)*5}</p>
                            <p><strong>Expires:</strong> {new Date(result.expires).toLocaleString()}</p>
                        </div>
                    </div>
                )}

                
                </Col>

                <Col md={6} style={{padding:"0",margin:"0"}} >
                    <img className='img-thumbnail' style={{width:"70%",top:"50%", left:"50%"}}src={image} alt={title}></img>
                </Col>
            </Row>

        </>
        

    )
}
function sendEmail(e, position, token, Time, email) {
  e.preventDefault();
  const formattedTime = new Date(Time).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  emailjs.send("service_08tc7el", "template_n0nqen9", {
    token: token,
    position: position,
    Time: formattedTime,
    email: email,
    }, "Oqq3fldT6vZgObhSK").then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    }
  );
}

export default VQ;