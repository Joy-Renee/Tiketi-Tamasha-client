import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../Assets/VenuesPage.css';

const VenuesByIdPage = () => {
    const { id } = useParams();  // Get the ID from the route parameters
    const [venue, setVenue] = useState(null);
    const [showForm, setShowForm] = useState(false);  // State to control form visibility
    const [formData, setFormData] = useState({
        regular: '',
        vip: '',
        // vvips: '',
        earlyBird: '',
        // groupTicket: '',
        date: '',
        time: '',
        eventName: '',
    });

    useEffect(() => {
        // Fetch data for the specific venue using the ID
        fetch(`https://tiketi-tamasha-server.onrender.com/venues/${id}`)
            .then(response => response.json())
            .then(data => setVenue(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!venue) {
        return <p>Loading...</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="card-container">
            <div className="card">
                <img src={venue.image} alt={venue.name} className="card-image" />
                <h2 className="card-title">{venue.name}</h2>
                <p className="card-capacity">Capacity: {venue.capacity}</p>
                <p className="card-address">Address: {venue.address}</p> 
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
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder="Date "
                                    required
                                />
                                
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    placeholder="Time " 
                                    required
                                />
                                <label>Time</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    placeholder="Event Name " // Add a space to ensure the placeholder is not empty
                                    required
                                />
                                {/* <label>Event Name:</label> */}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="regular"
                                    value={formData.regular}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="Regular"
                                    required
                                    
                                />
                                {/* <label>General Admission</label> */}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="vip"
                                    value={formData.vip}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="VIP Tickets "
                                    required
                                />
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="vvips"
                                    value={formData.vvips}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="VVIP Tickets "
                                    required
                                />                               
                            </div>
                        </div> */}
                        <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="earlyBird"
                                    value={formData.earlyBird}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="Early Bird Tickets "
                                    required
                                />
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="groupTicket"
                                    value={formData.groupTicket}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="Group Tickets of 5 "
                                    required
                                />
                            </div>
                        </div> */}
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default VenuesByIdPage;
