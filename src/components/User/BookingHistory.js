import Button from "@restart/ui/esm/Button";
import { Component } from "react";

export class BookingHistory extends Component{
    constructor(){
        super();
    this.state={bookings:[]}
    this.getBookings();
    }
    getBookings=()=>{
        var formData=new FormData();
    const axios=require('axios')
        axios({
            method: 'get',
            headers: { "Accept": "application/json", "content-type": "application/json"},
         //   params:{mailID:mailID},
            url:'http://localhost:8090/FlightBook/api/v1.0/flight/tickets',
          //  url:'http://18.216.162.83:9090/api/v1.0/flight/airline/inventory/add',
          data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
            this.setState({ bookings:res.data})
            console.log(res)
           
            }
        }).catch(error=>{
            console.error('Error',error.response)
        });
    }
    render()
    {
        console.log("History: "+this.state.bookings)
        return(
            <div>
                
<div className="d-flex justify-content-center row">
        <div className="col-md-24">
            <div className="rounded">
                <div className="table-responsive table-borderless">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                
                                <th>PNR Number</th>
                                <th>Flight Number</th>
                                <th>EMail ID</th>
                                <th>Status</th>
                                <th>Date of Journey</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>seats</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
              
      {/* <ListGroup className="table-body"> */}
      {this.state.bookings.map((ticket,i) =>{ 
          let date=new Date(ticket.departure);
          let month= date.toLocaleString('en-US', { month: 'long',day: '2-digit' });
         let time= date.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });
 
         let arrivaldate=new Date(ticket.arrival);
          
         let arrivalhour= arrivaldate.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });

        return(
                          <tr className="cell-1">
                             
                                <td className="vertical-centr">{ticket.pnrNumber}</td>
                                <td className="vertical-centr">{ticket.flightNo}</td>
                                <td className="vertical-centr">{ticket.emailId}</td>
                                <td className="vertical-centr"><span className={ticket.status=='Booked'?"badge bg-success":"badge bg-danger"}>{ticket.status=='Booked'?"booked":"cancelled"}</span></td>
                                <td className="vertical-centr">{month}</td>
                                
                                <td className="vertical-centr">
                                <div  className=" row"><div><b>{time}</b></div>
                                {/* <div>{month}</div> */}
                                </div>
                                <div  className=" row "><div className="text-dark">{ticket.fromPlace}</div></div>
                               </td>
                               <td className="vertical-centr">
                                <div  className=" row"><div><b>{arrivalhour}</b></div>
                                {/* <div>{month}</div> */}
                                </div>
                                <div  className=" row "><div className="text-dark">{ticket.toPlace}</div></div>
                               </td>
                               <td className="vertical-centr">{ticket.seatsCount}</td>
                                
                                <td className="vertical-centr"><i className="fa fa-ellipsis-h text-black-50"></i></td>
                                </tr>
        )
                         
              
        
       } )}
     
      
              </tbody>
      </table>
      </div>
      
        </div>
        </div>
        </div>

            </div>
        )
    }
    

}
 