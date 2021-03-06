import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png'

//CSS
import './Profile.css';

//MUI stuff
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core";
import Paper from '@material-ui/core/Paper/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


//redux
import { connect } from 'react-redux';
import { registerWebsiteVisit } from '../../redux/actions/userActions';

const styles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAllign: 'center',
            position: 'relative',
            '& button': {
                position: 'relative',
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
    followersBtn: {
        padding: '10px',
    },
    followingBtn: {
        padding: '10px'
    },
    websiteBtn: {
        display: 'block',
        maxWidth: '120px'
    },
    buttons: {
        textAllign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    profileDefault: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class Profile extends Component {

    registerWebsiteVisit = () => {
        const { user: { idUser } } = this.props;
        
        this.props.registerWebsiteVisit(idUser);
    }

    render() {

        const { classes, user: { username, firstName, lastName, idUser, profileDescription, profilePicture, loading, authenticated, followingCount, followerCount, websiteLink } } = this.props;

        const profileImage = !profilePicture ? (
            <img src={defaultProfile} className="profile-image"></img>
        ) : (
                <img src={`data:image/jpeg;base64,${profilePicture}`} alt="profile" className="profile-image"></img>
            )

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        {profileImage}

                        <Button size="medium" className={classes.followersBtn}>
                            {followerCount + ' followers'}
                        </Button>

                        <Button size="medium" className={classes.followingBtn}>
                            {followingCount + ' following'}
                        </Button>
                    </div>

                    <hr></hr>

                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${idUser}`} color="primary" variant="h5">
                            @{username}
                        </MuiLink>

                        <hr></hr>

                        <Button variant="outlined" color="primary" size="small" className={classes.websiteBtn} href={websiteLink} onClick={this.registerWebsiteVisit()}>
                            Visit Website
                        </Button>

                        <hr></hr>

                        {firstName && <Typography variant="body2" color="primary">{firstName + " " + lastName}</Typography>}

                        <hr></hr>

                        {profileDescription && <Typography variant="body2" >{profileDescription}</Typography>}

                    </div>

                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">Missing profile...</Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                    </div>
                </Paper>
            )) : (<p>loading...</p>)

        return profileMarkup;
    }

}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    registerWebsiteVisit
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    registerWebsiteVisit: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));