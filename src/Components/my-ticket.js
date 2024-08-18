import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './Context/UserContext';


const MyTicket = () => {
  const {currentUser} = useContext(UserContext)

  const location = useLocation();
  const navigate = useNavigate();
  const { paymentSuccess, ticketId } = location.state || { paymentSuccess: false };
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const current_user = currentUser.id
  console.log(current_user)
  useEffect(() => {
    const postBookingAndFetchTickets = async () => {
      if (paymentSuccess) {
        try {
          // 1. Post booking to the backend
          const bookingResponse = await axios.post('http://127.0.0.1:5555/bookings', {
            ticket_id: ticketId,
            booking_date: new Date().toISOString(), // Assuming current date as booking date
            customer_id : current_user
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (bookingResponse.status === 201) {
            console.log('Booking posted successfully');

            const ticketsResponse = await axios.get('http://127.0.0.1:5555/bookings', {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (ticketsResponse.status === 200) {
              setTickets(ticketsResponse.data.bookings);
              setLoading(false);
            } else {
              alert('Failed to fetch tickets. Please try again.');
            }
          } else {
            alert('Failed to post booking. Please try again.');
          }
        } catch (error) {
          console.error('Error posting booking or fetching tickets:', error);
          alert('An error occurred while processing your request.');
          setLoading(false);
        }
      } 
      
      // else {
      //   navigate('/payments');
      // }
    };

    postBookingAndFetchTickets();
  }, [paymentSuccess, ticketId, navigate]);

  return (
    <div className="my-ticket-page">
      <h1>My Tickets</h1>
      {loading ? (
        <p>Loading your tickets...</p>
      ) : (
        <div className="tickets-section">
          {tickets.length > 0 ? (
            <ul>
              {tickets.map((ticket, idx) => (
                <li key={idx}>
                  <p>Event: {ticket.event_name}</p>
                  <p>Ticket: {ticket.ticket_description}</p>
                  <p>Quantity: {ticket.quantity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTicket;
