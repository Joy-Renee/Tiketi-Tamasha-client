import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";

function Navbar({ search, setSearch, setUser, loggedIn, setIsLoggedIn, setCart }) {
//   const auth = getAuth();
//   const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const restaurantElement = document.querySelector("#events");
    if (restaurantElement) {
      setTimeout(() => {
        restaurantElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      console.error("Element with ID 'packages' not found.");
    }
  }

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     signOut(auth).then(() => {
//       // Sign-out successful.
//     }).catch((error) => {
//       // An error happened.
//     });
//     setIsLoggedIn(false);
//     setCart([]);
//     setUser(null);
//     navigate('/MunchInKenya-fe');
//   };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/MunchInKenya-fe">
          <img
            src={"https://cdn.dribbble.com/userupload/10241063/file/original-78e80abe4142fe954a5a9c8fcba6903f.jpg?resize=1024x768"}
            width="120"
            height="100"
            className="d-inline-block align-top"
            alt=""
          />
          <span className="p-3  fw-lighter fs-3 text-center text-light">Tikiti Tamasha</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active p-3 fw-lighter fs-2 text-light" aria-current="page" to="/MunchInKenya-fe">Home</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link active p-3 fw-lighter fs-2 text-light" aria-current="page" to="/MunchInKenya-fe/login">Events</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link active p-3 fw-lighter fs-2 text-light" aria-current="page" to="/MunchInKenya-fe">Contact Us</Link>
            </li>   
          </ul>
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center">
              <input
                className="form-control "
                type="text"
                placeholder="Search For events"
                onChange={handleSearch}
                value={search}
                style={{ outline: '2px solid #000' }}
              />
              <button className="btn btn-outline-dark btn-sm m-2" type="submit">Search</button>
            </div>
          </form>
          <div>
            {!loggedIn && (
              <Link to="/MunchInKenya-fe/signUp">
                <button className="btn btn-outline-dark btn-sm m-2">My Tickets</button>
              </Link>
            )}
            {/* {loggedIn && ( */}
              <button className="btn btn-outline-dark btn-sm m-2" >Log out</button>
            {/* )} */}
            {/* <Link to="/MunchInKenya-fe/cart"> */}
              <img
                src={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/shopping_cart.png"}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt=""
              />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
