import React, { Component } from 'react'
import {connect}  from "react-redux"
import {Button, Modal, ModalBody} from "reactstrap"
import axios from "axios"

import { resetIngredients } from '../../../Redux/ActionCreator'
import Spinner from '../../Spinner/Spinner'
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
        userId: state.userId,
        token:state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}
export class CheckOut extends Component {
    state = {
        values: {
            deliveryAddress: "",
        phone: "",
        paymentType: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg:""
    }

    goBack = () =>{
        this.props.history.goBack("/")
    }

    inputChangeHandle =(e) => {
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name] : e.target.value
            }
        })
    }

    

    submitHandler =() => {
        this.setState({isLoading:true})
        const order ={
            ingredients:this.props.ingredients,
            customer:this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post("https://burger-builder-64f2f-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Order Place Successfully"
                })
                this.props.resetIngredients();
            }
            else{
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Order Failed, Order Again"
                })
            }
        })
        .catch(err =>{
            this.setState({
                isLoading: false,
                isModalOpen: true,
                    modalMsg: "Something is Wrong"
            })
        })
        console.log(order);
    }
    render() {
        let form =(<div>
                <h4 style={
                    {
                        border: "1px solid gray",
                     boxShadow:"1px 1px shadow",
                      borderRadius:"5px", 
                      padding:"20px"
                    }
                      }>Payment: {this.props.totalPrice} BDT</h4>

                <form action="" 
                style={
                    {
                        border: "1px solid gray",
                         boxShadow:"1px 1px shadow", 
                         borderRadius:"5px", 
                         padding:"20px"
                         }
                         }>
                    <textarea name="deliveryAddress" 
                    className="form-control" 
                    values={this.state.values.deliveryAddress}
                     rows="10" placeholder="Enter your Address"
                      onChange={(e) => this.inputChangeHandle(e)}
                      ></textarea> <br/>

                    <input type="text"
                     name="phone" 
                     className="form-control" 
                     values={this.state.values.phone} 
                     placeholder="Enter your phone number"
                      onChange={(e) => this.inputChangeHandle(e)}
                      /> <br/>

                    <select name="paymentType" 
                    className="form-control" 
                    values={this.state.values.paymentType} 
                    onChange={(e) => this.inputChangeHandle(e)}>

                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Master Card">Master Card</option>

                    </select> <br/>


                    <Button className="mr-auto my-5" 
                    style={{background:"#D70F64"}}
                     onClick={this.submitHandler} 
                     disabled={!this.props.purchaseable}>
                    Click for Proceed</Button>

                    <Button className="ml-1"
                     onClick={this.goBack}>Cancel</Button>

                </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> :form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
