import React, { useState } from "react";
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";

function Register() {
    const [customer_name,setCustomer_name] = useState('');
    const [email,setEmail] = useState('');
    const [phone_number,setPhone_number] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const registerUser = () => {
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
     
    
     
  return (
    <div>
        <div className='loginpage'>
            <div className='wrapper'>
                <div className='form-wrapper sign-in'>
                    <form>
                        <h2>Register Here</h2>
                        <div className='input-group'>
                        <input type="text" value={customer_name} onChange={(e) => setCustomer_name(e.target.value)} />
                        <label >Customer Name</label>
                        </div>
                        <div className='input-group'>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                        <label >Email address</label>
                        </div>
                        <div className='input-group'>
                        <input type="email" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
                        <label >Phone Number</label>
                        </div>
                        <div className='input-group'>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label >Password</label>
                        </div>
                        
                        <button type="button" onClick={() => registerUser()} >Sign Up</button>
                        <div className='signup-link'>
                        <p>Already have an account? <a href="/login" className="signUpBtn-link">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        
    </div>
  );
}

export default Register