import React from "react"
import reactDOM from "react-dom"
import {PostData} from '../services/PostData'
import { extname } from "path";
import { runInThisContext } from "vm";

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
                    <input type="text" name="username" className="login-input" placeholder="Username" required onChange={this.onChange}></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="login-input" placeholder="Password" required onChange={this.onChange}></input>
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
        this.state={
            firstName:'',
            firstNameError: '',
            lastName:'',
            lastNameError:'',
            emailAddress:'',
            emailAddressError:'',
            phoneNumber:'',
            phoneNumberError:'',
            username:'',
            usernameError:'',
            password:'',
            passwordError:'',
            status:'NOT VERIFIED'
        };
        this.onChange = this.onChange.bind(this);
    }

    submitRegister(){
        console.log("Register function");
        //validation part
        const err = this.validateFields();

        if(!err){
           // PostData('register', this.state).then ((result) =>{
            //    let responseJSON = result;
           //     console.log(responseJSON);
           // });
           console.log("SENDING REQUEST");
        }else{
            this.displayValidationErrors();
        }
    }

    displayValidationErrors(){
        /* 
        Function that displays the register input errors
        */

        //firstNameError
       this._firstNameError.focus();
       this._firstNameError.innerHTML = this.state.firstNameError;

       //lastNameError
       this._lastNameError.focus();
       this._lastNameError.innerHTML = this.state.lastNameError;

       //EMailError
       this._emailAddressError.focus();
       this._emailAddressError.innerHTML = this.state.emailAddressError;

       //PhoneError
       this._phoneNumberError.focus();
       this._phoneNumberError.innerHTML = this.state.phoneNumberError;

       //UsernameError
       this._usernameError.focus();
       this._usernameError.innerHTML = this.state.usernameError;

       //PasswordError
       this._passwordError.focus();
       this._passwordError.innerHTML = this.state.passwordError;
    }

    resetValidationErrors(){
        /* 
        Function that resets Error fields
        */

        //firstNameError
       this._firstNameError.focus();
       this._firstNameError.innerHTML = "";

       //lastNameError
       this._lastNameError.focus();
       this._lastNameError.innerHTML = "";

       //EMailError
       this._emailAddressError.focus();
       this._emailAddressError.innerHTML = "";

       //PhoneError
       this._phoneNumberError.focus();
       this._phoneNumberError.innerHTML = "";

       //UsernameError
       this._usernameError.focus();
       this._usernameError.innerHTML = "";

       //PasswordError
       this._passwordError.focus();
       this._passwordError.innerHTML = "";
    }

    validateFields(){
        /*
        Function that validates the input fields of the register form
        Fileds: First/Last Name, Email, Phone, Username, Password
        */

        //indicates if one or more field(s) contain(s) unsupported characters
        let isError = false;

        //regular expression variables
        var regFirstName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        var regLastName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        var regEmail = /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        var regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        var regUsername = /^[a-zA-Z0-9]+$/;
        var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        //First Name validation
        if(this.state.firstName == ""){
            isError = true;
            this.state.firstNameError = "First Name must be filled out.";
        }else if(!regFirstName.test(this.state.firstName)){
            isError = true;
            this.state.firstNameError = "First Name field contains unsupported characters.";
        }
        else if(this.state.firstName.length > 25){
            isError = true;
            this.state.firstNameError = "Maximum field length is 25 characters.";
        }else if(this.state.firstName.length < 2){
            isError = true;
            this.state.firstNameError = "Minimum field length must be 2 characters.";
        }
        
        //Last Name validation
        if(this.state.lastName == ""){
            isError = true;
            this.state.lastNameError = "Last Name must be filled out.";
        }else if(!regLastName.test(this.state.lastName)){
            isError = true;
            this.state.lastNameError = "Last Name field contains unsupported characters.";
        }
        else if(this.state.lastName.length > 25){
            isError = true;
            this.state.lastNameError = "Maximum field length is 25 characters.";
        }else if(this.state.lastName.length < 2){
            isError = true;
            this.state.lastNameError = "Minimum field length must be 2 characters.";
        }

        //E-Mail validation
        if(!regEmail.test(this.state.emailAddress)){
            isError = true;
            this.state.emailAddressError = "Email Address invalid.";
        }

        //Phone validation
        if(!regPhone.test(this.state.phoneNumber)){
            isError = true;
            this.state.phoneNumberError = "Phone Number invalid.";
        }

        //Username validation
        if(!regUsername.test(this.state.username)){
            isError = true;
            this.state.usernameError = "Username contains invalid characters.";
        }

        //Password validation, Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        if(!regPassword.test(this.state.password)){
            isError = true;
            this.state.passwordError = "Invalid password format.";
        }

        if(isError){
            this.setState({
                ...this.state
            });
        }

        return isError;
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        this.resetValidationErrors();
    }

    render(){
        var self = this;

        return(
            <div className="inner-container">
            <div className="header">
                Register
            </div>

            <div className="box">
                <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" className="login-input" placeholder="First Name" onChange={this.onChange}></input>
                    <div id='firstName-error' className="val-error" ref={function(el){self._firstNameError = el;}}></div>
                </div>

                <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" className="login-input" placeholder="Last Name" onChange={this.onChange}></input>
                    <div id='lastName-error' className="val-error" ref={function(el){self._lastNameError = el;}}></div>
                </div>

                <div className="input-group">
                    <label htmlFor="emailAddress">E-Mail</label>
                    <input type="text" name="emailAddress" className="login-input" placeholder="abcd@gmail.com" onChange={this.onChange}></input>
                    <div id='emailAddress-error' className="val-error" ref={function(el){self._emailAddressError = el;}}></div>
                </div>

                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input type="text" name="phoneNumber" className="login-input" placeholder="07 noi doi" onChange={this.onChange}></input>
                    <div id='phoneNumber-error' className="val-error" ref={function(el){self._phoneNumberError = el;}}></div>
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.onChange}></input>
                    <div id='username-error' className="val-error" ref={function(el){self._usernameError = el;}}></div>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onChange}></input>
                    <div id='password-error' className="val-error" ref={function(el){self._passwordError = el;}}></div>
                </div>

                <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
            </div>
        </div>
        );
    }
}

export default Login;