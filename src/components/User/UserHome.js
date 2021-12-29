
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import AdminLogin from '../../Admin/AdminLogin';
import HomeForm from '../../Home/HomeForm';
import HomePage from '../../HomePage';
import { Logout } from '../common/Logout';
import Tabs from '../Tabs/Tabs';
import '../Tabs/Tabs.css'
import { BookingHistory } from './BookingHistory';
import { FlightBooking } from './FlightBooking';
import { ManageBooking } from './ManageBooking';




function UserHome(props) {
    const locat=useLocation();
    let def=null
    let logge=false;
    console.log(locat.state.airlines)
    if(null===locat.state.logged || undefined===locat.state.logged)
    console.log('not logged')
    else
    if(locat.state.logged === true){
        logge=true;
       
    if(locat.state.default==='search')
    {
    def='search';
    console.log('entered logged1')
    }if(locat.state.default==='book')
    {
    def='book';
    console.log('entered logged1'+def)
    }
    }
    
    return (

    
            <Tabs defaultval={def}>
            <div label="Book Flight">
                <FlightBooking
                airlines={locat.state.airlines}/>
                   
                </div>
            <div label="Search Flight">
                <div>{locat.state.happy}</div>
                <HomeForm
                logged={logge}
                />
                   
                </div>
                
                <div label="Manage Bookings">
                <ManageBooking/>
                   
                </div>
                <div label="Booking History">
                <BookingHistory/>
                </div>
               
                
            </Tabs>
      
    );
}

export default UserHome;