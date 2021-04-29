import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Control from './Control/Control'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"
import Summary from './Summary/Summary'
import {connect} from "react-redux"
import {addIngredient, removeIngredient, updatePurchaseable} from "../../Redux/ActionCreator"

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
    totalPrice : state.totalPrice,
    purchaseable: state.purchaseable
    }   
}

const mapDispatchToProps = dispatch => {
        return{
            addIngredient: (igType) => dispatch(addIngredient(igType)),
            removeIngredient : (igType) => dispatch(removeIngredient(igType)),
            updatePurchaseable: () => dispatch(updatePurchaseable())
        }
}
export class BurgerBuilder extends Component {
    state = {
        modalOpen:false,
    }

    addIngredientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchaseable();
        
    }

    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchaseable();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: ! this.state.modalOpen
        })
    }

    handleCheckOut = () => {
        this.props.history.push("/checkout")
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.props.ingredients}></Burger>
                <Control ingredientAdded={this.addIngredientHandle} 
                ingredientRemoved={this.removeIngredientHandle} 
                price={this.props.totalPrice} 
                toggleModal ={this.toggleModal}
                purchaseable={this.props.purchaseable}></Control>
            </div>
            <div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>This is Order Summary</ModalHeader>
                    <ModalBody>
                        <h4>Total Price{this.props.totalPrice} BDT</h4>
                        <Summary ingredients={this.props.ingredients}></Summary>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{background:"#D70F64", color:"white"}}  onClick={this.handleCheckOut}>Click to Checkout</Button>
                        <Button  onClick={ this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)
