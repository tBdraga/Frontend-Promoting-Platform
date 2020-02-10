import React from "react"
import reactDOM from "react-dom"
import {PostData} from '../services/PostData'
import { extname } from "path";
import { runInThisContext } from "vm";

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
        //Validation function call
        this.validateFields(this.state.firstName,this.state.lastName,this.state.emailAddress,this.state.phoneNumber,this.state.username,this.state.password);
    }

    sendRequest(){
        //user attributes
        var fN = this.state.firstName;
        var lN = this.state.lastName;
        var eA = this.state.emailAddress;
        var pN = this.state.phoneNumber;
        var uN = this.state.username;
        var pW = this.state.password;
        var sT = this.state.status;

        //constructing body that will be sent to be
        var body = {firstName:fN,lastName:lN,emailAddress:eA,phoneNumber:pN,username:uN,password:pW,status:sT};
        console.log(body);
        PostData('register', body).then ((result) =>{
            let responseJSON = result;
            console.log(responseJSON);
        });
    }

    displayValidationErrors(firstNameError,lastNameError,emailAddressError,phoneNumberError,usernameError,passwordError){
        /* 
        Function that displays the register input errors
        */

        //firstNameError
       this._firstNameError.focus();
       this._firstNameError.innerHTML = firstNameError;

       //lastNameError
       this._lastNameError.focus();
       this._lastNameError.innerHTML = lastNameError;

       //EMailError
       this._emailAddressError.focus();
       this._emailAddressError.innerHTML = emailAddressError;

       //PhoneError
       this._phoneNumberError.focus();
       this._phoneNumberError.innerHTML = phoneNumberError;

       //UsernameError
       this._usernameError.focus();
       this._usernameError.innerHTML = usernameError;

       //PasswordError
       this._passwordError.focus();
       this._passwordError.innerHTML = passwordError;
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

       this.setState({
        firstNameError: '',
        lastNameError: '',
        emailAddressError: '',
        phoneNumberError: '',
        usernameError: '',
        passwordError: ''
        });
    }

    validateFields(firstName,lastName,emailAddress,phoneNumber,username,password){
        console.log("In validate fields");
        /*
        Function that validates the input fields of the register form
        Fileds: First/Last Name, Email, Phone, Username, Password
        */

        //error variables
        var firstNameErr='', lastNameErr='', emailAddressErr='', phoneNumberErr='', usernameErr='', passwordErr='';

        //indicates if one or more field(s) contain(s) unsupported characters
        let isError = false;

        //regular expression variables
        var regFirstName = RegExp('[a-zA-Z ]+');
        var regLastName = RegExp('[a-zA-Z ]+');
        var regEmail = RegExp(/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);
        var regPhone = RegExp('[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}');
        var regUsername = RegExp('[a-zA-Z0-9]+');
        var regPassword = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}');

        //First Name validation
        if(this.state.firstName == ""){
            isError = true;
            firstNameErr = "First Name must be filled out.";
        }else if(!regFirstName.test(firstName)){
            isError = true;
            firstNameErr = "First Name field contains unsupported characters.";
        }
        else if(this.state.firstName.length > 25){
            isError = true;
            firstNameErr = "Maximum field length is 25 characters.";
        }else if(this.state.firstName.length < 2){
            isError = true;
            firstNameErr = "Minimum field length must be 2 characters.";
        }
        
        //Last Name validation
        if(this.state.lastName == ""){
            isError = true;
            lastNameErr = "Last Name must be filled out.";
        }else if(!regLastName.test(lastName)){
            isError = true;
            lastNameErr = "Last Name field contains unsupported characters.";
        }
        else if(this.state.lastName.length > 25){
            isError = true;
            lastNameErr = "Maximum field length is 25 characters.";
        }else if(this.state.lastName.length < 2){
            isError = true;
            lastNameErr = "Minimum field length must be 2 characters.";
        }

        //E-Mail validation
        if(!regEmail.test(emailAddress)){
            isError = true;
            emailAddressErr = "Email Address invalid.";
        }

        //Phone validation
        if(!regPhone.test(phoneNumber)){
            isError = true;
            phoneNumberErr = "Phone Number invalid.";
        }

        //Username validation
        if(!regUsername.test(username)){
            isError = true;
            usernameErr = "Username contains invalid characters.";
        }

        //Password validation, Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        if(!regPassword.test(password)){
            isError = true;
            passwordErr = "Invalid password format.";
        }

        if(isError){
            console.log("In isError test: " + firstNameErr + lastNameErr);
            this.setState({
                firstNameError: firstNameErr,
                lastNameError: lastNameErr,
                emailAddressError: emailAddressErr,
                phoneNumberError: phoneNumberErr,
                usernameError: usernameErr,
                passwordError: passwordErr
            }, function(){this.displayValidationErrors(this.state.firstNameError,this.state.lastNameError,this.state.emailAddressError,this.state.phoneNumberError,this.state.usernameError,this.state.passwordError);}.bind(this));
        }else{
            this.sendRequest();
        }
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

export default RegisterBox;