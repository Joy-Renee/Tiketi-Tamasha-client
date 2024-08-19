import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Assets/RentPage.css';

const RentPage = ({ cartItems }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/venues');
    };

    const calculateSubtotal = (item) => {
        const { venue_price } = item;
        return venue_price;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    return (
        <div className="cart-page">
            <h1 className="back-arrow" onClick={handleBackClick}>{'<'}</h1>
            <h1 className='cart'>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => {
                        const { earlyBird, regular, vip } = item.tickets || {};
                        const totalTickets = Number(regular?.available || 0) + Number(vip?.available || 0) + Number(earlyBird?.available || 0);
                        return (
                            <div key={index} className="cart-item">
                                <h2>{item.event_name}</h2>
                                <h5>Venue Name: {item.venue_name}</h5>
                                <div className='tickets'>
                                    <p>Regular Tickets: {regular?.available || 0}</p>
                                    <p>VIP Tickets: {vip?.available || 0}</p>
                                    <p>Early Bird Tickets: {earlyBird?.available || 0}</p>
                                </div>
                                <p>Total Tickets: {totalTickets}</p>
                                <p>Venue Price: ${item.venue_price}</p>
                            </div>
                        );
                    })}
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <Link to="/paymentsorganizer" state={{ cartItems }}>
                            <button className="checkout-button">Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};


export default RentPage;
