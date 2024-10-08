// import React, { useContext, useEffect } from 'react'
// import { UserContext } from './Context/UserContext'

// function MyTickects() {
//     const {currentUser} =useContext(UserContext)
//     const current_user = currentUser
    
//     useEffect(() => {
//         fetchData()
//     }, [])

//     function fetchData(){
//         fetch(`http://127.0.0.1:5555/booking/${current_user.id}`)
//             .then(response => response.json())
//             .then((data) => {
//                 console.log(data)
//             })
//     }
//   return (
//     <div>MyTickects</div>
//   )
// }

// export default MyTickects

// import './App.css';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginPage from './Components/LoginPage';
// import LoginForm from './Components/LoginForm';
// import Register from './Components/Register';
// import { OrganizersPage, Card } from './Components/OrganizersPage';
// import VenuesByIdPage from './Components/VenuesByIdPage';
// import { UserProvider } from './Components/Context/UserContext';
// import Events from './Components/events';
// import Event from './Components/event';
// import CartPage from './Components/CartPage';
// import PaymentPage from './Components/PaymentPage';
// import LoginOrganizer from './Components/LoginOrganizer';
// import RegisterOrganizer from './Components/RegisterOrganizer';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [availableTickets, setAvailableTickets] = useState({});
//   const [userType, setUserType] = useState('customer'); // Default to customer

//   const handleAddToCart = (item) => {
//     // Ensure `cartItems` is defined in the scope where `handleAddToCart` is used
//     const updatedCart = [...cartItems];
  
//     // Check if `item` is an array or a single object
//     if (Array.isArray(item)) {
//         item.forEach((ticket) => {
//             const existingTicket = updatedCart.find(
//                 (cartItem) => cartItem.event_name === ticket.event_name && cartItem.ticket_description === ticket.ticket_description
//             );
    
//             if (existingTicket) {
//                 existingTicket.quantity += ticket.quantity;
//                 existingTicket.available -= ticket.quantity;
//             } else {
//                 updatedCart.push({
//                     ...ticket,
//                     available: ticket.available - ticket.quantity,
//                 });
//             }
//         });
//     } else {
//         // Handle single ticket item
//         const ticket = item;
//         const existingTicket = updatedCart.find(
//             (cartItem) => cartItem.event_name === ticket.event_name && cartItem.ticket_description === ticket.ticket_description
//         );
  
//         if (existingTicket) {
//             existingTicket.quantity += ticket.quantity;
//             existingTicket.available -= ticket.quantity;
//         } else {
//             updatedCart.push({
//                 ...ticket,
//                 available: ticket.available - ticket.quantity,
//             });
//         }
//     }
  
//     setCartItems(updatedCart);
// };


//   const updateCartItems = (newItems) => {
//     setCartItems(newItems);
//   };

//   const updateAvailableTickets = (eventName, ticketDescription, quantityChange) => {
//     setAvailableTickets((prevTickets) => {
//       const updatedTickets = { ...prevTickets };
//       if (!updatedTickets[eventName]) {
//         updatedTickets[eventName] = {};
//       }
//       if (!updatedTickets[eventName][ticketDescription]) {
//         updatedTickets[eventName][ticketDescription] = 0;
//       }
//       updatedTickets[eventName][ticketDescription] += quantityChange;
//       return updatedTickets;
//     });
//   };

//   return (
//     <div className='vh-100 gradient-custom'>
//       <div className='container'>
//         <h1 className='page-header text-center'>Ticketi Tamasha</h1>
//         <Router>
//           <UserProvider>
//             <Routes>
//               <Route path="/" element={<LoginPage setUserType={setUserType} />} />
//               <Route path="/login" element={<LoginForm />} />
//               <Route path="/loginOrganizer" element={<LoginOrganizer />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/registerOrganizer" element={<RegisterOrganizer />} />
//               <Route path='/venues' element={
//               <>
//                 <OrganizersPage/>
//                 <Card/>
//               </> } />
//               <Route path='/venue/:id' element={
//                 <VenuesByIdPage
//                   addToCart={handleAddToCart}
//                   userType={userType}
//                 />
//               } />
//               <Route path='/events' element={<Events />} />
//               <Route path="/event/:id" element={
//                 <Event
//                   onAddToCart={handleAddToCart}
//                   availableTickets={availableTickets}
//                   updateAvailableTickets={updateAvailableTickets}
//                   userType={userType}
//                 />
//               } />
//               <Route
//                 path="/cart"
//                 element={
//                   <CartPage
//                     cartItems={cartItems}
//                     updateCartItems={updateCartItems}
//                     updateAvailableTickets={updateAvailableTickets}
//                     userType={userType}
//                   />
//                 }
//               />
//               <Route path="/payment" element={<PaymentPage />} />
//             </Routes>
//           </UserProvider>
//         </Router>
//       </div>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage';
import LoginForm from './Components/LoginForm';
import Register from './Components/Register';
import { OrganizersPage, Card } from './Components/OrganizersPage';
import VenuesByIdPage from './Components/VenuesByIdPage';
import { UserProvider } from './Components/Context/UserContext';
import Events from './Components/events';
import Event from './Components/event';
import OrderPage from './Components/OrderPage';
import PaymentPage from './Components/PaymentPage';
import LoginOrganizer from './Components/LoginOrganizer';
import RegisterOrganizer from './Components/RegisterOrganizer';
import RentPage from './Components/RentPage'; 
import PaymentsOrganizer from './Components/PaymentsOrganizer';
import MyTicket from './Components/my-ticket';
import MyEvents from './Components/MyEvents';
import AdminCustomerView from './Components/AdminCustomerView'
import AdminPage from './Components/AdminPage'
import EditCustomer from './Components/EditCustomer'

function App () {
    const [cartItems, setCartItems] = useState([]);
  const [availableTickets, setAvailableTickets] = useState({});
  const [userType, setUserType] = useState('customer'); // Default to customer

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems];

    if (Array.isArray(item)) {
      item.forEach((ticket) => {
        const existingTicket = updatedCart.find(
          (cartItem) => cartItem.event_name === ticket.event_name && cartItem.ticket_description === ticket.ticket_description
        );

        if (existingTicket) {
          existingTicket.quantity += ticket.quantity;
          existingTicket.available -= ticket.quantity;
        } else {
          updatedCart.push({
            ...ticket,
            available: ticket.available - ticket.quantity,
          });
        }
      });
    } else {
      const ticket = item;
      const existingTicket = updatedCart.find(
        (cartItem) => cartItem.event_name === ticket.event_name && cartItem.ticket_description === ticket.ticket_description
      );

      if (existingTicket) {
        existingTicket.quantity += ticket.quantity;
        existingTicket.available -= ticket.quantity;
      } else {
        updatedCart.push({
          ...ticket,
          available: ticket.available - ticket.quantity,
        });
      }
    }

    setCartItems(updatedCart);
  };

  const updateCartItems = (newItems) => {
    setCartItems(newItems);
  };

  const updateAvailableTickets = (eventName, ticketDescription, quantityChange) => {
    setAvailableTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      if (!updatedTickets[eventName]) {
        updatedTickets[eventName] = {};
      }
      if (!updatedTickets[eventName][ticketDescription]) {
        updatedTickets[eventName][ticketDescription] = 0;
      }
      updatedTickets[eventName][ticketDescription] += quantityChange;
      return updatedTickets;
    });
  };

  return (
    <div className='vh-100 gradient-custom'>
      <div className='container'>
        <h1 className='page-header text-center'>Ticketi Tamasha</h1>

        <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/loginOrganizer" element={<LoginOrganizer/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/registerOrganizer" element={<RegisterOrganizer/>} />
             <Route path="/my-tickets" element={<MyTicket />} />
            <Route path="/viewcustomers" element={<AdminCustomerView/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/editcustomer" element={<EditCustomer/>} />
            <Route path='/venues' element={

              <>
                <OrganizersPage/>
                <Card/>
              </> } />
              <Route path='/venue/:id' element={
                <VenuesByIdPage
                  addToCart={handleAddToCart}
                  userType={userType}
                />
              } />
              <Route path='/events' element={<Events />} />
              <Route path="/event/:id" element={
                <Event
                  onAddToCart={handleAddToCart}
                  availableTickets={availableTickets}
                  updateAvailableTickets={updateAvailableTickets}
                  userType={userType}
                />
              } />
              <Route
                path="/order"
                element={
                  <OrderPage
                    cartItems={cartItems}
                    updateCartItems={updateCartItems}
                    updateAvailableTickets={updateAvailableTickets}
                    userType={userType}
                  />
                }
              />
              <Route
                path="/rent"
                element={
                  <RentPage
                    cartItems={cartItems}
                    updateCartItems={updateCartItems}
                    updateAvailableTickets={updateAvailableTickets}
                    userType={userType}
                  />
                }
              />
              <Route path="/payments" element={<PaymentPage />} />
              <Route path="/paymentsorganizer" element={<PaymentsOrganizer />} />
              <Route path="/myevents" element={<MyEvents />} />
            </Routes>
          </UserProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;


