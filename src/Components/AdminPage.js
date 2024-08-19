import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Assets/admin.css'

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

    const [current_page, setPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = current_page * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = list.slice(firstIndex, lastIndex);
    const npage = Math.ceil(list.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [search, setSearch] = useState('')
    console.log(search)

  return (
    <div className='container'>
        <h1>AdminPage</h1>

        <div>
            {/* <button className='btn btn-success' onClick={() => fetchData("customers")}>Customers</button> */}
            {/* <button className='btn btn-sm ms-1 '><Link className='btn btn-sm ms-1 ' to="/adminCustomer" >Customers</Link></button> */}
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("customers")}>Customers</button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("organizers")}>Organizers</button>
            <button className='btn btn-sm ms-1 ' onClick={() => fetchData("venues")}>Venues</button>
            {/* <button className='btn btn-sm ms-1 ' onClick={() => fetchData("events")}>Events</button> */}
            {/* <button className='btn btn-sm ms-1 ' onClick={() => fetchData("bookings")}>Bookings</button> */}
        </div>
        <form>
        <input
                className="form-control "
                type="text"
                placeholder="Search "
                onChange={(e) => setSearch(e.target.value)}
                style={{ outline: '2px solid #000' }}
              />
        </form>

        <table className='table table-bordered border-primary mt-5'>
            <tr>
                {
                    thList.map(item => (
                        <th key={item}>{item}</th>
                    ))
                }
            </tr>
            {
                // list.map(item => (
                records.filter((item) => {
                    return search.toLowerCase() === '' ? item: item.email.toLowerCase().includes(search)
                }).map(item => (
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

        <ul className='pagination'>
            <li className='page-item'>
                <a href='#' className='page-link' onClick={prePage}>Prev</a>
            </li>
            {
                numbers.map((n, i) => (
                    <li className={`page-item ${current_page === n ? 'active' : ''}`} key={i}>
                        <a href='#' className='page-link' onClick={() => changePage(n)}>{n}</a>
                    </li>
                ))
            }
            <li className='page-item'>
                <a href='#' className='page-link' onClick={nextPage}>Next</a>
            </li>
        </ul>
    </div>
  )
  function nextPage(){
    if(current_page !== npage){
        setPage(current_page + 1)
    }
  }
  function prePage(){
    if(current_page !== 1){
        setPage(current_page - 1)
    }
  }
  function changePage(id){
    setPage(id)
  }
}

export default AdminPage