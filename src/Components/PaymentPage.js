import React, { useState } from 'react';
import axios from 'axios';
import "../Assets/PaymentPage.css";

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

  return (
    <div className="payment-form">
      <h2>Order Summary</h2>
      <p>Event: {summary.title}</p>
      <p>Tickets: {summary.ticketCount}</p>
      <p>Total Amount: ksh {summary.totalAmount}</p>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="phone-input"
      />
      <input
        type="text"
        placeholder="Payment Amount"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        className="amount-input"
      />
      <button onClick={handlePayment} className="confirm-payment-button">
        Confirm Payment
      </button>
      <button onClick={onCancel} className="cancel-button">
        Cancel
      </button>
    </div>
  );
}

export default PaymentPage;
