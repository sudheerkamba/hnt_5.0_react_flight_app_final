
import React,{ Component,useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/common/common_login.css'
//import '.../node_modules/bootstrap/dist/css/bootstrap.min.css';

 const AdminLogin=()=>{
    const loc= useLocation();
   
       const [password,setPassword]=useState('');
       const [username,setUserName]=useState('');
       const [token,setToken]=useState('');
       let isAuthorized=false;
       let roleCD='';
       const navigate=useNavigate();
       loc.state.role==="Admin"? (roleCD="Admin"):(loc.state.role==="User"?roleCD="User":roleCD="")
       console.log(loc.state.role);     

   
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
        
        console.log("roleCD:"+roleCD);
        if(roleCD==="Admin"){
        axios({
            method: 'post',
            headers: {"Accept": "application/json", "content-type": "application/json" },
            url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
          //url:'http://18.216.162.83:9090/api/v1.0/flight/admin/login',
          //url:'https://gac2lc1ze2.execute-api.us-east-2.amazonaws.com/dev/login',
            data:JSON.stringify(bodyFormData)}).then(res=>{
            console.log(res);
            if(res.status===200)
            {
            isAuthorized=true;
            setToken("Bearer "+res.data.token);
            if(isAuthorized)
            navigate('/AdminHome',{state:{token:"Bearer "+res.data.token}});
            }
        }).catch(error=>{
        console.error('Error',error.response)
    });
       
}else if(roleCD==="User"){
    console.log(loc.state.airlines)
    if(undefined===loc.state.airlines || null===loc.state.airlines)
    username==="user"&&password==="user"?navigate('/UserHome',{state:{logged:true,default:'search'}}):alert("Invalid credentials")
    else
    username==="user"&&password==="user"?navigate('/UserHome',{state:{logged:true,default:'book',airlines:loc.state.airlines}}):alert("Invalid credentials")
}else{
    alert("Invalid Credentials")
}

    }
         
        
        return(
            <div className="auth-wrapper">
        <div className="auth-inner">
            <div >
                <h3>{loc.state.role}{" "}Sign In</h3>

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

            </div>
            </div>
            </div>

        );
    }

export default AdminLogin;