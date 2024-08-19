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
    fetch("https://tiketi-tamasha-server.onrender.com/events")
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
  }, 300); 

  return () => clearTimeout(delaySearch);
}, [search, data]);

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPage = 3;
  const lastIndex = currentPage*recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = filteredList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredList.length/recordsPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

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
        }}
      >
        <div className="container p-3 card-container">
            <div className="row">
          {/* {filteredList.map((event) => ( */}
          {records.map((event) => (
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
        
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active':''}`} key={i}>
                  <a href="#" className="page-link" onClick={()=>changePage(n)}>{n}</a>
                </li>
              ))
            }
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ul>
        
        </div>
    )
    function nextPage(){
      if(currentPage !== npage){
        setCurrentPage(currentPage + 1)
      }
    }
    function prePage(){
      if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
      }
    }
    function changePage(id){
      setCurrentPage(id)
    }

}

export default Events;
