import React from 'react';
import '../Assets/PaymentPage.css';  

const PaymentPage = () => {
  return (
    <div className="payment-container">
      <div className="order-section">
        <h1 className="back-arrow">{'<'}</h1>
        <h2 className="payment-title">Payment</h2>
        <h3 className="order-title">Your Order</h3>
        <hr className="dashed-line" />
        <ul className="order-list">
          <li>Raha Fest VVIP</li>
          <li>Sol Fest VIP</li>
          <li>Raha Fest Regular</li>
          <li>Summer Tides Regular</li>
        </ul>
        <hr className="dashed-line" />
        <div className="total-section">
          <p>Total:</p>
        </div>
      </div>
      <div className="red-wave">
        <button className="pay-button">PAY NOW</button>
      </div>
    </div>
  );
};

export default PaymentPage;
