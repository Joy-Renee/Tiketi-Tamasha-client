import React, { useState } from 'react';
import axios from 'axios';
import "../Assets/PaymentPage.css";
import { useNavigate } from 'react-router-dom';

function PaymentPage({ summary, onPaymentSuccess, onCancel }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePayment = async () => {
    if (phoneNumber && paymentAmount) {
      try {
        const response = await axios.post('https://tiketi-tamasha-server.onrender.com/pay', {
          phone_number: phoneNumber.trim(),
          amount: paymentAmount,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.data.ResponseCode === '0') {
          alert('Payment successful!');
          onPaymentSuccess(); // Call the callback function to reset summary and other states
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment error. Please try again.');
      }
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
        navigate('/events');
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
