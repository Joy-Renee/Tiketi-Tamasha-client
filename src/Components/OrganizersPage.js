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
            <Link to="/cart">
                <button className="cart">Cart</button>
            </Link>
        </nav>
    );
}

const Card = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('https://tiketi-tamasha-server.onrender.com/venues')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredData = data.filter(item =>
        item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="card-page">
            <input
                type="text"
                placeholder="Search for venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <div className="card-container">
                {filteredData.map((item) => (
                    <Link to={`/venue/${item.id}`} key={item.id} className="orgLink">
                        <div className="card">
                            <img src={item.image} alt={item.name} className="card-image" />
                            <h2 className="card-title">{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export { OrganizersPage, Card };
