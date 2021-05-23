import React, { Component } from 'react'
import {connect} from "react-redux"
import {fetchOrders} from "../../Redux/ActionCreator"
import Spinner from '../Spinner/Spinner'
import Order from './Order/Order'


const mapStateToProps = state => {
    return{
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOrders : (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export class Orders extends Component {
    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId)
    }

    componentDidUpdate(){
        console.log(this.props);
    }
    render() {
        let orders = null;
        if(this.props.orderErr){
            orders = <p style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "5px",
                marginRight:"10px"}}>Sorry Order hasn't loaded</p>
        }
        else {
            if(this.props.orders?.length===0){
                orders = <p style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "5px",
                    marginRight:"10px"}}>You have no order</p>
            }
            else{
                orders = this.props.orders?.map(order => {
                    return <Order order={order} key={order.id}/>
                })
            }
        }
        return (
            <div>
                  {this.props.orderLoading?<Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
