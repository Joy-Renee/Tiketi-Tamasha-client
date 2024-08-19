import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminCustomerView() {

    const [list, setlist] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    
     function fetchData(){
        fetch(`https://tiketi-tamasha-server.onrender.com/customers`)
            .then(response => response.json())
            .then((data) => {
                setlist(data)
            })
    }

    function handleSubmit(id){
        const conf = window.confirm("Do you want to delete");
        if(conf){
            axios.delete(`https://tiketi-tamasha-server.onrender.com/customers/`+id)
            .then(res => {
                alert('record deleted')
            })
            .catch(err => console.log(err))
        }
    }

  return (
    <div>
        <h1>Users Information</h1>
       
        <table className='table table-bordered border-primary mt-5'>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
            </tr>
            {
                list.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                        
                            <Link to={`/editcustomer/${item.id}`} className='btn btn-sm btn-success'>Update</Link>
                            <button onClick={e => handleSubmit(item.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
                        
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default AdminCustomerView