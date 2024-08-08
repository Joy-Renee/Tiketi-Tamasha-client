import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Register() {
    const [customer_name,setCustomer_name] = useState('');
    const [email,setEmail] = useState('');
    const [phone_number,setPhone_number] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const registerUser = () => {
        axios.post('http://127.0.0.1:5555/signup', {
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
        <div className="container h-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="text" value={customer_name} onChange={(e) => setCustomer_name(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter your name" />
                    <label className="form-label" for="form3Example3">Customer Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter your phone number" />
                    <label className="form-label" for="form3Example3">Phone number</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>
 
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" for="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => registerUser()} >Sign Up</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="/login" className="link-danger">Login</a></p>
                  </div>
 
                </form>
              </div>
              
            </div>
          </div>
        </div>
    </div>
  );
}

export default Register