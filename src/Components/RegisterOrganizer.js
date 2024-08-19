import React, { useContext, useState } from "react";
import { UserContext } from "./Context/UserContext";

function RegisterOrganizer() {
    const [organizer_name,setorganizer_name] = useState('');
    const [email,setEmail] = useState('');
    const [phone_number,setPhone_number] = useState('');
    const [password,setPassword] = useState('');

    const {registerOrganizer} = useContext(UserContext)
     
    const registerUser = () => {
        registerOrganizer(organizer_name, email, phone_number, password)
    }

     
  return (
    <div>
        <div className='loginpage'>
            <div className='wrapper'>
                <div className='form-wrapper sign-in'>
                    <form>
                        <h2>Register Organizer</h2>
                        <div className='input-group'>
                        <input type="text" value={organizer_name} onChange={(e) => setorganizer_name(e.target.value)} />
                        <label >Organizer's Name</label>
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
                        <p>Already have an account? <a href="/loginOrganizer" className="signUpBtn-link">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        
    </div>
  );
}

export default RegisterOrganizer
