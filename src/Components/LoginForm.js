import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Assets/LoginForm.css'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const  navigate = useNavigate()

    const logInUser = () => {
        if(email.length === 0){
          alert("Enter your email!");
        }
        else if(password.length === 0){
          alert("please enter your password!");
        }
        else{
            axios.post('http://127.0.0.1:5555/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                // console.log(response.data);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }


    return (
        <div className='loginpage'>
            <div className='wrapper'>
                <div className='form-wrapper sign-in'>
                    <form>
                        <h2>Login</h2>
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
                        <p>Don't have an account? <a href="/register" className="signUpBtn-link">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
      );
}

export default LoginForm