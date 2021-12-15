import { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import flightlist from '../flightlist.png';
import Arrow from '../Arrow.jpg'
import './ManageAirlines.css';
import Button from "@restart/ui/esm/Button";



class ManageAirlines extends Component{
    state = {
        listitems: ["List Item 1", "List Item 2", "List Item 3"]
      };
      constructor(args)
      {
          super(args);
          this.state={airlines:[],editValue:null};
          this.state.token=args.token;
          
         

      }
      onClickBlock=(event)=>{
        console.log("value:"+event.target.value)
        this.state.editValue=event.target.value;

        if(this.state.airlines[event.target.value].is_blocked==='Y')
        {
            this.state.airlines[event.target.value].is_blocked='N';
            console.log("after:"+this.state.airlines[event.target.value].is_blocked);
            
        }
        else{
            this.state.airlines[event.target.value].is_blocked='Y'
            console.log("after:"+this.state.airlines[event.target.value].is_blocked)

        }
        const axios = require('axios');
        axios({
            method: 'put',
            headers: { "Accept": "application/json", "content-type": "application/json",
            "token": this.state.token},
            url:'http://localhost:8090/admin/api/v1.0/flight/airlines',
           // url:'http://localhost:8090/admin/api/v1.0/flight/admin/login',
            data: JSON.stringify(this.state.airlines[event.target.value])
        }).then((res) =>{ 
            console.log(res)
            console.log(res.status);
            if(res.status===200)
            {
            console.log(res)
            this.componentDidMount();
            }
        }).catch(error=>{
            console.error('Error',error.response)
        });

      }
      componentDidMount(){
        const axios=require('axios');
        let formData=new FormData();
        axios({
          method: 'get',
          headers: { "Accept": "application/json", "content-type": "application/json",
          "token": this.state.token},
          url:'http://localhost:8090/admin/api/v1.0/flight/airlines',
         }).then((res)=>{
             console.log(res)
             this.setState({airlines: res.data});
console.log(this.state.airlines)
        }).catch(error=>{

        });

      }
      
      render(){
        console.log(this.state.airlines)
          let count=1;
        //   for(let airline1 of this.state.airlines)
        //   {
        //      listelements.push(
        //     <li>
        //     </li>);
        //   }
    return(
        
            <div className="container">
               
    <div className="d-flex justify-content-center row">
        <div className="col-md-24">
            <div className="rounded">
                <div className="table-responsive table-borderless">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Logo</th>
                                <th>Airlines</th>
                                <th>status</th>
                                <th>From-To</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
              
      {/* <ListGroup className="table-body"> */}
      {this.state.airlines.map((airline,i) =>{ 
          let date=new Date(airline.startTime);
         let month= date.toLocaleString('en-US', { month: 'long',day: '2-digit' });
        let time= date.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });

        let arrivaldate=new Date(airline.endTime);
         let arrivalmonth= arrivaldate.toLocaleString('en-US', { month: 'long' ,day: '2-digit'});
        let arrivalhour= arrivaldate.toLocaleString('en-US', { hour:'2-digit',minute:'2-digit',hour12: true });
        

        return(
                          <tr className="cell-1">
                                <td className="text-center">{count++}</td>
                                <td className="text-center"><img src={flightlist} className="flight-logo" /></td>
                                <td className="vertical-centr">{airline.airline}</td>
                                <td className="vertical-centr"><span className={airline.is_blocked=='Y'?"badge bg-danger":"badge bg-success"}>{airline.is_blocked=='Y'?"Blocked":"Running"}</span></td>
                                <td className="vertical-centr">{airline.fromPlace}<img src={Arrow} height='19px' width='30px' />{airline.toPlace}</td>
                                <td className="vertical-centr">{month}<div>{time}</div></td>
                                <td className="vertical-centr">{arrivalmonth}<div>{arrivalhour}</div></td>
                               
                                <td className="vertical-centr"><Button className="btn btn-outline-primary" value={i} onClick={this.onClickBlock}>{airline.is_blocked=='Y'?"UnBlock":"Block"} </Button></td>
                                <td className="vertical-centr"><i className="fa fa-ellipsis-h text-black-50"></i></td>
                                </tr>
        )
                         
              
        //   </ListGroupItem>
       } )}
      {/* </ListGroup> */}
      
              </tbody>
      </table>
      </div>
        </div>
        </div>
        </div>
        </div>
      
    );
          }
}
export default ManageAirlines;