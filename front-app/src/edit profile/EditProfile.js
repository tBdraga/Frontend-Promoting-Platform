import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

//components
import Post from '../components/post/Post.js';

//CSS
import './EditProfile.css';

//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

//redux
import { connect } from 'react-redux';

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
    }
});

class EditProfile extends Component {
    state = {
        posts: [],
        startPosition: 0,
        step: 3,
        hasMore: true
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.fetchInitialPosts(nextProps.user);
        }
    }

    fetchInitialPosts(userProps) {
        let startPosition = this.state.startPosition;
        let step = this.state.step;

        let url = '/users/getPersonalPostsPaginated/' + userProps.idUser;

        //get initial Posts
        Axios.post(url, null, {
            params: {
                startPosition: startPosition,
                step: step
            }
        })
            .then((res) => {
                let posts = res.data

                this.setState({
                    posts: posts,
                });
            })
            .catch(err => console.log(err));
    }

    fetchNextPosts = () => {
        let step = this.state.step;
        let currentStartPosition = this.state.startPosition;

        let newStartPosition = currentStartPosition + step;

        let url;

        if (this.props.user.idUser)
            url = '/users/getPersonalPostsPaginated/' + this.props.user.idUser;

        if (url) {
            //get new Posts
            Axios.post(url, null, {
                params: {
                    startPosition: newStartPosition,
                    step: step
                }
            })
                .then((res,miau) => {
                    let posts = res.data

                    if (posts) {
                        this.setState({
                            //append new Posts
                            posts: this.state.posts.concat(posts),
                            startPosition: newStartPosition
                        });
                    } else {
                        this.setState({
                            hasMore: false
                        });

                        return;
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {

        const { classes, user: { username, firstName, lastName, idUser, profileDescription, profilePicture, loading, authenticated } } = this.props;

        let personalPostsMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post post={post}></Post>)
        ) : <p>No posts available :(</p>

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

        return (
            <Grid container spacing={3}>
                <Grid item sx={12}>
                    {profileMarkup}
                </Grid>

                <Grid item sx={12}>
                    <InfiniteScroll dataLength={this.state.posts.length} next={this.fetchNextPosts} hasMore={this.state.hasMore} loader={<h4>Loading ...</h4>} endMessage={<p><b>No more posts :(</b></p>}>
                        {personalPostsMarkup}
                    </InfiniteScroll>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(EditProfile));