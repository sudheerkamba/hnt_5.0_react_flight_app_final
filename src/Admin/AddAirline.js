import Alert from 'react-bootstrap/Alert';

import React, { Component } from "react";

class AddAirline extends Component {
    constructor() {
        super();
        this.invisibleSuccess=false;
        this.state = { airlines: {} };
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
        console.log(this.state.airline);
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
            "token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzODk4NjY1OCwiaWF0IjoxNjM4OTY4NjU4fQ.u6JhTJTwXDv8x4AmT3M1wkZrHd2sFpg3wp4yDGwa6fN2bWHWWnjRMN0gzzS9AZfILbSRpypGINKklzmuktYDxA" },
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
        
    }
    render() {
        
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section"><em>Register New Airlines</em></h2>
                        <Alert dismissible="true" show={this.invisibleSuccess} variant="success">
                            <h3>Airlines added Successfully!</h3>
                        </Alert>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="login-wrap p-0">
                            <form onSubmit={this.submitHandler} className="sign">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Airline" value={this.airline} onChange={this.onAirlineChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Instrument Type" value={this.instrumentType} onChange={this.onInstruemntChange} required />

                                </div>
                                < div className="form-group">
                                    <input type="text" className="form-control" placeholder="From" value={this.fromPlace} onChange={this.onFromPlaceChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="To" value={this.toPlace} onChange={this.onToPlaceChange} required />

                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Start Time" value={this.startTime} onChange={this.onStartTimeChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="End Time" value={this.endTime} onChange={this.onEndTimeChange} required />

                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Business CLass Seats" value={this.businessClassSeats} onChange={this.onBusinsSeatChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="NonBusiness CLass Seats" value={this.nonBusinessClassSeats} onChange={this.onNonBusinsSeatChange} required />

                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Meals Type" value={this.mealsType} onChange={this.onMealsTypeChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Ticket Cost" value={this.state.ticketCost} onChange={this.onCostChange} required />

                                </div>
                                <div className="form-group">
                                    <button type="submit" className="form-control btn btn-primary submit px-3">Add Airline</button>
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