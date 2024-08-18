import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {

    const [list, setlist] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    
     function fetchData(apiName){
        fetch(`https://tiketi-tamasha-server.onrender.com/${apiName || "customers"}`)
            .then(response => response.json())
            .then((data) => {
                setlist(data)
            })
    }

    function handleDelete(id){
        const conf = window.confirm("Do you want to delete");
        if(conf){

        }
    }

    const firstObj = list[0]
    const thList = firstObj ? Object.keys(firstObj):[]

  return (
    <div className='container'>
        <h1>AdminPage</h1>

        <div>
            {/* <button className='btn btn-success' onClick={() => fetchData("customers")}>Customers</button> */}
            <button className='btn btn-sm ms-1 '><Link to="/adminCustomer" >Customers</Link></button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("organizers")}>Organizers</button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("venues")}>Venues</button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("events")}>Events</button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("bookings")}>Bookings</button>
        </div>

        <table className='table table-bordered border-primary mt-5'>
            <tr>
                {
                    thList.map(item => (
                        <th key={item}>{item}</th>
                    ))
                }
            </tr>
            {
                list.map(item => (
                    <tr key={item.id}>
                        {
                            thList.map(thItem => (
                                <td key={thItem}>{item[thItem]}</td>
                               
                            ))
                        }
                            <td>
                            {/* <Link to={`/update/${item.id}`} className='btn btn-sm btn-success'>Update</Link> */}
                            {/* <button onClick={e => handleDelete(item.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button> */}
                            </td>
                    </tr>
                ))
            }
            
       
        </table>
    </div>
  )
}

export default AdminPage