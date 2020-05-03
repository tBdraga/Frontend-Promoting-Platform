import React, { Component } from "react";
import Link from 'react-router-dom/Link';
import uploadIcon from '../../assets/uploadIcon.png'
import Axios from "axios";

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

//redux
import { connect } from 'react-redux';

const styles = {
    card: {
        width: '500px',
        backgroundColor: "red"
    },
    reportPaper: {
        padding: 20,
        position: 'relative'
    },
    imageDisplay: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        display: 'inline',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    buttons: {
        position: 'absolute',
        right: 0,
        top: 0
    }
}

class PostReport extends Component {
    state = {
        author: '...',
        images: []
    }

    componentDidMount() {
        this.getPostMedia(this.props.post);
        this.loadAuthorInfo(this.props.post);
    }

    getPostMedia(post) {
        let getMediaUrl = '/posts/getPostMedia/' + post.idPost;

        //get all post media
        Axios.get(getMediaUrl)
            .then((res) => {
                let media = res.data;

                this.setState({
                    images: media
                });
            })
            .catch(err => console.log(err))
    }
    
    loadAuthorInfo(post) {

        let getAuthorsUrl = '/users/findById/' + post.idUser;

        //get All Authors
        Axios.get(getAuthorsUrl)
            .then((res) => {
                let author = res.data;

                this.setState({
                    author: author
                });
            })
            .catch(err => console.log(err));
    }

    renderImageData() {

        const { classes } = this.props;

        return this.state.images.map((image) => {
            return (
                <img src={`data:image/jpeg;base64,${image}`} className={classes.imageDisplay}/>
            )
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.reportPaper}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div className={classes.uploaderInfo}>
                            <Typography variant="h3" color="primary">{this.state.author.username}</Typography>
                            <Typography variant="body2">{this.props.post.description}</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={8}>
                        <div>
                            {this.renderImageData()}
                        </div>

                        <div className={classes.buttons}>
                            <Tooltip title="Delete Post" placement="top">
                                <IconButton size="medium">
                                    <DeleteIcon color="primary" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Approve Post" placement="top">
                                <IconButton size="medium">
                                    <CheckIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToPros = {};

PostReport.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(PostReport));