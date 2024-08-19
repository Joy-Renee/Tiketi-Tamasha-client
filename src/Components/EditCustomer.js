import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditCustomer() {
  const {id} = useParams();
  const [data, setData] = useState([])
  useEffect(()=> {
    // fetch(`https://tiketi-tamasha-server.onrender.com/customers/`+id)
    //         .then(response => response.json())
    //         .then((data) => {
    //           setData(data)
    //         })
    axios.get(`https://tiketi-tamasha-server.onrender.com/customers/`+id)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])
  function handleSubmit(event){
    event.preventDefault()
    axios.put(`https://tiketi-tamasha-server.onrender.com/customers/`+id, data)
    .then(res => {
      alert("data updated successfully")
    })
  }
  return (
    <div>
        <div className='loginpage'>
            <div className='wrapper'>
                <div className='form-wrapper sign-in'>
                    <form onSubmit={handleSubmit}>
                        
                        <div className='input-group'>
                        <input type="text" value={data.customer_name} 
                        onChange={e => setData({...data, customer_name: e.target.value})}/>
                        <label >Customer Name</label>
                        </div>
                        <div className='input-group'>
                        <input type="email" value={data.email}
                        onChange={e => setData({...data, email: e.target.value})}/>
                        <label >Email address</label>
                        </div>
                        <div className='input-group'>
                        <input type="email" value={data.phone_number} 
                        onChange={e => setData({...data, phone_number: e.target.value})}/>
                        <label >Phone Number</label>
                        </div>
                        <div className='input-group'>
                        <input type="password" value={data.password} 
                        onChange={e => setData({...data, password: e.target.value})}/>
                        <label >Password</label>
                        </div>
                        
                        <button type="submit" >Update</button>
                        
                    </form>
                </div>
            </div>
            
        </div>
        
    </div>
  );
}

export default EditCustomer