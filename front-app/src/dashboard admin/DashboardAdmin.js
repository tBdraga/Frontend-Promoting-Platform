import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, Icon } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


//redux
import { connect } from 'react-redux';
import { getPostReports } from '../redux/actions/dataActions';

//components
import PostReport from '../components/post report/PostReport';

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
    progress: {
        position: 'absolute'
    },
    button: {
        position: 'relative',
        marginTop: 10
    }
});

class DashboardAdmin extends Component {

    loadReports = () => {
        let url = '/reports/getReports';

        this.props.getPostReports(url);
    }

    render() {
 
        const { classes, user: { username, firstName, lastName, idUser, profileDescription, profilePicture, loading, authenticated }, data: { loadingPostReports, postReports } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={`data:image/jpeg;base64,${profilePicture}`} alt="profile" className="profile-image"></img>
                    </div>

                    <hr></hr>

                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${idUser}`} color="primary" variant="h5">
                            @{username}
                        </MuiLink>

                        <hr></hr>

                        {firstName && <Typography variant="body2" color="primary">{firstName + " " + lastName}</Typography>}

                        <hr></hr>

                        {profileDescription && <Typography variant="body2" >{profileDescription}</Typography>}

                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loadingPostReports}
                        onClick={this.loadReports}
                    >
                        Load Reports
                            {loadingPostReports && (<CircularProgress className={classes.progress} size={25}></CircularProgress>)}
                    </Button>
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


        let recentReportsMarkup = !loadingPostReports ? (
            postReports.map(report => <PostReport post={report.post}></PostReport>)
        ) : <p></p>

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {profileMarkup}
                </Grid>

                <Grid item xs={8}>
                    {recentReportsMarkup}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToPros = {
    getPostReports
};

DashboardAdmin.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getPostReports: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(DashboardAdmin));