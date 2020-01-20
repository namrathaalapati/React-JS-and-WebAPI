import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddCustomerModel from './AddCustomerModel';
import EditCustomerModel from './EditCustomerModel';
import axios from 'axios';
import qs from 'qs';

export default class Customer extends Component{
  constructor(props){
      super(props);
      this.state={
          Customers:[],
          addModelShow:false,
          editModelShow:false
      }
  }

  componentDidMount(){
      this.refreshList();
  }
  refreshList(){
      const url = "http://localhost:51214/api/Customer";
      fetch(url)
      .then(res=> res.json())
      .then(data => {
          this.setState({Customers:data});
      });
  }
  componentDidUpdate(){
      this.refreshList();
  }
  deleteCus(cusid){
      if(window.confirm('Are you sure'))
      {
          const url = "http://localhost:51214/api/Customer/" +cusid;
          axios({
              method: 'delete',
              url: url,
              responseType: 'json',
              data:qs.stringify({
                  CustomerID:cusid,
              })
          })
          .then((result) => {
              this.setState({snackbaropen:true, snackbarmsg:'Deleted Successfully'});
          },
          (error)=>{
              this.setState({snackbaropen:true, snackbarmsg:'Delete Failed'});
          }
          );
      }
  }
    render(){
    const {Customers,cusid,cusname,cusadd,cusemail,cusphno} = this.state;
    let addModelClose =()=> this.setState({addModelShow:false});
    let editModelClose =()=> this.setState({editModelShow:false});
    return(
        <div>
        <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>CustomerID</th>
                    <th>CustomerName</th>
                    <th>CustomerAddress</th>
                    <th>EmailID</th>
                    <th>PhoneNO</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {Customers.map(cus =>
                <tr key={cus.CustomerID}>
                <td>{cus.CustomerID}</td>
                <td>{cus.CustomerName}</td>
                <td>{cus.CustomerAddress}</td>
                <td>{cus.EmailID}</td>
                <td>{cus.PhoneNO}</td>
                <td>
                    <ButtonToolbar>
                        <Button className="mr-2" variant="info"
                            onClick={()=> this.setState({editModelShow:true, cusid:cus.CustomerID, cusname:cus.CustomerName,cusadd:cus.CustomerAddress,cusemail:cus.EmailID,cusphno:cus.PhoneNO})}>
                         Edit
                        </Button>
                        <Button className="mr-2" variant="danger"
                            onClick={()=> this.deleteCus(cus.CustomerID)}>
                         Delete
                        </Button>
                        <EditCustomerModel show={this.state.editModelShow} onHide={editModelClose} cusid={cusid} cusname={cusname} cusadd={cusadd} cusemail={cusemail} cusphno={cusphno} />
                    </ButtonToolbar>

                </td>
                </tr>
                    )}
            </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant="primary" onClick={()=> this.setState({addModelShow:true})}>
                 Add Customer
            </Button>
            <AddCustomerModel show={this.state.addModelShow} onHide={addModelClose}/>
        </ButtonToolbar>
        </div>
    )
  }
}
