import React, { useState } from "react";
import axios from "axios";
import "../Assets/PaymentPage.css";

const PaymentPage = ({ userId }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [summary, setSummary] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (phoneNumber && paymentAmount) {
        try {
            const response = await axios.post('https://tiketi-tamasha-server.onrender.com/payments', {
                phone_number: phoneNumber.trim(),
                amount: paymentAmount,
                user_id: userId // Assuming you have the user_id passed as a prop
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.ResponseCode === '0') {
                alert('Payment successful!');
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            // console.error('Payment error:', error);
            alert('Check your phone for the confirmation message.');
        }
        setSummary(null);
        setPhoneNumber('');
        setPaymentAmount('');
    } else {
        alert('Please enter both phone number and payment amount.');
    }
  };

  const handleCancel = () => {
    setSummary(null);
    setPhoneNumber('');
    setPaymentAmount('');
  };

  return (
    <div>
        <h1>Payment Page</h1>
        <form onSubmit={handlePayment}>
            <input 
                type="text" 
                placeholder="Phone Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Amount" 
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
            />
            <button type="submit" className="submit">Submit</button>
            <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
        </form>
    </div>
  );
}

export default PaymentPage;
