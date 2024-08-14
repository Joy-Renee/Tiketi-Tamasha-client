import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import '../Assets/event.css';

function Event({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://tiketi-tamasha-server.onrender.com/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Event:', error);
        setLoading(false);
      });

    fetch(`https://tiketi-tamasha-server.onrender.com/tickets/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        const initialQuantities = {};
        data.forEach((ticket) => {
          initialQuantities[ticket.id] = 0;
        });
        setTicketQuantities(initialQuantities);
      })
      .catch((error) => console.error('Error fetching Tickets:', error));
  }, [id]);

  const handleQuantityChange = (ticketId, value) => {
    setTicketQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities, [ticketId]: value };
      calculateTotalPrice(newQuantities);
      return newQuantities;
    });
  };

  const calculateTotalPrice = (quantities) => {
    let total = 0;
    const updatedTickets = tickets.map((ticket) => {
      const quantity = quantities[ticket.id] || 0;
      const subtotal = ticket.ticket_price * quantity;
      total += subtotal;
      return {
        ...ticket,
        subtotal,
        remaining: ticket.available - quantity,
      };
    });

    setTickets(updatedTickets);
    setTotalPrice(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTickets = tickets
      .filter((ticket) => ticketQuantities[ticket.id] > 0)
      .map((ticket) => ({
        event_name: event.event_name,
        ticket_description: ticket.ticket_description,
        ticket_price: ticket.ticket_price,
        quantity: ticketQuantities[ticket.id],
        available: ticket.available,
      }));

    if (typeof onAddToCart === 'function') {
      onAddToCart(selectedTickets);
    } else {
      console.error('onAddToCart is not a function');
    }

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => ({
        ...ticket,
        available: ticket.remaining,
      }))
    );

    setFormVisible(false);
    setTicketQuantities({});
    setTotalPrice(0);

    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (event) {
    return (
      <div>
        <div
          className="container-fluid d-flex align-items-center justify-content-center"
          style={{
            minHeight: '100vh',
            backgroundImage: `url('https://i.pinimg.com/originals/98/ed/ff/98edff9ceeaa334bd0f0f2e7e637901a.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundColor: '#f5f5dc',
          }}
        >
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="carrier p-4">
                <div
                  className="details_carrier row align-items-center rounded p-4 shadow p-3 mb-5"
                  style={{ backgroundColor: 'red' }}
                >
                  <div className="col-md-6">
                    {event.image && <img src={event.image} alt="event" className="img-fluid rounded" />}
                  </div>
                  <div className="col-md-6 text-center">
                    <h1 className="mb-3" style={{ color: '#ffffff' }}>
                      {event.event_name}
                    </h1>
                    <p className="mb-3" style={{ color: '#ffffff' }}>
                      {event.description}
                    </p>
                    <p className="mb-3" style={{ color: '#ffffff' }}>
                      Venue: {event.venue.name}, {event.venue.address}
                    </p>
                    <p className="mb-3" style={{ color: '#ffffff' }}>
                      Date: {event.event_date}
                    </p>
                    <p className="mb-3" style={{ color: '#ffffff' }}>
                      Time: {event.event_time}
                    </p>
                    <div className="buttons-container">
                      <button onClick={() => setFormVisible(true)} className="buy-ticket">
                        BUY TICKET
                      </button>
                      <Link to="/events">
                        <button variant="outline-dark" className="return-button">
                          Return
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {formVisible && (
                  <form onSubmit={handleSubmit} style={{ backgroundColor: 'red', padding: '20px', borderRadius: '8px' }}>
                    <h2 className="fw-light text-white fs-2">SELECT TICKETS</h2>
                    {tickets.map((ticket) => (
                      <div key={ticket.id} style={{ marginBottom: '15px' }}>
                        <h4>{ticket.ticket_description}</h4>
                        <p>Price: ${ticket.ticket_price}</p>
                        <p>Available: {ticket.available}</p>
                        <input
                          type="number"
                          min="0"
                          max={ticket.available}
                          value={ticketQuantities[ticket.id] || 0}
                          onChange={(e) => handleQuantityChange(ticket.id, Number(e.target.value))}
                        />
                        <p>Subtotal: ${ticket.subtotal ? ticket.subtotal.toFixed(2) : 0}</p>
                      </div>
                    ))}
                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                    <button type="submit" className="confirm-button">
                      Confirm Purchase
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Event not found.</div>;
  }
}

export default Event;
