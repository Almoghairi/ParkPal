// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/esm/Row';
// import { useState,useEffect } from 'react';
// import { useLocation } from 'react-router';
// import Ani from './Ani3.json';
// import Ani2 from './Ani2.json';
// import Lottie from 'lottie-react';
// import { jwtDecode } from 'jwt-decode';
// import Barcode from 'react-barcode';

// import emailjs from '@emailjs/browser';


// function VQ() {
//   const location = useLocation();
//   const { gameT, image } = location.state || {};
//   const title = gameT.title;
//   const [showBarcode, setShowBarcode] = useState(false);


//   const [queueData, setQueueData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   const [invalidToken, setInvalidToken] = useState(false);
//   const currentQueue = JSON.parse(localStorage.getItem('currentQueue'));


//   const [queueCount, setqueueCount]= useState(0);
//   const [total, setTotal] = useState(0);


//   useEffect(() => {
//     if (!queueData?.expires || showBarcode) return;
  
//     const expiresAt = new Date(queueData.expires).getTime();
//     const now = Date.now();
  
//     // If we're within the expiry window
//     if (now >= expiresAt) {
//       setShowBarcode(true);
  
//       // After 1 minute, auto-quit
//       const timeout = setTimeout(() => {
//         handleQuitQueue();
//       }, 60 * 1000); // 1 minute
  
//       return () => clearTimeout(timeout);
//     }
//   }, [queueData, showBarcode]);
  
//   useEffect(() => {
//     if (!queueData?.token) return;
  
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/status/${queueData.token}`);
//         if (!res.ok) throw new Error("Failed to refresh queue status");
  
//         const data = await res.json();
  
//         setQueueData(prev => ({
//           ...prev,
//           position: data.position,
//           expires: data.gameEnd,
//           status: data.status
//         }));
//       } catch (err) {
//         console.error("Polling error:", err);
//       }
//     }, 10000); // every 10 seconds
  
//     return () => clearInterval(interval);
//   }, [queueData?.token]); // ✅ valid useEffect, not nested
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return setInvalidToken(true);
//     try {
//       const decoded = jwtDecode(token);
//       setUserId(decoded.userId);
//     } catch (err) {
//       setInvalidToken(true);
//     }
//   }, []);

//   // On mount, check if user is already in a queue
//   useEffect(() => {
//     const fetchQueueStatus = async () => {
//       if (!userId || !currentQueue || currentQueue.visitor.name !== userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/status/${currentQueue.token}`);
//         if (!res.ok) throw new Error("Queue status fetch failed.");
//         const data = await res.json();
//         setQueueData({ ...currentQueue, position: data.position, expires: data.gameEnd });
//       } catch (err) {
//         console.error(err);
//         localStorage.removeItem('currentQueue');
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchQueueStatus();
//   }, [userId]);

//   const handleEnterQueue = async () => {
//     if (currentQueue && currentQueue.visitor.name === userId) {
//       setError('You are already in a queue.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('https://parkpal-tzjr.onrender.com/api/vq/join', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           gameName: gameT.title,
//           visitor: { name: userId },
//           numberOfPeople: queueCount,
//         }),
//       });

//       if (!response.ok) throw new Error(await response.text());
//       const data = await response.json();
//       setTotal(data.totalPositions);


//       const newQueue = {
//         token: data.token,
//         position: data.queuePosition,
//         numberOfPeople:queueCount,
//         gameName: data.gameName,
//         expires: data.expires,
//         visitor: { name: userId }
//       };
      

//       setQueueData(newQueue);
//       const token = localStorage.getItem('token');
//       const decoded = jwtDecode(token)
//       sendEmail(data.queuePosition,data.totalQueue, data.token, data.expires, decoded.email)
//       localStorage.setItem('currentQueue', JSON.stringify(newQueue));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuitQueue = async () => {
//     if (!queueData?.token) return;
  
//     try {
//       const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/quit/${queueData.token}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }), // send userId
//       });
  
//       if (!res.ok) throw new Error(await res.text());
  
//       localStorage.removeItem('currentQueue');
//       setQueueData(null);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to quit queue.');
//     }
//   };  

//   if (invalidToken) return <p>Invalid or expired token. Please login again.</p>;

//   const isInAnotherGameQueue =
//     currentQueue && currentQueue.visitor.name === userId && currentQueue.gameName.title !== gameT.title;

//   return (
//     <Row className=" align-items-center" style={{ padding: "0", margin: "0" }}>
//       <Col md={6} className="mb-5 mt-5 align-items-center" style={{ display: 'grid', placeItems: 'center', height: '70vh' }}>
//         <Lottie animationData={Ani} style={{ width: 300, height: 300 }} />

//         {loading ? (
//           <p>Loading...</p>
//         ) : queueData ? (
//           <>
//             <div className="confirmation">
//               <h3>🎉 You're in the Queue!</h3>
//               <div className="confirmation-details">
//                 <p><strong>Token:</strong> {queueData.token}</p>
//                 <p><strong>Position:</strong> #{data.totalPositions}</p>
//                 <p><strong>Estimated Wait:</strong> {total * 5} minutes</p>
//                 <p><strong>Expires:</strong> {new Date(queueData.expires).toLocaleString()}</p>
//               </div>
//               <div>
//               {showBarcode && (
//                 <div className="barcode-wrapper text-center">
//                     <p>🎟️ Boarding now — scan within 1 minute</p>
//                     <Barcode value={queueData.token} />
//                 </div>
//                 )}

//               </div>
//             </div>
//             {!showBarcode && (
//                 <button className="btn btn-danger mt-3" onClick={handleQuitQueue}>
//                     Quit Queue
//                 </button>
//                 )
//             }

//           </>
//         ) : (  
//           <>
//           <form>
//             <label htmlFor="QueueQuantity">number: </label>
//             <input type="number" id="QueueQuantity" name="QueueQuantity" min="0" max="5"  onChange={(e) => setqueueCount(e.target.value)} />
//           </form>
//             <button
//               className="btn btn-dark"
//               onClick={handleEnterQueue}
//               disabled={isInAnotherGameQueue}
//             >
//               {isInAnotherGameQueue ? "Already in another queue" : "Enter Queue"}
//             </button>
//           </>
//         )}

//         {error && <p className="text-danger mt-3">{error}</p>}
//       </Col>

//       <Col className='mt-5' md={6} style={{ padding: "0", margin: "0" }}>
//         <img className='img-thumbnail' style={{ width: "70%", top: "50%", left: "50%" }} src={image} alt={title} />
//       </Col>
//     </Row>
//   );
// }
// function sendEmail( position, token, Time, email) {
//   const formattedTime = new Date(Time).toLocaleString('en-US', {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//   });

//   emailjs.send("service_zmmf2dj", "template_n0nqen9", {
//     token: token,
//     position: position,
//     Time: formattedTime,
//     email: email,
//     }, "Oqq3fldT6vZgObhSK").then((result) => {
//       console.log(result.text);
//     }, (error) => {
//       console.log(error.text);
//     }
//   );
// }


// export default VQ;

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router';
import Ani from './Ani3.json';
import Ani2 from './Ani2.json';
import Lottie from 'lottie-react';
import { jwtDecode } from 'jwt-decode';
import Barcode from 'react-barcode';

import emailjs from '@emailjs/browser';


function VQ() {
  const location = useLocation();
  const { gameT, image } = location.state || {};
  const title = gameT.title;
  const [showBarcode, setShowBarcode] = useState(false);


  const [queueData, setQueueData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [invalidToken, setInvalidToken] = useState(false);
  const currentQueue = JSON.parse(localStorage.getItem('currentQueue'));

  useEffect(() => {
    if (!queueData?.expires || showBarcode) return;
  
    const expiresAt = new Date(queueData.expires).getTime();
    const now = Date.now();
  
    // If we're within the expiry window
    if (now >= expiresAt) {
      setShowBarcode(true);
  
      // After 1 minute, auto-quit
      const timeout = setTimeout(() => {
        handleQuitQueue();
      }, 60 * 1000); // 1 minute
  
      return () => clearTimeout(timeout);
    }
  }, [queueData, showBarcode]);
  
  useEffect(() => {
    if (!queueData?.token) return;
  
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/status/${queueData.token}`);
        if (!res.ok) throw new Error("Failed to refresh queue status");
  
        const data = await res.json();
  
        setQueueData(prev => ({
          ...prev,
          position: data.position,
          expires: data.gameEnd,
          status: data.status
        }));
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 10000); // every 10 seconds
  
    return () => clearInterval(interval);
  }, [queueData?.token]); // ✅ valid useEffect, not nested
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setInvalidToken(true);
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    } catch (err) {
      setInvalidToken(true);
    }
  }, []);

  // On mount, check if user is already in a queue
  useEffect(() => {
    const fetchQueueStatus = async () => {
      if (!userId || !currentQueue || currentQueue.visitor.name !== userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/status/${currentQueue.token}`);
        if (!res.ok) throw new Error("Queue status fetch failed.");
        const data = await res.json();
        setQueueData({ ...currentQueue, position: data.position, expires: data.gameEnd });
      } catch (err) {
        console.error(err);
        localStorage.removeItem('currentQueue');
      } finally {
        setLoading(false);
      }
    };
    

    fetchQueueStatus();
  }, [userId]);

  const handleEnterQueue = async () => {
    if (currentQueue && currentQueue.visitor.name === userId) {
      setError('You are already in a queue.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://parkpal-tzjr.onrender.com/api/vq/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: gameT.title,
          visitor: { name: userId },
        }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();

      const newQueue = {
        token: data.token,
        position: data.queuePosition,
        gameName: data.gameName,
        expires: data.expires,
        visitor: { name: userId }
      };
      

      setQueueData(newQueue);
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token)
      sendEmail(data.queuePosition, data.token, data.expires, decoded.email)
      localStorage.setItem('currentQueue', JSON.stringify(newQueue));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuitQueue = async () => {
    if (!queueData?.token) return;
  
    try {
      const res = await fetch(`https://parkpal-tzjr.onrender.com/api/vq/quit/${queueData.token}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // send userId
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      localStorage.removeItem('currentQueue');
      setQueueData(null);
    } catch (err) {
      console.error(err);
      setError('Failed to quit queue.');
    }
  };  

  if (invalidToken) return <p>Invalid or expired token. Please login again.</p>;

  const isInAnotherGameQueue =
    currentQueue && currentQueue.visitor.name === userId && currentQueue.gameName.title !== gameT.title;

  return (
    <Row className=" align-items-center" style={{ padding: "0", margin: "0" }}>
      <Col md={6} className="mb-5 mt-5 align-items-center" style={{ display: 'grid', placeItems: 'center', height: '70vh' }}>
        <Lottie animationData={Ani} style={{ width: 300, height: 300 }} />

        {loading ? (
          <p>Loading...</p>
        ) : queueData ? (
          <>
            <div className="confirmation">
              <h3>🎉 You're in the Queue!</h3>
              <div className="confirmation-details">
                <p><strong>Token:</strong> {queueData.token}</p>
                <p><strong>Position:</strong> #{queueData.position}</p>
                <p><strong>Estimated Wait:</strong> {queueData.position * 5} minutes</p>
                <p><strong>Expires:</strong> {new Date(queueData.expires).toLocaleString()}</p>
              </div>
              <div>
              {showBarcode && (
                <div className="barcode-wrapper text-center">
                    <p>🎟️ Boarding now — scan within 1 minute</p>
                    <Barcode value={queueData.token} />
                </div>
                )}

              </div>
            </div>
            {!showBarcode && (
                <button className="btn btn-danger mt-3" onClick={handleQuitQueue}>
                    Quit Queue
                </button>
                )
            }

          </>
        ) : (
          <>
            <button
              className="btn btn-dark"
              onClick={handleEnterQueue}
              disabled={isInAnotherGameQueue}
            >
              {isInAnotherGameQueue ? "Already in another queue" : "Enter Queue"}
            </button>
          </>
        )}

        {error && <p className="text-danger mt-3">{error}</p>}
      </Col>

      <Col className='mt-5' md={6} style={{ padding: "0", margin: "0" }}>
        <img className='img-thumbnail' style={{ width: "70%", top: "50%", left: "50%" }} src={image} alt={title} />
      </Col>
    </Row>
  );
}
function sendEmail( position, token, Time, email) {
  const formattedTime = new Date(Time).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  emailjs.send("service_zmmf2dj", "template_n0nqen9", {
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