import './App.css';
import React, { useState } from 'react'; // Import useState
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import LoginForm from './Components/LoginForm';
import Register from './Components/Register';
import { OrganizersPage, Card } from './Components/OrganizersPage';
import VenuesByIdPage from './Components/VenuesByIdPage';
import { UserProvider } from './Components/Context/UserContext';
import Events from './Components/events';
import Event from './Components/event';
import CartPage from './Components/CartPage';
import PaymentPage from './Components/PaymentPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOrganizer from './Components/LoginOrganizer';
import RegisterOrganizer from './Components/RegisterOrganizer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (selectedTickets) => {
    const updatedCart = [...cartItems];

    selectedTickets.forEach((ticket) => {
      const existingTicket = updatedCart.find(
        (item) => item.event_name === ticket.event_name && item.ticket_description === ticket.ticket_description
      );

      if (existingTicket) {
        existingTicket.quantity += ticket.quantity;
        existingTicket.available -= ticket.quantity;
      } else {
        updatedCart.push({
          ...ticket,
          available: ticket.available - ticket.quantity,
        });
      }
    });

    setCartItems(updatedCart);
  };

  const updateCartItems = (newItems) => {
    setCartItems(newItems);
  };

  const updateAvailableTickets = (eventName, ticketDescription, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.event_name === eventName && item.ticket_description === ticketDescription
          ? { ...item, available: item.available + quantityChange }
          : item
      )
    );
  };

  return (
    <div className='vh-100 gradient-custom'>
      <div className='container'>
        <h1 className='page-header text-center'>Ticketi Tamasha</h1>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/loginOrganizer" element={<LoginOrganizer />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registerOrganizer" element={<RegisterOrganizer />} />
              <Route path='/venues' element={
                <>
                  <OrganizersPage />
                  <Card />
                </>
              } />
              <Route path='/:venue/:id' element={<VenuesByIdPage />} />
              <Route path='/events' element={<Events />} />
              <Route path="/event/:id" element={<Event onAddToCart={handleAddToCart} />} />
              <Route
                path="/cart"
                element={<CartPage cartItems={cartItems} updateCartItems={updateCartItems} updateAvailableTickets={updateAvailableTickets} />}
              />
              <Route path='/payment' element={<PaymentPage />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
