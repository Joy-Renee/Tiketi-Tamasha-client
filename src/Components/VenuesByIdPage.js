import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const VenuesByIdPage = ({ addToCart }) => {
    const { id } = useParams();  // Get the ID from the route parameters
    const [venue, setVenue] = useState(null);
    const [showForm, setShowForm] = useState(false);  // State to control form visibility
    const [formData, setFormData] = useState({
        event_name: '',
        event_date: '',
        description: '',
        event_time: '',
        image: '',
        tickets: {
            early_bird: { ticket_price: '', available: '' },
            regular: { ticket_price: '', available: '' },
            vip: { ticket_price: '', available: '' }
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data for the specific venue using the ID
        fetch(`https://tiketi-tamasha-server.onrender.com/venues/${id}`)
            .then(response => response.json())
            .then(data => setVenue(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTicketChange = (e, ticketType) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            tickets: {
                ...formData.tickets,
                [ticketType]: {
                    ...formData.tickets[ticketType],
                    [name]: value
                }
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Define the event object based on formData
        const eventToCreate = {
            event_name: formData.event_name,
            event_date: formData.event_date,
            description: formData.description,
            event_time: formData.event_time,
            image: formData.image,
            tickets: formData.tickets
        };

        // Ensure addToCart is defined and correctly handles the event object
        if (typeof addToCart === 'function') {
            addToCart(eventToCreate);
        } else {
            console.error('addToCart is not a function');
        }

        navigate('/rent', { state: { event: eventToCreate } });
    };

    if (!venue) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card-container">
            <div className="card">
                <img src={venue.image} alt={venue.name} className="card-image" />
                <h2 className="card-title">{venue.name}</h2>
                <p className="card-capacity">Capacity: {venue.capacity}</p>
                <p className="card-address">Address: {venue.address}</p>
                <p className="card-address">Venue Price: ${venue.venue_price}</p>
                <div className="button-container">
                    <button className="rent-button" onClick={() => setShowForm(!showForm)}>Rent</button>
                    <Link to="/venues">
                        <button className="back-button">Back</button>
                    </Link>
                </div>
                {showForm && (
                    <form className="rent-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="date"
                                    name="event_date"
                                    value={formData.event_date}
                                    onChange={handleInputChange}
                                    placeholder="Event Date"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="time"
                                    name="event_time"
                                    value={formData.event_time}
                                    onChange={handleInputChange}
                                    placeholder="Event Time"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="event_name"
                                    value={formData.event_name}
                                    onChange={handleInputChange}
                                    placeholder="Event Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Event Description"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    required
                                />
                            </div>
                        </div>

                        <h3>Tickets Information</h3>

                        <h4>Early Bird</h4>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="ticket_price"
                                    value={formData.tickets.early_bird.ticket_price}
                                    onChange={(e) => handleTicketChange(e, 'early_bird')}
                                    placeholder="Early Bird Price"
                                    required
                                />
                                <input
                                    type="number"
                                    name="available"
                                    value={formData.tickets.early_bird.available}
                                    onChange={(e) => handleTicketChange(e, 'early_bird')}
                                    placeholder="Early Bird Available"
                                    required
                                />
                            </div>
                        </div>

                        <h4>Regular</h4>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="ticket_price"
                                    value={formData.tickets.regular.ticket_price}
                                    onChange={(e) => handleTicketChange(e, 'regular')}
                                    placeholder="Regular Price"
                                    required
                                />
                                <input
                                    type="number"
                                    name="available"
                                    value={formData.tickets.regular.available}
                                    onChange={(e) => handleTicketChange(e, 'regular')}
                                    placeholder="Regular Available"
                                    required
                                />
                            </div>
                        </div>

                        <h4>VIP</h4>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="ticket_price"
                                    value={formData.tickets.vip.ticket_price}
                                    onChange={(e) => handleTicketChange(e, 'vip')}
                                    placeholder="VIP Price"
                                    required
                                />
                                <input
                                    type="number"
                                    name="available"
                                    value={formData.tickets.vip.available}
                                    onChange={(e) => handleTicketChange(e, 'vip')}
                                    placeholder="VIP Available"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default VenuesByIdPage;
