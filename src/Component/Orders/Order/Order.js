import React from 'react'

const Order = (props) => {
    const ingredients = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "5px",
                marginRight:"10px"
            }}
            key={item.type}>{item.amount} x  <span style={{textTransform:"capitalize"}}>{item.type}  </span></span> 
           
        )
    })
    return (
        <div style={{
            border: "1px solid gray",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom:"10px"
        }}>
            <p>Order Address: {props.order.customer.deliveryAddress}</p>
            <p>Order Id: {props.order.id}</p>
            <hr/> <hr/> <hr/>
            {ingredients}
            <br/> <br/>
            <p>Price: {props.order.price} BDT</p>
        </div>
    )
}

export default Order
