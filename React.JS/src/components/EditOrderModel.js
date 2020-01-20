import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class EditOrderModel extends Component{
    constructor(props){
        super(props);
        this.state={
            snackbaropen: false,
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (e) =>{
        this.setState({snackbaropen:false});
    }

    handleSubmit(e){
        e.preventDefault();
        const url = "http://localhost:51214/api/Order";
        axios({
            method: 'put',
            url: url,
            responseType: 'json',
            data:qs.stringify({
                OrderID:e.target.OrderID.value,
                OrderName:e.target.Name.value,
                Description:e.target.Description.value,
                Orderdate:e.target.Date.value
            })
        })
        .then((result) => {
            this.setState({snackbaropen:true, snackbarmsg:'Updated Successfully'});
        },
        (error)=>{
            this.setState({snackbaropen:true, snackbarmsg:'Update Failed'});
        }
        );
    }

    render(){
        const {show,onHide,ordid,ordname,orddesc,orddate} = this.props;
        return(
            <div className="container">
                <Snackbar
                    anchorOrigin ={{vertical:'top', horizontal:'right'}}
                    open={this.state.snackbaropen}
                    autoHideDuration= {3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                     />
                <Modal
            {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit ={this.handleSubmit}>
                                <Form.Group controlId="OrderID">
                                    <Form.Label>OrderID</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="OrderID"
                                        required
                                        disabled
                                        defaultValue={ordid}
                                        />
                                </Form.Group>
                                <Form.Group controlId="OrderName">
                                    <Form.Label>OrderName</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="Name"
                                        required
                                        defaultValue={ordname}
                                        placeholder="OrderName"/>
                                </Form.Group>
                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Description"
                                            required
                                            defaultValue={orddesc}
                                            placeholder="Description"/>
                                </Form.Group>
                                <Form.Group controlId="OrderDate">
                                    <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Date"
                                            required
                                            defaultValue={orddate}
                                            placeholder="dd-mm-yy"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Order
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant ="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
                );
    }
}
