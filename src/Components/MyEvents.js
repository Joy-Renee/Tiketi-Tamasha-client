import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Retrieve events from localStorage
    const storedEvents = localStorage.getItem('myEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleDelete = (index) => {
    // Remove the event from the state
    const updatedEvents = events.filter((_, eventIndex) => eventIndex !== index);
    setEvents(updatedEvents);

    // Update the localStorage
    localStorage.setItem('myEvents', JSON.stringify(updatedEvents));
  };

  return (
    <div className="col-md-8">
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="carrier p-4">
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
                  Venue: {event.venue_name}
                </p>
                <p className="mb-3" style={{ color: '#ffffff' }}>
                  Date: {event.event_date}
                </p>
                <p className="mb-3" style={{ color: '#ffffff' }}>
                  Time: {event.event_time}
                </p>
                <div className="buttons-container">
                  <button 
                    onClick={() => handleDelete(index)} 
                    variant="outline-dark" 
                    className="return-button"
                  >
                    Delete
                  </button>
                  <Link to="/venues">
                    <button variant="outline-dark" className="return-button">
                      Return
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default MyEvents;
