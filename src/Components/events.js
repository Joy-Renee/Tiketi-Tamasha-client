import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import '../Assets/events.css'
// import Navbar from "./navbar";


function Events(){
  const [data, setData] = useState([])
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
      console.error("Element with ID 'packages' not found.");
    }
  }
  



  useEffect(()=>{
    fetch("https://tiketi-tamasha-server.onrender.com/events")
    .then((res)=>res.json())
    .then((data)=>setData(data))
}, [])
useEffect(() => {
  const filterList = () => {
    const keywords = search.toLowerCase().split(" ");
    const filteredList = data.filter((event) => {
      return keywords.every((keyword) => {
        return (
          event.event_name.toLowerCase().includes(keyword)
        );
      });
    });
    setFilteredList(filteredList);
  };


  const delaySearch = setTimeout(() => {
    filterList();
  }, 300); 

  return () => clearTimeout(delaySearch);
}, [search, data]);

    

    return(
      <div>
       {/* <Navbar search={search} setSearch={setSearch}/> */}
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
            {/* <div className="d-flex align-items-center"> */}
              <input
                className="form-control "
                type="text"
                placeholder="Search For events"
                onChange={handleSearch}
                value={search}
                style={{ outline: '2px solid #000' }}
              />
              {/* <button className="btn btn-outline-dark btn-sm m-2" type="submit">Search</button> */}
            {/* </div> */}
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
    }}>
        <div className="container p-3 card-container">
            <div className="row">
          {filteredList.map((event) => (
             <div className="col-sm-4 mb-2 mx-auto event-card" key={event.id} id="events">
               <div className="card">
               <Link to={`/event/${event.id}`}>
                 <img
                   src={event.image}
                   alt={event.name}
                   className="card-img-top"
                   style={{ height: '350px',  objectFit: 'cover' }}
                 />
                </Link>

                 <div className="card-body">
                   <h5 className="card-title text-center text-light ">{event.event_name}</h5>
                   <p className="card-text fst-italic fw-bold text-center text-light">{event.event_date}</p>
                 </div>
               </div>
           </div>
          ))}
        </div>

        </div>
        </div>
        </div>
    )
}

export default Events