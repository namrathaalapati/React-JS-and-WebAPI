import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class EditCustomerModel extends Component{
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
            method: 'put',
            url: url,
            responseType: 'json',
            data:qs.stringify({
              CustomerID:e.target.CustomerID.value,
              CustomerName:e.target.Name.value,
              CustomerAddress:e.target.Address.value,
              EmailID:e.target.Emailid.value,
              PhoneNO:e.target.Phoneno.value
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
        const {show,onHide,cusid,cusname,cusadd,cusemail,cusphno} = this.props;
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
                Edit Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit ={this.handleSubmit}>
                                <Form.Group controlId="CustomerID">
                                    <Form.Label>CustomerID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="CustomerID"
                                        required
                                        disabled
                                        defaultValue={cusid}/>
                                </Form.Group>
                                <Form.Group controlId="CustomerName">
                                    <Form.Label>CustomerName</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        required
                                        defaultValue={cusname}
                                        placeholder="CustomerName"/>
                                </Form.Group>
                                <Form.Group controlId="CustomerAddress">
                                  <Form.Label>Address</Form.Label>
                                  <Form.Control
                                        type="text"
                                        name="Address"
                                        required
                                        defaultValue={cusadd}
                                        placeholder="Address"/>
                              </Form.Group>
                               <Form.Group controlId="EmailID">
                                  <Form.Label>EmailID</Form.Label>
                                  <Form.Control
                                        type="text"
                                        name="Emailid"
                                        required
                                        defaultValue={cusemail}
                                        placeholder="EmailID"/>
                              </Form.Group>
                              <Form.Group controlId="PhoneNO">
                                  <Form.Label>PhoneNO</Form.Label>
                                  <Form.Control
                                      type="text"
                                      name="Phoneno"
                                      required
                                      defaultValue={cusphno}
                                      placeholder="PhoneNO"/>
                              </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Customer
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
