import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class AddCustomerModel extends Component{
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
        const url = "http://localhost:51214/api/Customer";
        axios({
            method: 'post',
            url: url,
            responseType: 'json',
            data:qs.stringify({
                CustomerID:null,
                CustomerName:e.target.Name.value,
                CustomerAddress:e.target.Address.value,
                EmailID:e.target.Emailid.value,
                PhoneNO:e.target.Phoneno.value
            })
        })
        .then((result) => {
            this.setState({snackbaropen:true, snackbarmsg:'Added Successfully'});
        },
        (error)=>{
            this.setState({snackbaropen:true, snackbarmsg:'Add Failed'});
        }
        );
    }
    render(){
        const {show,onHide} = this.props;
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
                Add Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit ={this.handleSubmit}>
                                <Form.Group controlId="CustomerName">
                                    <Form.Label>CustomerName</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="Name"
                                    required
                                    placeholder="CustomerName"/>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Address"
                                        required
                                        placeholder="Address"/>
                                        <Form.Label>EmailID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Emailid"
                                            required
                                            placeholder="EmailID"/>
                                    <Form.Label>PhoneNO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Phoneno"
                                        required
                                        placeholder="PhoneNO"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add
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
