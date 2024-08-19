import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import '../Assets/events.css'

function Events() {
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const eventElement = document.querySelector("#events");
    if (eventElement) {
      setTimeout(() => {
        eventElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      console.error("Element with ID 'events' not found.");
    }
  }

  useEffect(() => {
    fetch("https://tiketi-tamasha-server.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    const filterList = () => {
      const keywords = search.toLowerCase().split(" ");
      const filteredList = data.filter((event) => {
        const eventName = event.event_name.toLowerCase();
        const eventAddress = event.venue ? event.venue.address.toLowerCase() : "";
        const eventVenue = event.venue ? event.venue.name.toLowerCase() : "";

        return keywords.every((keyword) => {
          return eventName.includes(keyword) || eventAddress.includes(keyword) || eventVenue.includes(keyword);
        });
      });
      setFilteredList(filteredList);
    };
  
    const delaySearch = setTimeout(() => {
      filterList();
    }, 300); // Adding a delay to avoid excessive filtering
  
    return () => clearTimeout(delaySearch);
  }, [search, data]);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Welcome To Tiketi Tamasha Events</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/my-tickets">My Tickets</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Search For events"
          onChange={handleSearch}
          value={search}
          style={{ outline: '2px solid #000' }}
        />
      </form>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url('https://i.pinimg.com/originals/02/fb/32/02fb32678c8a32707c52084c315dc5e9.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f5f5dc'
        }}
      >
        <div className="container p-3 card-container">
          <div className="row">
            {filteredList.map((event) => (
              <div className="col-sm-4 mb-2 mx-auto event-card" key={event.id} id="events">
                <div className="card">
                  <Link to={`/event/${event.id}`}>
                    <img
                      src={event.image}
                      alt={event.event_name}
                      className="card-img-top"
                      style={{ height: '350px', objectFit: 'cover' }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title text-center text-light">{event.event_name}</h5>
                    <p className="card-text fst-italic fw-bold text-center text-light">venue: {event.venue.name}, address:{event.venue.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
