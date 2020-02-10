import React from "react"
import reactDOM from "react-dom"
import {PostData} from '../services/PostData'
import { extname } from "path";
import { runInThisContext } from "vm";
import axios from "axios";

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

    submitLogin(e){
        //don't reload the page when request is made
        e.preventDefault();
        axios.post('/secured/authenticate',{
            username: this.state.username,
            password: this.state.password
        }).then(result => {
            let responseJSON = result;
            localStorage.setItem('user-jwt', responseJSON.data.jwtToken)
        });

        //PostData('authenticate', this.state).then ((result) =>{
        //    let responseJSON = result;
        //    console.log(responseJSON);
        //});
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
                    <input type="text" name="username" className="login-input" placeholder="Username" required onChange={this.onChange}></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="login-input" placeholder="Password" required onChange={this.onChange}></input>
                </div>

                <button type="button" className="login-btn" onClick={e => this.submitLogin(e)}>Login</button>
            </div>
        </div>
        );
    }
}

export default LoginBox;