import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../Assets/CartPage.css';

const CartPage = ({ cartItems = [], updateCartItems, updateAvailableTickets, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEventRoute = location.pathname.includes('event');

  const handleBackClick = () => {
    if (userType === 'customer') {
      navigate('/events');
    } else if (userType === 'organizer') {
      navigate('/venues');
    }
  };

  // Calculate total
  const total = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity, 10) || 0;
    return total + (price * qty);
  }, 0);

  // Handle quantity changes for customers (event tickets)
  const handleQuantityChange = (event, idx) => {
    const newQuantity = parseInt(event.target.value, 10);
    const oldQuantity = cartItems[idx].quantity;
  
    if (newQuantity >= 0) {
      const updatedItems = cartItems.map((item, i) => {
        if (i === idx) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
  
      if (isEventRoute) {
        const quantityDifference = newQuantity - oldQuantity;
        updateAvailableTickets(cartItems[idx].event_name, cartItems[idx].ticket_description, -quantityDifference);
      }
  
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
          {cartItems.map((item, idx) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            const subtotal = (price * quantity).toFixed(2);

            return (
              <div key={idx} className="order-item">
                <p>{userType === 'customer' ? item.ticket_description : item.venue_name}</p>
                <p>Price: ${price.toFixed(2)}</p>
                <p>
                  Quantity: 
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => handleQuantityChange(e, idx)}
                    disabled={userType === 'organizer'}
                  />
                </p>
                <p>Subtotal: ${subtotal}</p>
                <hr className="dashed-line" />
              </div>
            );
          })}
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
