import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../Assets/VenuesPage.css';

const VenuesByIdPage = () => {
    const { id } = useParams();  // Get the ID from the route parameters
    const [event, setEvent] = useState(null);

    useEffect(() => {
        // Fetch data for the specific event using the ID
        fetch(`https://tiketi-tamasha-server.onrender.com/event/${id}`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card-container">
            <div className="card">
                <img src={event.image} alt={event.event_name} className="card-image" />
                <h2 className="card-title">{event.event_name}</h2>
                <p className="card-description">{event.description}</p>
                <p className="card-date">Date: {event.event_date}</p>
                <p className="card-time">Time: {event.event_time}</p>
                <p className="card-capacity">Capacity: {event.capacity}</p>
                {/* <p className="card-title">{event.name}</p>
                <p className="card-title">{event.address}</p> */}
                <button className="rent-button" onClick={() => alert('Button Clicked!')}>
                    RENT
                </button>
                <Link to="/events"> <button className="rent-button">  BACK </button> </Link>
                
            </div>
        </div>
    );
}

export default VenuesByIdPage;
