import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '../components/Tabs/Tabs';
import '../components/Tabs/Tabs.css'
import AddAirline from './AddAirline';
import ManageAirlines from './ManageAirlines';
import { Reports } from './Reports';





function AdminHome(props) {
    const locat=useLocation();
   
    return (

        <div>
            <Tabs>
                <div label="Airlines">
                < AddAirline
                token={locat.state.token}/>
                   
                </div>
                <div label="Manage Airlines">
                <ManageAirlines
                token={locat.state.token}/>
                   
                </div>
                <div label="Reports">
                    <Reports/>
                </div>
                <div>
                <Button name="Logout" className="btn btn-danger"/>
                </div>
            </Tabs>
        </div>
    );
}

export default AdminHome;