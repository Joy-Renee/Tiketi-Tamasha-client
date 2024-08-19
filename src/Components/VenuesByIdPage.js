import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../Assets/VenuesPage.css';

const VenuesByIdPage = ({ addToCart }) => {
    const { id } = useParams();  // Get the ID from the route parameters
    const [venue, setVenue] = useState(null);
    const [showForm, setShowForm] = useState(false);  // State to control form visibility
    const [formData, setFormData] = useState({

        eventName: '',
        date: '',
        timeIn: '',
        eventDescription: '',
        imageURL: '',
        tickets: {
            earlyBird: { price: '', available: '' },
            regular: { price: '', available: '' },
            vip: { price: '', available: '' }
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
        const venueToRent = {
            venue_name: venue.name,
            event_name: formData.eventName,
            event_date: formData.date,
            event_time: formData.timeIn,
            description: formData.eventDescription,
            image: formData.imageURL,
            tickets: formData.tickets,
            venue_price: venue.venue_price,

        };

        // Ensure addToCart is defined and correctly handles the event object
        if (typeof addToCart === 'function') {
            addToCart(venueToRent);
        } else {
            console.error('addToCart is not a function');
        }


        navigate('/rent', { state: { event: venueToRent } });

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
                                    name="timeIn"
                                    value={formData.timeIn}
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
                                    name="eventName"
                                    value={formData.eventName}
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
                                    name="eventDescription"
                                    value={formData.eventDescription}
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
                                    name="imageURL"
                                    value={formData.imageURL}
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
                                    name="price"
                                    value={formData.tickets.earlyBird.price}
                                    onChange={(e) => handleTicketChange(e, 'earlyBird')}
                                    placeholder="Early Bird Price"
                                    required
                                />
                                <input
                                    type="number"
                                    name="available"
                                    value={formData.tickets.earlyBird.available}
                                    onChange={(e) => handleTicketChange(e, 'earlyBird')}
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
                                    name="price"
                                    value={formData.tickets.regular.price}
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
                                    name="price"
                                    value={formData.tickets.vip.price}
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
