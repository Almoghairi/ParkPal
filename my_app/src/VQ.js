import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router';



function VQ(){
    const location = useLocation();
    const { gameT, image } = location.state || {};
    const title = gameT.title

    const [randomNumber, setRandomNumber] = useState(0);
    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 90)); 
      }, []);
    const numOfPeople= Math.floor(randomNumber/5);

    

    const [data, setData] = useState(null);
    const [clickCount, setclickCount] = useState(0);

    
    const handleSubmit= ()=>{
        if(clickCount%2==0){
            setData("Your number in the queue is "+ parseInt(numOfPeople +1)+" after "+ randomNumber+ " min")
        }else{
            setData(null);
        }
        setclickCount(clickCount+1)
    }

    return(

        <>
            

            <Row className="align-items-center">

                <Col md={6} style={{background:"#D9D9D9"}}>
                    <h1>Estimated waiting time: </h1>

                    <p class="lead">{randomNumber} min</p>

                    <h2>Number of people in the queue:</h2>

                    <p class="lead">{numOfPeople}</p>


                    <button class="btn btn-dark" onClick={handleSubmit}>Enter Queue</button>
                    <p>{data}</p>
                </Col>

                <Col md={6}>
                    <h1>{title}</h1>
                    <img class="rounded" src={image} style={{width:"90%"}} alt={title}></img>

                </Col>
            </Row>

        </>
        

    )
}
export default VQ;