import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import '../Assets/CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/events');
  };

  return (
    <div className="cart-container">
      <div className="order-section">
        <h1 className="back-arrow" onClick={handleBackClick}>{'<'}</h1>
        <h2 className="cart-title">Cart</h2>
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
        <Link to="/payment">
          <button className='pay-button'>Pay Now</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
