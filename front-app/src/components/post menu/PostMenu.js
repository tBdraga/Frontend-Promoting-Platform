import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

//MUI Stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReportIcon from '@material-ui/icons/Report';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//redux
import { connect } from 'react-redux';
import { deletePost, reportPost } from '../../redux/actions/dataActions';
import { closePostMenu } from '../../redux/actions/menuActions';
import { Button } from "@material-ui/core";

class PostMenu extends Component {
    state = {
        dialogIsOpen: false
    };

    componentDidMount(){
        console.log(this.props.post);
    }

    handleOpenDialog = () => {
        this.setState({
            dialogIsOpen: true
        })
    }

    handleCloseDialog = () => {
        this.setState({
            dialogIsOpen: false
        })
    }

    handleClose = () => {
        this.props.closePostMenu();
    }

    deletePost = () => {
        let url = '/posts/deletePost';

        console.log("POST TO BE DELTED:" + this.props.post.idPost)

        //this.props.deletePost(url, this.props.post.idPost);

        this.setState({
            dialogIsOpen: false
        })
    }

    render() {
        const { menu: { anchorEl, isOpen }, user, post } = this.props;

        const deleteButton = user.authenticated && (user.idUser === post.idUser) ? (
            <MenuItem onClick={this.handleOpenDialog}>
                <ListItemIcon >
                    <DeleteIcon fontSize="small" color="primary"></DeleteIcon>
                </ListItemIcon>
                <ListItemText primary="Delete Post"></ListItemText>
            </MenuItem>
        ) : null

        return (
            <div>
                <Menu
                    anchorEl={anchorEl}
                    id="post-menu"
                    keepMounted
                    open={isOpen}
                    onClose={this.handleClose}
                >

                    {deleteButton}

                    <MenuItem>
                        <ListItemIcon>
                            <ReportIcon fontSize="medium" color="primary"></ReportIcon>
                        </ListItemIcon>
                        <ListItemText primary="Report Post"></ListItemText>
                    </MenuItem>
                </Menu>

                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.handleCloseDialog}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this post?
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                        </Button>

                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    menu: state.menu
})

const mapActionsToProps = {
    closePostMenu,
    deletePost
}

PostMenu.propTypes = {
    user: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    closePostMenu: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(PostMenu);