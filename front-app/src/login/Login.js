import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        const { classes, UI: { loading } } = this.props;

        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src={null} alt="miau miau logo" className={classes.image}></img>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="username" name="username" type="text" label="Username" className={classes.textField} value={this.state.username} onChange={this.handleChange} fullWidth helperText={errors.usernameErrMessage} error={errors.usernameErrMessage ? true : false}></TextField>
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
                            Login 
                            {loading && (<CircularProgress className={classes.progress} size={25}></CircularProgress>)}
                        </Button>

                        <br></br>

                        <small>don't have an account? sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));