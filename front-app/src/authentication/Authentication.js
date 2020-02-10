import React from "react"
import reactDOM from "react-dom"
import {PostData} from '../services/PostData'
import { extname } from "path";
import { runInThisContext } from "vm";
import LoginBox from '../login box/LoginBox'
import RegisterBox from '../register box/RegisterBox'

class Authentication extends React.Component{
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

export default Authentication;