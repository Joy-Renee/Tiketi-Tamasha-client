import React, { useContext, useState } from "react";
import { UserContext } from "./Context/UserContext";

function Register() {
    const [customer_name,setCustomer_name] = useState('');
    const [email,setEmail] = useState('');
    const [phone_number,setPhone_number] = useState('');
    const [password,setPassword] = useState('');

    const {register} = useContext(UserContext)
     
    const registerUser = () => {
        register(customer_name, email, phone_number, password)
    }
     
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
                        <input type="text" value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
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