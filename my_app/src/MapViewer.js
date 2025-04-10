import React , {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
function Map(){
    const [map, setMap] = useState('https://pbs.twimg.com/media/FDl2gcAVUAQRu2c?format=jpg&name=medium');
    return (
        <Container className='vh-100 '>
            <img src={map} width={1000} ></img>
        </Container>
    )
}
export default Map;