import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


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
    if (adultQuantity <= 0 && childQuantity <= 0 && seniorQuantity <= 0) {
      alert("Please select at least one ticket type before proceeding to payment.");
      setShowPayPage(false);
      return;
    }
    return <Pay totalAmount={totalAmount} />;
  }

  return (
    <>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeIn' }}
          id="ticket-page" >
            <h1>Buy Ticket</h1>
            <p>Here you can buy tickets for the theme park.</p>
            <form>
                <div>
                    <label htmlFor="adultQuantity">Adult Tickets:</label>
                    <input type="number" id="adultQuantity" name="adultQuantity" min="0" max="10" value={adultQuantity} onChange={(e) => setAdultQuantity(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="childQuantity">Child Tickets:</label>
                    <input type="number" id="childQuantity" name="childQuantity" min="0" max="10" value={childQuantity} onChange={(e) => setChildQuantity(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="seniorQuantity">Senior Tickets:</label>
                    <input type="number" id="seniorQuantity" name="seniorQuantity" min="0" max="10" value={seniorQuantity} onChange={(e) => setSeniorQuantity(Number(e.target.value))} />
                </div>
                <button type="button" onClick={() => setShowPayPage(true)}>Pay</button>
            </form>
        </motion.div>
    </>
  );
}

function Pay(parms) {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const cardNumber = event.target.cardNumber.value.trim();
    const expiryDate = event.target.expiryDate.value.trim();
    const cvv = event.target.cvv.value.trim();

    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    alert("Payment submitted successfully!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: 'easeIn' }}
      id="pay-page">
      <h1>Pay</h1>
      <p>Here you can pay for your tickets.</p>
      <p>The total amount is: {parms.totalAmount} SAR</p>
      
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
    </motion.div>
  );
}
export default TicketPage;