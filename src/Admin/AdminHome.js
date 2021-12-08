import React from 'react';
import Tabs from '../components/Tabs/Tabs';
import '../components/Tabs/Tabs.css'
import AddAirline from './AddAirline';



function AdminHome() {
    return (
        // <div className="tab-pane">
        <div>
            <Tabs>
                <div label="Manage Schedules">
                    See ya later, <em>Alligator</em>!
                </div>
                <div label="Manage Airlines">
                
                   < AddAirline/>
                </div>
                <div label="Reports">
                    Nothing to see here, this tab is <em>extinct</em>!
                </div>
            </Tabs>
        </div>
    );
}

export default AdminHome;