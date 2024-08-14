import React, { } from 'react'
import { Link } from 'react-router-dom'
import '../Assets/LoginPage.css'

export default  function LoginPage(){
  return (
    // <div>
    //     <div className='container h-100'>
    //         <div className='row h-100'>
    //             <div className='col-12'>
    //                 <h1>Welcome to Ticketi Tamasha</h1>
    //                 <p><Link to="/login" className='btn btn-success'>Login</Link> | <Link to="/register" className='btn btn-success'>Register</Link></p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div>
      <div class="landing-container">
        <div class="overlay">
          <div class="content">
            <h1>Party People</h1>
            <p>Vibes and inshallah</p>
            <div class="buttons">
              <Link to='/login' class="btn login">Login Customer</Link>
              <Link to="/register" class="btn signup">Sign Up Customer</Link>
            </div>
            <div class="buttons">
              <Link to='/loginOrganizer' class="btn login">Login Organizer</Link>
              <Link to="/registerOrganizer" class="btn signup">Sign Up Organizer</Link>
            </div>
            <div class="viewer">
              <ul class="socials">
                <li><ion-icon name="logo-facebook"></ion-icon> Facebook</li>
                <li><ion-icon name="logo-twitter"></ion-icon> Twitter</li>
                <li><ion-icon name="logo-instagram"></ion-icon> Instagram</li>
                <li><ion-icon name="mail-outline"></ion-icon> Email</li>
              </ul>
            </div>
          </div>
        </div>
      </div><div class="partners-section">
        <h2>Our Partners</h2>
        <div class="partners-logos">
          <img src="https://www.coca-colacompany.com/content/dam/company/us/en/brands/logos/jackdaniels-coca-cola-logo.jpg/width1024.jpg" alt="Partner 1" />
          <img src="https://icon2.cleanpng.com/lnd/20240809/vw/cce54495963513de935d73f288addf.webp" alt="Partner 2" />
          <img src="https://developer.spotify.com/images/guidelines/design/logos.svg" alt="Partner 4" />
        </div>
      </div><footer>
        <div class="footer-content">
          <div class="footer-section about">
            <h3>About Us</h3>
            <p>You like to party.So do we.Lets look for one.</p>
          </div>
          <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#"><ion-icon name="home-outline"></ion-icon> Home</a></li>
              <li><a href="#"><ion-icon name="people-outline"></ion-icon> About</a></li>
              <li><a href="#"><ion-icon name="call-outline"></ion-icon> Contact</a></li>
            </ul>
          </div>
          <div class="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@yourcompany.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Ticketi Tamasha. All rights reserved.</p>
        </div>
      </footer></div>
  )
}
