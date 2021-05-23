import React, { Component } from 'react'
import {Formik} from "formik"
import { auth } from '../../Redux/AuthActionCreator'
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapDispatchToProps = dispatch =>{
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}
export class Auth extends Component {
    state ={
        mode: "Sign Up"
    }
    switchModeHandler =() => {
        this.setState({mode: this.state.mode==="Sign Up"? "Login": "Sign Up"})
    }
    render() {
        let err =null;
        if(this.props.authFailedMsg!==null){
            err =<Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if(this.props.authLoading){
            form =<Spinner></Spinner>
        }
        else{
            form = (
                <Formik
                
                initialValues={
                    {
                        email:"",
                        password:"",
                        confirmPassword:""
                    }
                }

                onSubmit ={
                    (values)=> {
                        this.props.auth(values.email, values.password, this.state.mode)
                    }
                }

                validate = {(values)=> {
                        const errors = {};
                        if(!values.email){
                            errors.email ="required"
                        }
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if(!values.password){
                            errors.password ="required"
                        }
                        else if(values.password.length< 4){
                            errors.password = "Your password should be 4 characters"
                        }

                        if(this.state.mode ==="Sign Up"){
                            if(!values.confirmPassword){
                                errors.confirmPassword = "required"
                            }
                            else if(values.password!==values.confirmPassword){
                                errors.confirmPassword = "Your password didn't match. Please check"
                            }
                        }
                        console.log(values);
                        return errors;
                }}
                >
                    {({values, handleSubmit, handleChange, errors}) => (
                    <div style={
                        {
                            border:"1px gray solid",
                            padding: "15px",
                            borderRadius: "7px"
                        }
                    }>
                        <button style={{
                            backgroundColor: "#D70F64", 
                            width:"100%" ,
                            color: 'white',
                            marginBottom:"5px"
                            }} 
                            className="btn btn-lg" onClick ={this.switchModeHandler}>Switch to {this.state.mode ==="Sign Up"?"Log in": "Sign Up"}</button> 
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" placeholder="Enter Your Email" name="email" value={values.email} onChange={handleChange}/><span style={{color: "red"}}>{errors.email}</span> <br/>
                            <input type="password" className="form-control" placeholder="Enter Your Password" name="password" value={values.password} onChange={handleChange}/><span style={{color: "red"}}>{errors.password}</span> <br/>
                            {this.state.mode==="Sign Up"? <div>
                            <input type="password" className="form-control" placeholder="Enter Your Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange}/><span style={{color: "red"}}>{errors.confirmPassword}</span> <br/> 
                            </div>: null}
                            <button type="submit" className="btn btn-lg btn-success">{this.state.mode ==="Sign Up"? "Sign Up":"Log in"}</button>
                        </form>
                        </div>)}

                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
                
            </div>
        )
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Auth)
