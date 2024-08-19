import React, { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContext'

function MyTickects() {
    const {currentUser} =useContext(UserContext)
    const current_user = currentUser
    
    useEffect(() => {
        fetchData()
    }, [])

    function fetchData(){
        fetch(`http://127.0.0.1:5555/booking/${current_user.id}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
    }
  return (
    <div>MyTickects</div>
  )
}

export default MyTickects