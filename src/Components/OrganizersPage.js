import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Assets/OrganizersPage.css';

const OrganizersPage = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Welcome Event Organizers</h1>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

const Card = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('https://tiketi-tamasha-server.onrender.com/events')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredData = data.filter(item =>
        item.event_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="card-page">
            <input
                type="text"
                placeholder="Search for events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <div className="card-container">
                {filteredData.map((item) => (
                    <Link to={`/event/${item.id}`} key={item.id}>
                        <div className="card">
                            <img src={item.image} alt={item.event_name} className="card-image" />
                            <h2 className="card-title">{item.event_name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export { OrganizersPage, Card };
