import Button from "@restart/ui/esm/Button";
import { array } from "prop-types";
import { useState } from "react";
import { FormSelect } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export const FlightBooking = (args) => {
    const [name, setName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mealsType, setMealsType] = useState('');
    const [seatsCount, setSeatsCount] = useState('');
    const [pname, setPname] = useState('');
    const [pgender, setPgender] = useState('');
    const [page, setPage] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [airlines, setAirlines] = useState('');
    let [arr, setArr] = useState([]);
   

    console.log(args.airlines);
    
    
    //let arr=[];
    const onnameChange = (e) => {
        setName(e.target.value)
    }

    const onEmailChange=(e)=>{
        setEmailId(e.target.value)
    }
    const onMealsTypeChange = (e) => {
        setMealsType(e.target.value)
    }
    const onSeatsCountChange=(e)=>{
        e.preventDefault();
       
        setSeatsCount(e.target.value);
        for(let i=0;i<e.target.value;i++){
        arr.push(i);
        
        }
        console.log(arr)
    }
    const onPassNameChange=(e)=>{
        console.log(e.target.value)
        setPname(e.target.value)
    }
    const onPassGenderChange=(e)=>{
        setPgender(e.target.value)
    }
    const onPassAgeChange=(e)=>{
        setPage(e.target.value)
    }
    const onAdding=(e)=>{
        setPage(e.target.value)
        const passenger={
            name:pname,
            age:page,
            gender:pgender
        }
        setPname("");
        setPage("")
        setPgender("")
        passengers.push(passenger)
        console.log(passengers)
if(airlines===''){
    setAirlines(args.airlines);
}
    }
    const onBook=(e)=>{
        
        console.log("FlightBook onBook Click : "+airlines.airline);
        var formData=new FormData();
        formData={'flightNo':airlines.flightNo,'name':name,'fromPlace':airlines.fromPlace,'toPlace':airlines.toPlace,'departure':airlines.startTime,
                    'arrival':airlines.endTime,'emailId':emailId,'mealsType':mealsType,'seatsCount':seatsCount,
                'passengers':passengers,'status':'Booked'}
        const axios=require('axios')
        axios({
            method: 'post',
            headers: { "Accept": "application/json", "content-type": "application/json"},
            url:'http://localhost:8090/FlightBook/api/v1.0/flight/booking/123',
          //  url:'http://18.216.162.83:9090/api/v1.0/flight/airline/inventory/add',
            data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
            
            console.log(res)
            alert("Ticket Booked successfully")
            }
        }).catch(error=>{
            console.error('Error',error.response)
        });
    }
    return (

        
        <div>
            <div className="container-md">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label for="inputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="Name"
                            value={name} onChange={onnameChange} required />
                    </div>
                    <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">Email</label>
                        <input type="text" className="form-control" id="inputEmail4" placeholder="Email"
                            value={emailId} onChange={onEmailChange} required />
                    </div>
                    
                    <div className="col-md-6">
                        <label for="inputName" className="form-label">Meals</label>
                        <FormSelect  className="form-control" placeholder="Meals Type" value={mealsType} onChange={onMealsTypeChange} required >
                                    
                                    <option className="form-control">Select MealType</option>
                                    <option className="options">Veg</option>
                                    <option className="options">NonVeg</option>
                                    </FormSelect>
                    </div>
                    <div className="col-md-6">
                    <label for="inputSeats" className="form-label">Seats Count</label>
                        <input type="text" className="form-control" id="inputSeats" placeholder="Seats Count"
                            value={seatsCount} onChange={(e)=>onSeatsCountChange(e)} required />
                    </div>
                    <div className="col-24">
                        <h3 className="bg-info"><i>Passenger Details</i></h3>
                    </div>
                  {/* {Array.from(({ length: {seatsCount} })=>{ */}
                
                  {arr.map((item)=>{
                      console.log("entered loop")
                        return (
                            
                    <div className='row'>
                    <div className="col-md-3">
                        <label  className="form-label">Name</label>
                        <input type="text" className="form-control"  placeholder="Name"
                            // value={pname} 
                            onChange={(e)=>onPassNameChange(e)} required />
                    </div>
                    <div className="col-md-3">
                        <label  className="form-label">Gender</label>
                        <input type="text" className="form-control"  placeholder="Gender"
                           onChange={onPassGenderChange} required />
                    </div>
                    <div className="col-md-3">
                        <label  className="form-label">Age1</label>
                        <input type="text" className="form-control"  placeholder="Age"
                            onChange={onPassAgeChange} required />
                    </div>
                    <div className="col-md-3">
                        <br/>
                        <button type="button" className="btn btn-primary"  
                             onClick={onAdding} >Add</button> 
                    </div>
                    </div>
                        )
        })}
              <Button className="btn btn-success" onClick={e=>onBook(e)}>Confirm Book</Button>
                </form>
            </div>
        </div>
    );
}