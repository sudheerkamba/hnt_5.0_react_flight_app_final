
import React,{ Component,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/common/common_login.css'
//import '.../node_modules/bootstrap/dist/css/bootstrap.min.css';

 const AdminLogin=()=>{
    
       const [password,setPassword]=useState('');
       const [username,setUserName]=useState('');
       const [token,setToken]=useState('');
       let isAuthorized=false;
       const navigate=useNavigate();
             

   
     const userChangeHandler=(event)=>{
        setUserName(event.target.value);
    }
    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
    };
   const  submitHandler=(event)=>{
        event.preventDefault();
        var bodyFormData = new FormData();
        console.log(password);
        //bodyFormData.append('username', username); 
        //bodyFormData.append('password', password); 
        bodyFormData={"username":username,"password":password}
        const axios=require('axios');
        axios({
            method: 'post',
            headers: {"Accept": "application/json", "content-type": "application/json" },
            url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
            data:JSON.stringify(bodyFormData)}).then(res=>{
            console.log(res);
            if(res.status===200)
            {
            isAuthorized=true;
            setToken("Bearer "+res.data.token);
            }
        }).catch(error=>{
        console.error('Error',error.response)
    });
        if(isAuthorized)
        return navigate('/AdminHome',{state:{token:token}});

    }
         
        
        return(
            <div className="auth-wrapper">
        <div className="auth-inner">
            <form >
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>UserName</label>
                    <input type="text" className="form-control"  value={username}
                    onChange={userChangeHandler} placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password}
                    onChange={passwordChangeHandler} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={(e)=>submitHandler(e)} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                    </p>

            </form>
            </div>
            </div>

        );
    }

export default AdminLogin;