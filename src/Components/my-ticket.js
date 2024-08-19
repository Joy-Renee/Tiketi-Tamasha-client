import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './Context/UserContext';

const MyTicket = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentSuccess, ticketId } = location.state || { paymentSuccess: false, ticketId: null };
  
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure that currentUser is available before using currentUser.id
  const current_user = currentUser
  console.log(current_user)

  useEffect (() => {
         fetchData()
      }, [])
  function fetchData() {
      fetch(`http://127.0.0.1:5555/booking/${current_user.id}`)
        .then(response => response.json())
        .then((data) => {
          console.log(data)

      })
      }
      return (
        <div>MyTickects</div>

      )}
      export default MyTicket