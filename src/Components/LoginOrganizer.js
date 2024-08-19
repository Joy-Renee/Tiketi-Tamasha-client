import React, {useContext, useEffect, useState} from 'react'
import '../Assets/LoginForm.css'
import { UserContext } from './Context/UserContext';

function LoginOrganizer() {
    const {logInOrganizer} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logInUser = () => {
        logInOrganizer(email, password)
    }

    return (
        <div className='loginpage'>
            <div className='wrapper'>
                <div className='form-wrapper sign-in'>
                    <form>
                        <h2>Login Organizer</h2>
                        <div className='input-group'>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label >Email address</label>
                        </div>
                        <div className='input-group'>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <label >Password</label>
                        </div>
                        <div className='remember'>
                            <label ><input type='checkbox'/>Remember Me</label>
                        </div>
                        <button type="button" onClick={logInUser} >Login</button>
                        <div className='signup-link'>
                        <p>Don't have an account? <a href="/registerOrganizer" className="signUpBtn-link">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
      );
}

export default LoginOrganizer