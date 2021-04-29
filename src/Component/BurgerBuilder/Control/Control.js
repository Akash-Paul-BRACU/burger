import React from 'react'
import {Card, CardBody, CardFooter, CardHeader, Button} from "reactstrap"


const controls =[
    {label:"Salad", type:"salad"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"}
]

const BuildControl = (props) =>{
    return(
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{fontWeight: "bold", fontSize:"1.2rem" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.remove}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}

const Control = (props) => {
    return (
        <div className="container ml-md-5" style={{textAlign:"center"}}>
            <Card style={{marginTop:"30px", textAlign:"center", marginBottom:"30px"}}>
                <CardHeader style={{background:"#D70F64", color:"white"}}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>

                    {
                        controls.map(item => {
                           return <BuildControl label={item.label} type={item.type} key={Math.random()}  added={() => props.ingredientAdded(item.type)} remove={() => props.ingredientRemoved(item.type)} />
                        })
                    }
                    
                </CardBody>
                <CardFooter><h5>Price:{props.price}</h5></CardFooter>
                
                <Button style={{background:"#D70F64", color:"white"}} disabled={!props.purchaseable} onClick={props.toggleModal}>Click To Proceed</Button>
            </Card>
        </div>
    )
}

export default Control
