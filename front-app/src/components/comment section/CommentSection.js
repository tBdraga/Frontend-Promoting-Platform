import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

//redux
import { connect } from 'react-redux';
import { addPostComment } from '../../redux/actions/dataActions';

//MUI stuff
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'

//Components
import Comment from '../comment/Comment';

const styles = {
    progress: {
        position: 'absolute'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
}

class CommentSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newComment: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderComments = () => {
        const { classes, data: { currentPostComments, loadingComments } } = this.props;

        if (!loadingComments && currentPostComments) {
            return (
                <List className={classes.unsortedList}>
                    {currentPostComments.map((postComment) => <ListItem className={classes.listItem} ><Comment commentData={postComment}></Comment></ListItem>)}
                </List>
            );
        } else if (!loadingComments && !currentPostComments) {
            return (
                <p> No comments available :(</p>
            );
        }
    }

    postNewComment = () => {
        const { classes, data: { currentPostComments, loadingComments }, user: { idUser }, idPost } = this.props;

        const newPostComment = {
            comment: this.state.newComment,
            creationDate: null,
            idPost: idPost,
            idUser: idUser
        }

        this.props.addPostComment(newPostComment);
    }

    render() {

        const { isOpen, classes, data: { currentPostComments, loadingComments } } = this.props;

        return (
            <div className="comment-section">

                <Drawer anchor={'bottom'} open={isOpen}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {this.renderComments()}
                        </Grid>

                        <Grid item xs={6}>
                            <TextField id="newComment" name="newComment" type="text" label="Post a comment" className={classes.textField} value={this.state.newComment} onChange={this.handleChange} fullWidth></TextField>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loadingComments}
                                onClick={this.postNewComment}
                            >
                                Post Comment
                            {loadingComments && (<CircularProgress className={classes.progress} size={25}></CircularProgress>)}
                            </Button>
                        </Grid>
                    </Grid>


                    {loadingComments && (<CircularProgress className={classes.progress} size={50}></CircularProgress>)}
                </Drawer>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    addPostComment
}

CommentSection.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    addPostComment: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentSection));