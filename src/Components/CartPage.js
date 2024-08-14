import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Assets/CartPage.css';

const CartPage = ({ cartItems = [], updateCartItems, updateAvailableTickets }) => { 
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/events');
  };

  // Calculate total
  const total = cartItems.reduce((total, item) => {
    const price = parseFloat(item.ticket_price) || 0;
    const qty = parseInt(item.quantity, 10) || 0;
    return total + (price * qty);
  }, 0);

  // Handle quantity changes
  const handleQuantityChange = (event, idx) => {
    const newQuantity = parseInt(event.target.value, 10);
    const oldQuantity = cartItems[idx].quantity;

    if (newQuantity > 0) {
      const updatedItems = cartItems.map((item, i) => {
        if (i === idx) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Update the available tickets based on quantity change
      const quantityDifference = newQuantity - oldQuantity;
      updateAvailableTickets(cartItems[idx].event_name, cartItems[idx].ticket_description, -quantityDifference);

      updateCartItems(updatedItems);
    }
  };

  return (
    <div className="cart-container">
      <div className="order-section">
        <h1 className="back-arrow" onClick={handleBackClick}>{'<'}</h1>
        <h2 className="cart-title">Cart</h2>
        <h3 className="order-title">Your Order</h3>
        <div className="order-summary">
          {cartItems.map((item, idx) => (
            <div key={idx} className="order-item">
              <p>{item.ticket_description}</p>
              <p>Price: ${item.ticket_price}</p>
              <p>
                Quantity: 
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(e, idx)}
                />
              </p>
              <p>Subtotal: ${(item.ticket_price * item.quantity).toFixed(2)}</p>
              <hr className="dashed-line" />
            </div>
          ))}
        </div>
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link to="/payment">
          <button className="checkout-button">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
