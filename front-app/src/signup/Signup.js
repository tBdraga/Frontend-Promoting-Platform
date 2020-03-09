import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../assets/logo.png';
import axios from 'axios'
import { Link } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//import KeyboardDatePicker from '@material-ui/pickers/DatePicker/DatePicker';
//import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            username: '',
            birthdate: new Date(),
            password: '',
            loading: false,
            errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })



        axios.post('/register', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            username: this.state.username,
            password: this.state.password,
        }).then(result => {

            this.setState({
                loading: false
            })

            let responseJSON = result;
            localStorage.setItem('userJwt', responseJSON.data.jwtToken)

            this.props.history.push('/');
        })
            .catch(err => {

                console.log(err.response);

                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        const { classes } = this.props;

        const { errors, loading } = this.state;

        const { birthdate } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src={null} alt="miau miau logo" className={classes.image}></img>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>

                    <form noVaidate onSubmit={this.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField id="firstName" name="firstName" type="text" label="First Name" className={classes.textField} value={this.state.firstName} onChange={this.handleChange} fullWidth helperText={errors.usernameErrMessage} error={errors.usernameErrMessage ? true : false}></TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField id="lastName" name="lastName" type="text" label="Last Name" className={classes.textField} value={this.state.lastName} onChange={this.handleChange} fullWidth helperText={errors.usernameErrMessage} error={errors.usernameErrMessage ? true : false}></TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField id="username" name="username" type="text" label="Username" className={classes.textField} value={this.state.username} onChange={this.handleChange} fullWidth helperText={errors.usernameErrMessage} error={errors.usernameErrMessage ? true : false}></TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        disableToolbar
                                        name="birthdate"
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="birthdate"
                                        label="Birthdate"
                                        value={birthdate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        
                        <TextField id="emailAddress" name="emailAddress" type="email" label="Email" className={classes.textField} value={this.state.emailAddress} onChange={this.handleChange} fullWidth helperText={errors.usernameErrMessage} error={errors.usernameErrMessage ? true : false}></TextField>                        

                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.passwordErrMessage} error={errors.passwordErrMessage ? true : false}></TextField>                        
                        
                        {errors.generalErrMessage && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.generalErrMessage}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Sign Up
                            {loading && (<CircularProgress className={classes.progress} size={25}></CircularProgress>)}
                        </Button>

                        <br></br>

                        <small>already have an account? log in <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);