import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router';
import Ani from './Ani3.json';
import Ani2 from './Ani2.json';
import Lottie from 'lottie-react';



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
            

            <Row className="align-items-center"style={{padding:"0",margin:"0"}}>

                <Col md={6}  className="align-items-center" style={{display: 'grid',placeItems: 'center',height: '70vh',}}>
                    <Lottie animationData={Ani} style={{ width: 300, height: 300 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <div className='fs-2'>Estimated waiting time </div>
                        <Lottie animationData={Ani2} loop autoplay /> 
                        <div className='fs-3'>{randomNumber} min to start</div>
                     </div>
                    

                    <div className='fs-2' >{numOfPeople} people in queue</div>



                    <button class="btn btn-dark" onClick={handleSubmit}>Enter Queue</button>
                    <div className='fs-4'>{data}</div>
                </Col>

                <Col md={6} style={{padding:"0",margin:"0"}} >
                    <img className='img-thumbnail' style={{width:"70%",top:"50%", left:"50%"}}src={image} alt={title}></img>

                </Col>
            </Row>

        </>
        

    )
}
export default VQ;