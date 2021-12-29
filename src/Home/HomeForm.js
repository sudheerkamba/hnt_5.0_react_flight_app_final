import Button from "@restart/ui/esm/Button";
import React,{ useState } from "react";
import { FormSelect } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../Admin/AdminLogin";
import './HomeForm.css'
const HomeForm=(args)=>{
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [airlines,setAirlines]=useState([]);
    const nav=useNavigate();
  //  const airlines=[];
   let count=0;
   const cities=[
    'Hyderabad',
          'Bangalore',
          'Chennai',
           'Mumbai',
          'Delhi'
,            ];
    // const [userInput, setUserInput] = useState({
    //   enteredTitle: '',
    //   enteredAmount: '',
    //   enteredDate: '',
    // });
  
    const fromPlaceChangeHandler = (event) => {
      
        setFromPlace(event.target.value);
        
      // setUserInput({
      //   ...userInput,
      //   enteredTitle: event.target.value,
      // });
      // setUserInput((prevState) => {
      //   return { ...prevState, enteredTitle: event.target.value };
      // });
    };
  
    const toPlaceChangeHandler = (event) => {
      
      setToPlace(event.target.value);
      // setUserInput({
      //   ...userInput,
      //   enteredAmount: event.target.value,
      // });
    };
  
    const dateChangeHandler = (event) => {
      setEnteredDate(event.target.value);
      console.log(event.target.value)
      // setUserInput({
      //   ...userInput,
      //   enteredDate: event.target.value,
      // });
    };
    const onClickBook=(event)=>{
      event.preventDefault();
      console.log("onclickbook: "+event.target.value)
      console.log("onclickbook: "+airlines[event.target.value].ticketCost)
      if(!undefined===args.logged && args.logged===true)
      {
      console.log('Homeform  logged')
      nav('/UserHome',{state:{logged:true,default:'book',airlines:airlines[event.target.value]}});
      }
      else
      nav('/AdminLog',{state:{role:'User',airlines:airlines[event.target.value]}});

    }
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      let searchData = {
        from: fromPlace,
        to: toPlace,
        date: enteredDate,
      };
      let formData=new FormData();
      console.log(searchData);
      console.log(1+enteredDate);
      const axios = require('axios');
      formData={
        "fromPlace": fromPlace,
        "toPlace": toPlace,
        "travelDate": enteredDate+"T00:00:00.000"
      }
      axios({
          method: 'post',
          headers: { "Accept": "application/json", "content-type": "application/json"},
          url:'http://localhost:8090/FlightBook/api/v1.0/flight/search',
         // url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
          data: JSON.stringify(formData)
      }).then((res) =>{ 
          console.log(res.status);
          if(res.status===200)
          {
          console.log(res)
          setAirlines(res.data)
          }
      }).catch(error=>{
          console.error('Error',error.response)
      });
     setToPlace('');
     setFromPlace('');
     setEnteredDate('');
  
     searchData=null;
     console.log(searchData);
    };
return(
    <div className="bg-gradient">
<div className="m-2">
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>From</label>
          <FormSelect value={fromPlace} onChange={fromPlaceChangeHandler} required >
                                    
          <option className="options">Select Source</option>
                                        { cities.length >0 && cities.map(item =>		
			(<option value={item}>{item}</option>)
	) }
                                        </FormSelect>
        </div>
        <div className='new-expense__control'>
          <label>To</label>
          <FormSelect value={toPlace} onChange={toPlaceChangeHandler} required >
                                    
                                    <option className="options">Select Destination</option>
                                                                  { cities.length >0 && cities.map(item =>		
                                (<option value={item}>{item}</option>)
                            ) }
                                                                  </FormSelect>
        </div>
        
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={(e)=>submitHandler(e)}>search</button>
      </div>
    </div>
    <div className="d-flex justify-content-center row m-1">
        <div className="col-md-24">
            <div className="rounded">
                <div className="table-responsive table-borderless">
                    <table className="table">
                      <thead >
                        <tr>
                        <th className="text-center">#</th>
                                
                                <th>Airlines</th>
                                <th>Date</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Seats Available</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th></th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {airlines.map((airline,i)=>{
                           let date=new Date(airline.startTime);
                           let month= date.toLocaleString('en-US', { month: 'long',day: '2-digit' });
                          let time= date.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });
                  
                          let arrivaldate=new Date(airline.endTime);
                           
                          let arrivalhour= arrivaldate.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });
                          return(
                      <tr className=" table-info  border bottom-15">
                                <td className="text-center">{count++}</td>
                                {/* <td className="text-center"><img src={flightlist} className="flight-logo" /></td> */}
                                <td className="vertical-centr"><b>{airline.airline}</b></td>
                                <td className="vertical-centr">{month}</td>
                                
                                <td className="vertical-centr">
                                <div  className=" row"><div><b>{time}</b></div>
                                {/* <div>{month}</div> */}
                                </div>
                                <div  className=" row "><div className="text-dark">{airline.fromPlace}</div></div>
                               </td>
                               <td className="vertical-centr">
                                <div  className=" row"><div><b>{arrivalhour}</b></div>
                                {/* <div>{month}</div> */}
                                </div>
                                <div  className=" row "><div className="text-dark">{airline.toPlace}</div></div>
                               </td>
                                
                               <td className="vertical-centr">56</td>
                               <td className="vertical-centr"><b>{airline.ticketCost}</b></td>
                               
                                <td className="vertical-centr"><Button className="btn btn-outline-primary" value={i} onClick={onClickBook}>Book</Button></td>
                                <td className="vertical-centr"><i className="fa fa-ellipsis-h text-black-50"></i></td>
                                </tr>
                        )})}
                      </tbody>
                      </table>
                      </div>
                      </div>
                      </div>
                      </div>

    
    </div>
);
};

export default HomeForm;