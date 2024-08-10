import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../Assets/VenuesPage.css';

const VenuesByIdPage = () => {
    const { id } = useParams();  // Get the ID from the route parameters
    const [venue, setVenue] = useState(null);

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

    return (
        <div className="card-container">
            <div className="card">
                <img src={venue.image} alt={venue.name} className="card-image" />
                <h2 className="card-title">{venue.name}</h2>
                <p className="card-capacity">Capacity: {venue.capacity}</p>
                <p className="card-address">Address: {venue.address}</p> 
                <div className="button-container">
                    <Link to="/somewhere">
                        <button className="rent-button">Rent</button>
                    </Link>
                    <Link to="/venues">
                        <button className="back-button">Back</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default VenuesByIdPage;
