import React,{Component} from 'react';

export default class Home extends Component{
    render(){
        return(
            <div className="mt-5 d-flex justify-content-left">
               <div><h3>Welcome to the Medical Management Portal.</h3>
                <h4>This is the Demo app for the Medical Management portal. Here Customers can place an order and also they can modify or delete the same in Order tab.
                   And Customers can create, Modify and delete their personal profile in Customer tab. </h4></div>
            </div>
        )
    }
}
