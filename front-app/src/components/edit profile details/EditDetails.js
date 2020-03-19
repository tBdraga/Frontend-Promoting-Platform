import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAllign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '& .profile-details': {
            textAllign: 'center',
            '& span, svg': {
                verticalAllign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAllign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    textField: {
        padding: '10px'
    }
});

class EditDetails extends Component {
    state = {
        profileDescription: '',
        firstName: '',
        lastName: '',
        isOpen: false
    };

    mapUserDetailsToState = (userProps) => {
        this.setState({
            profileDescription: userProps.profileDescription ? userProps.profileDescription : '',
            firstName: userProps.firstName ? userProps.firstName : '',
            lastName: userProps.lastName ? userProps.lastName : ''
        });
    }

    componentDidMount() {
        const { user } = this.props;

        this.mapUserDetailsToState(user);
    };

    handleOpen = () => {
        this.setState({
            isOpen: true
        });

        this.mapUserDetailsToState(this.props.user);
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () =>{
        const userDetails = {
            profileDescription: this.state.profileDescription,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        this.props.editUserDetails(userDetails, this.props.user.idUser);

        this.handleClose();
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"></EditIcon>
                    </IconButton>
                </Tooltip>

                <Dialog open={this.state.isOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit personal details</DialogTitle>

                    <DialogContent>
                        <form>
                            <TextField name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="First Name"
                                className={classes.textField}
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                fullWidth>
                            </TextField>

                            <TextField name="lastName"
                                type="text"
                                label="Last Name"
                                placeholder="Last Name"
                                className={classes.textField}
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                fullWidth>
                            </TextField>

                            <TextField name="profileDescription"
                                type="text"
                                label="Profile Description"
                                multiline
                                rows="6"
                                placeholder="A few words about you"
                                className={classes.textField}
                                value={this.state.profileDescription}
                                onChange={this.handleChange}
                                fullWidth>
                            </TextField>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToPros = { editUserDetails };

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(EditDetails));