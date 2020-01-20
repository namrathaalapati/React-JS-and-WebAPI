import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddOrderModel from './AddOrderModel';
import EditOrderModel from './EditOrderModel';
import axios from 'axios';
import qs from 'qs';

export default class Order extends Component{
    constructor(props){
        super(props);
        this.state={
            Orders:[],
            addModelShow:false,
            editModelShow:false
        }
    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        const url = "http://localhost:51214/api/Order";
        fetch(url)
        .then(res=> res.json())
        .then(data => {
            this.setState({Orders:data});
        });
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteOrd(ordid){
        if(window.confirm('Are you sure'))
        {
            const url = "http://localhost:51214/api/Order/" +ordid;
            axios({
                method: 'delete',
                url: url,
                responseType: 'json',
                data:qs.stringify({
                    OrderID:ordid,
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
        const {Orders,ordid,ordname,orddesc,orddate} = this.state;
        let addModelClose =()=> this.setState({addModelShow:false});
        let editModelClose =()=> this.setState({editModelShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>OrderName</th>
                        <th>Description</th>
                        <th>OrderDate</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {Orders.map(ord =>
                    <tr key={ord.OrderID}>
                    <td>{ord.OrderID}</td>
                    <td>{ord.OrderName}</td>
                    <td>{ord.Description}</td>
                    <td>{ord.OrderDate}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-2" variant="info"
                                onClick={()=> this.setState({editModelShow:true, ordid:ord.OrderID, ordname:ord.OrderName,orddesc:ord.Description,orddate:ord.OrderDate})}>
                             Edit
                            </Button>
                            <Button className="mr-2" variant="danger"
                                onClick={()=> this.deleteOrd(ord.OrderID)}>
                             Delete
                            </Button>
                            <EditOrderModel show={this.state.editModelShow} onHide={editModelClose} ordid={ordid} ordname={ordname} orddesc={orddesc} orddate={orddate}/>
                        </ButtonToolbar>

                    </td>
                    </tr>
                        )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={()=> this.setState({addModelShow:true})}>
                     Add Order
                </Button>
                <AddOrderModel show={this.state.addModelShow} onHide={addModelClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}
