import Button from "@restart/ui/esm/Button";
import { useState } from "react";

export const ManageBooking=()=>{
    const[pnrNo,setPnrNo]=useState('');
    const[mailID,setMailID]=useState('');
    const[bookings,setBookings]=useState([]);
const onPnrChange=(e)=>{
    e.preventDefault();
    setMailID('');
    setPnrNo(e.target.value);
    

}
const onEMailChange=(e)=>{
    e.preventDefault();
    setPnrNo('');
    setMailID(e.target.value);
}
const onClickBlock=(e)=>{
    bookings[e.target.value].status='cancelled';
    const axios = require('axios');
    axios({
        method: 'put',
        headers: { "Accept": "application/json", "content-type": "application/json"},
        url:'http://localhost:8090/FlightBook/api/v1.0/flight/cancel',
       // url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
        data: JSON.stringify(bookings[e.target.value])
    }).then((res) =>{ 
        console.log(res)
        console.log(res.status);
        if(res.status===200)
        {
        console.log(res)
        setPnrNo(bookings[e.target.value].pnrNumber);
        onClickPnrSerach();
        }
    }).catch(error=>{
        console.error('Error',error.response)
    });
}
const onClickPnrSerach=(e)=>{
    e.preventDefault();
    var formData=new FormData();
    const axios=require('axios')
        axios({
            method: 'get',
            headers: { "Accept": "application/json", "content-type": "application/json"},
           // params:{id:pnrNo},
            url:'http://localhost:8090/FlightBook/api/v1.0/flight/ticket'+'/'+pnrNo,
          //  url:'http://18.216.162.83:9090/api/v1.0/flight/airline/inventory/add',
          data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
            setBookings(res.data)
            console.log(res)
            console.log(bookings)
           
            }
        }).catch(error=>{
            console.error('Error',error.response)
            
        });
        setPnrNo('');
}
const onClickMailSerach=(e)=>{
    e.preventDefault();
    var formData=new FormData();
    const axios=require('axios')
        axios({
            method: 'get',
            headers: { "Accept": "application/json", "content-type": "application/json"},
         //   params:{mailID:mailID},
            url:'http://localhost:8090/FlightBook/api/v1.0/flight/tickets'+'/'+mailID,
          //  url:'http://18.216.162.83:9090/api/v1.0/flight/airline/inventory/add',
          data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
            setBookings(res.data)
            console.log(res)
           
            }
        }).catch(error=>{
            console.error('Error',error.response)
        });
        setMailID('');

}
return(
<div className="container">
<div className="row">
  
    <div className="col-3">

<input type="text" className="form-control"  placeholder="PNR Number"
                            value={pnrNo} onChange={onPnrChange} required />
                            </div>
                            <div className="col-1 ">
                           
<button className="btn btn-secondary" onClick={e=>{onClickPnrSerach(e)}}>search</button>
</div>
<div className="col-4">

<input type="text" className="form-control"  placeholder="Email ID"
                            value={mailID} onChange={onEMailChange} required />
                            </div>
                            <div className="col-1 ">
                           
<button className="btn btn-secondary" onClick={e=>{onClickMailSerach(e)}}>search</button>
</div>
                        
</div>
<br/>
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
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
              
      {/* <ListGroup className="table-body"> */}
      {bookings.map((ticket,i) =>{ 
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
                                <td className="vertical-centr"><Button className="btn btn-outline-primary" value={i} disabled={ticket.status==='Booked'?false:true} onClick={onClickBlock}>{ticket.status==='Booked'?"Cancel Ticket":"Cancelled"} </Button></td>
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