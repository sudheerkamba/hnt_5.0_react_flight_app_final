
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import flight_logo from './flight_logo.png';
import HomeForm from './Home/HomeForm';
import './App.css';

import { React } from 'react';
import { useNavigate } from 'react-router-dom'
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import Button from '@restart/ui/esm/Button';




function HomePage() {
    let state = {
        redirect: false
    }
    const navigate = useNavigate();

    const onAdminClick = (event) => {
        const { redirect } = true;
        navigate('/AdminLog',{state:{role:"Admin"}})

    };
    const onUserClick = (event) => {
        navigate('/AdminLog',{state:{role:"User"}})
    };
    return (
        <div>
            {/* <div className="header">
    <div className="navbar navbar-default">
    <div className="container-fluid">
    <img src={flight_logo} className="App-logo" alt="logo" width="1740px"/>
       <div className="collapsed navbar-collapse">
        <ul className="list-inline">
             <li className="list-inline-item"><button type="button"  onClick={onAdminClick}>Admin</button></li>
            <li className="list-inline-item"> <button type="button"  onClick={onUserClick}>User</button></li>
        </ul>
       </div>
    </div>
    </div>
    </div> */}
            <div className="App">
                <nav className="navbar  navbar-default ">
                <img src={flight_logo} className="App-logo" alt="logo" width="100%" />
        
                </nav>
                        <nav className="navbar navbar-expand-lg bg-secondary">
                        <div className="container">
                       
                        <div className="collapsed navbar-collapse justify-content-center">
                        
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <button class="btn btn-outline-light " type="button" onClick={onAdminClick}>Admin</button>
                                </li>
                                <li className="list-inline-item"> 
                                <button class="btn btn-outline-light" type="button" onClick={onUserClick}>User</button>
                                </li>
                            </ul>
                            
                            
                        </div>
                       
                    </div>
                
                </nav>
            </div>
            <div className="container-cover-fill">
            <HomeForm></HomeForm>
            </div>

        </div>
    );

}
export default HomePage;