import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/common/common_login.css'
import React, { Component } from "react";
import { Dropdown, DropdownButton, Form, FormSelect, InputGroup, NavDropdown } from 'react-bootstrap';
import DropdownItem from '@restart/ui/esm/DropdownItem';

class AddAirline extends Component {
    constructor(args) {
        super(args);
        this.invisibleSuccess=false;
        this.state = { airlines: {},token:args.token , cities: []};
       
        console.log("Add airline: "+args.token);

    }

    
    onAirlineChange = (e) => {
        this.setState({ airline: e.target.value });
    }
    onInstruemntChange = (e) => {
        this.setState({ instrumentType: e.target.value });
    }
    onFromPlaceChange = (e) => {
        this.setState({ fromPlace: e.target.value });
    }

    onToPlaceChange = (e) => {
        this.setState({ toPlace: e.target.value });
    }
    onStartTimeChange = (e) => {
        this.setState({ startTime: e.target.value });
    }
    onEndTimeChange = (e) => {
        this.setState({ endTime: e.target.value });
    }
    onBusinsSeatChange = (e) => {
        this.setState({ businessClassSeats: e.target.value });
    }
    onNonBusinsSeatChange = (e) => {
        this.setState({ nonBusinessClassSeats: e.target.value });
    }
    onMealsTypeChange = (e) => {
        this.setState({ mealsType: e.target.value });
    }
    onCostChange = (e) => {
        this.setState({ ticketCost: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        var formData = new FormData();
        this.state.startTime=this.state.startTime+":00.000";
        this.state.endTime=this.state.endTime+":00.000";
        console.log(this.state.startTime);
        formData = {
            "airline": this.state.airline,"fromPlace": this.state.fromPlace, "toPlace": this.state.toPlace,
            "startTime": this.state.startTime,"endTime":this.state.endTime, "instrumentType": this.state.instrumentType, "mealsType": this.state.mealsType,
            "is_blocked": "N", "businessClassSeats": this.state.businessClassSeats, "nonBusinessClassSeats": this.state.nonBusinessClassSeats,
            "ticketCost": this.state.ticketCost
        }
        const axios = require('axios');
        axios({
            method: 'post',
            headers: { "Accept": "application/json", "content-type": "application/json",
            "token": this.state.token},
            url:'http://localhost:8090/admin/api/v1.0/flight/airline/inventory/add',
           // url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
            data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
                this.invisibleSuccess=true;
            this.setState({ ticketCost:null });
            console.log(this.invisibleSuccess);
            console.log(res)
            }
        }).catch(error=>{
            console.error('Error',error.response)
        });


    }
    componentDidMount(){
        this.setState({
            cities: [
                {name: 'Hyderabad'},
                {name: 'Bangalore'},
                {name: 'Chennai'},
                {name: 'Mumbai'},
                {name: 'Delhi'}
,            ]
        });
    }
    render() {
        

	 
      
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    
                        <h2 className="heading-section"><em>Register New Airlines</em></h2>
                </div>
                <div className="auth-wrapper-one">
                    <div className="auth-inner-one">
                        <div className="login-wrap p-0">
                            <form onSubmit={this.submitHandler} className="sign">
                                <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Airline" value={this.airline} onChange={this.onAirlineChange} required />
                                    {/* <label className="fs-6 fw-lighter" for="floatingInput">Airline</label> */}
                                </div>
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" id="floatingInstrument" placeholder="Instrument Type" value={this.instrumentType} onChange={this.onInstruemntChange} required />
                                </div>
                                </div>
                                <br/>
                                <div className="row">
                               
                                < div className="col">
                               
                                    <FormSelect  className="form-control" placeholder="From" value={this.fromPlace} onChange={this.onFromPlaceChange} required >
                                    
                                    <option className="options">Select Source</option>
                                        {this.state.cities.length >0 && this.state.cities.map(item =>		
			(<option value={item.name}>{item.name}</option>)
	)}
                                        </FormSelect>
                                </div>
                              
                                <div className="col">
                                
                                    <FormSelect  className="form-control" placeholder="To" value={this.toPlace} onChange={this.onToPlaceChange} required >
                                    
                                    <option className="options">Select Destination</option>
                                        {this.state.cities.length >0 && this.state.cities.map(item =>		
			(<option value={item.name}>{item.name}</option>)
	)}
                                        </FormSelect>
                              
                                </div>
                                
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col-sm-6">
                                   
                                    <input type="datetime-local" className="form-control" placeholder="Start Time" value={this.startTime} onChange={this.onStartTimeChange} required />
                              
                                </div>
                               
                                <div className="col-sm-6">
                                
                                
                                    <input type="datetime-local" className="form-control" placeholder="End Time" value={this.endTime} onChange={this.onEndTimeChange} required />
                    
                               
                                </div>
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Business CLass Seats" value={this.businessClassSeats} onChange={this.onBusinsSeatChange} required />
                                </div>
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NonBusiness CLass Seats" value={this.nonBusinessClassSeats} onChange={this.onNonBusinsSeatChange} required />
                                </div>    
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col">
                                <input type="text" className="form-control" placeholder="Meals Type" value={this.mealsType} onChange={this.onMealsTypeChange} required />
                                              </div>
                                              </div>
                                              <br/>
                                <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Ticket Cost" value={this.ticketCost} onChange={this.onCostChange} required />

                                </div>
                                </div>
                                <br/>
                                <div className="row">
                                <div className="col">
                                    <button type="submit" className="form-control btn btn-primary submit px-3">Add Airline</button>
                                </div>
                                </div>
                                <div className="form-group d-md-flex">
                                    <div className="w-50">
                                        <label className="checkbox-wrap checkbox-primary">Remember Me
                                            <input type="checkbox" checked />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default AddAirline;