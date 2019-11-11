import React from "react"
import reactDOM from "react-dom"
import {PostData} from '../services/PostData'
import { extname } from "path";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoginOpen: true,
            isRegisterOpen: false
        };
    }

    showLoginBox(){
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }

    showRegisterBox(){
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    render(){
        return(
            <div className="root-container">
                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>

                    <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>
                
                <div className="box-container">
                    {this.state.isLoginOpen && <LoginBox></LoginBox>}
                    {this.state.isRegisterOpen && <RegisterBox></RegisterBox>}
                </div>
            </div>
        );
    }
}

class LoginBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };
        this.submitLogin = this.submitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitLogin(){
        console.log("Login function");
        PostData('login', this.state).then ((result) =>{
            let responseJSON = result;
            console.log(responseJSON);
        });
    }

    render(){
        return(
            <div className="inner-container">
            <div className="header">
                Login
            </div>

            <div className="box">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.onChange}></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onChange}></input>
                </div>

                <button type="button" className="login-btn" onClick={this.submitLogin}>Login</button>
            </div>
        </div>
        );
    }
}

class RegisterBox extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    submitRegister(e){
        
    }

    render(){
        return(
            <div className="inner-container">
            <div className="header">
                Register
            </div>

            <div className="box">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="login-input" placeholder="Username"></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="login-input" placeholder="Password"></input>
                </div>

                <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
            </div>
        </div>
        );
    }
}

export default Login;