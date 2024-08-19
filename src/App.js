
import './App.css'
import React, { } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import LoginForm from './Components/LoginForm'
import Register from './Components/Register'
import {OrganizersPage, Card} from './Components/OrganizersPage'
import VenuesByIdPage from './Components/VenuesByIdPage'
import { UserProvider } from './Components/Context/UserContext'
import Events from './Components/events'
import Event from './Components/event'
import LoginOrganizer from './Components/LoginOrganizer'
import RegisterOrganizer from './Components/RegisterOrganizer'
import MyTickects from './Components/MyTickects'
import AdminCustomerView from './Components/AdminCustomerView'
import AdminPage from './Components/AdminPage'
import EditCustomer from './Components/EditCustomer'


function App () {
  return (
    <div className='vh-100 gradient-custom'>
      <div className='container'>
        <h1 className='page-header text-center'>Ticketi Tamasha</h1>
        <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/loginOrganizer" element={<LoginOrganizer/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/registerOrganizer" element={<RegisterOrganizer/>} />
            <Route path="/test" element={<MyTickects/>} />
            <Route path="/viewcustomers" element={<AdminCustomerView/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/editcustomer" element={<EditCustomer/>} />
            <Route path='/venues' element={
              <>
                <OrganizersPage/>
                <Card/>
              </> } />
            <Route path='/:venue/:id' element={<VenuesByIdPage/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/event/:id' element={<Event/>}/>
          </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
