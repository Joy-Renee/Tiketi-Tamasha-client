import React, { useState } from 'react';
import axios from 'axios';
import "../Assets/PaymentPage.css"; // Ensure you have some basic styling here

function PaymentOrganizer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (phoneNumber && paymentAmount) {
      setLoading(true);
      try {
        const response = await axios.post('https://tiketi-tamasha-server.onrender.com/pay', {
          phone_number: phoneNumber.trim(),
          amount: paymentAmount,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.data.CheckoutRequestID) {
          alert('Payment request sent successfully! Please check your phone to complete the payment.');
        } else {
          alert('Payment initiation failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred while initiating payment. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter both phone number and payment amount.');
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <form onSubmit={handlePayment} className="payment-form">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
        />
        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default PaymentOrganizer;
