import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Container, Card } from 'react-bootstrap';


function TicketPage() {
  const [showPayPage, setShowPayPage] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [childQuantity, setChildQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  

  useEffect(() => {
    setTotalAmount((adultQuantity * 100) + (childQuantity * 50) + (seniorQuantity * 70));
  }, [adultQuantity, childQuantity, seniorQuantity]);

  if (showPayPage) {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to buy tickets.');
    }
    const userId = localStorage.getItem('userId');
    if (adultQuantity <= 0 && childQuantity <= 0 && seniorQuantity <= 0) {
      alert("Please select at least one ticket type before proceeding to payment.");
      setShowPayPage(false);
      return;
    }
    return <Pay 
        totalAmount={totalAmount} 
        adultQuantity={adultQuantity} 
        childQuantity={childQuantity} 
        seniorQuantity={seniorQuantity} 
      />;
  }

  return (
    <>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeIn' }}
          style={{ backgroundColor: '#1c1c2b' }}
          id="ticket-page" >
          <Container>
          <Card className="p-5 text-white shadow" style={{ backgroundColor: '#2a2a3d', borderRadius: '16px' }}>
            <h1>Buy Ticket</h1>
            <p>Here you can buy tickets for the theme park.</p>
            <form>
                <div>
                    <p>Age 12 - 65</p>
                    <label htmlFor="adultQuantity">Adult Tickets:</label>
                    <input type="number" id="adultQuantity" name="adultQuantity" min="0" max="10" value={adultQuantity} onChange={(e) => setAdultQuantity(Number(e.target.value))} />
                </div>
                <div>
                    <p>Age 0 - 12</p>
                    <label htmlFor="childQuantity">Child Tickets:</label>
                    <input type="number" id="childQuantity" name="childQuantity" min="0" max="10" value={childQuantity} onChange={(e) => setChildQuantity(Number(e.target.value))} />
                </div>
                <div>
                    <p>Age 65+</p>
                    <label htmlFor="seniorQuantity">Senior Tickets:</label>
                    <input type="number" id="seniorQuantity" name="seniorQuantity" min="0" max="10" value={seniorQuantity} onChange={(e) => setSeniorQuantity(Number(e.target.value))} />
                </div>
                <button type="button" onClick={() => setShowPayPage(true)}>Pay</button>
            </form>
            </Card>
            </Container> 
        </motion.div>
    </>
  );
}

function Pay({ totalAmount, adultQuantity, childQuantity, seniorQuantity }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardNumber = event.target.cardNumber.value.trim();
    const expiryDate = event.target.expiryDate.value.trim();
    const cvv = event.target.cvv.value.trim();
  
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields before submitting.");
      return;
    }
  
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be exactly 16 digits.");
      return;
    }
  
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be exactly 3 digits.");
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in.");
      return;
    }
  
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      let email = decoded.email;
      console.log(email);
    } catch (err) {
      alert("Invalid token.");
      return;
    }
  
    const totalTickets = adultQuantity + childQuantity + seniorQuantity;
  
    try {
      const response = await fetch('https://parkpal-tzjr.onrender.com/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          numberOfTickets: totalTickets
        })
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.info('Payment submitted and ticket saved successfully!');
        navigate("/home");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving ticket:', error);
      alert('An error occurred while saving your ticket.');
    }
  };  

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: 'easeIn' }}
      style={{ backgroundColor: '#1c1c2b'}}
      id="pay-page">
      <Container>
        <Card className="p-5 text-white shadow" style={{ backgroundColor: '#2a2a3d', borderRadius: '16px' }}>
        <h1>Pay</h1>
        <p>Here you can pay for your tickets.</p>
        <p>The total amount is: {totalAmount} SAR</p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="month" id="expiryDate" name="expiryDate" />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" />
          </div>
          <button type="submit">Submit Payment</button>
        </form>
        </Card>
      </Container> 
    </motion.div>
  );
}
export default TicketPage;