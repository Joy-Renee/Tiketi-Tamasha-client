import { createContext } from "react";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";


export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [authToken, setAuthtoken] = useState(()=> localStorage.getItem('token')? localStorage.getItem('token') : null);

    const register = (customer_name, email, phone_number, password) => {
        axios.post('https://tiketi-tamasha-server.onrender.com/customers', {
            customer_name:customer_name,
            email: email,
            phone_number:phone_number,
            password: password
        })
        .then(function (response) {
             console.log(response);
             alert("Successful registration");
            navigate("/login");
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };

    const logIn = (email, password) => {
        if(email.length === 0){
          alert("Enter your email!");
        }
        else if(password.length === 0){
          alert("please enter your password!");
        }
        else{
            axios.post('https://tiketi-tamasha-server.onrender.com/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.access_token);
                if (response.data.access_token){
                    setAuthtoken(response.data.access_token)
                    localStorage.setItem('token', response.data.access_token)
                    navigate("/venues");
                }
                else if(response.error){
                    alert(response.error)
                }
                
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }

    function logout(){


        fetch('https://tiketi-tamasha-server.onrender.com/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }}
            )
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.Success){
                    alert("successfully logged out")
                    setAuthtoken(null)
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            
                else{
                    alert("Something went wrong")
                }
            })
  }

    useEffect(() => {
        if(authToken){
            fetch('https://tiketi-tamasha-server.onrender.com/current_user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${authToken}`
                }
            
            })
            .then(res => res.json())
            .then(res => {
                setCurrentUser(res)
            })
    
            
        }
        else{
            setCurrentUser(null)
        }
      }, [authToken])

    const contextData = {
        currentUser,
        register,
        logIn,
        logout
    }

    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}