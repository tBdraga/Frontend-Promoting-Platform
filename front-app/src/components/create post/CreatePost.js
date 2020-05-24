import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import uploadIcon from '../../assets/uploadIcon.png'

//redux
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Avatar from '@material-ui/core/Avatar';
 
//icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider, Icon } from "@material-ui/core";

const styles = {
    submitButton: {
        position: 'realtive',
        paddingTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '5%'
    },
    companyTag: {
        position: 'absolute',
        top: '5%'
    },
    tagTextfield: {
        position: 'absolute',
        left: '10%',
    },
    descriptionTextfield: {
        position: 'relative',
        display: 'block',
        width: '100%',
        paddingBottom: '50px'
    },
    dialogTitle: {
        paddingBottom: '50px'
    },
    dialogContent: {
        display: 'block'
    },
    imagePreview: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    uploadImageButton: {
        display: 'inline',
        padding: '40px'
    }
}

class CreatePost extends Component {
    state = {
        open: false,
        body: '',
        errors: {},
        companyTag: '',
        postDescription: '',
        imageOnePreview: null,
        imageTwoPreview: null,
        imageThreePreview: null,
        imageOneSubmit: null,
        imageTwoSubmit: null,
        imageThreeSubmit: null,
        files: []
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    //handle image chage stuff
    handleImage1Change = (event) => {
        const image = event.target.files[0];

        this.setState({
            imageOnePreview: URL.createObjectURL(image),
            files: this.state.files.concat(image)
        });
    }

    handleImage2Change = (event) => {
        const image = event.target.files[0];

        this.setState({
            imageTwoPreview: URL.createObjectURL(image),
            files: this.state.files.concat(image)
        });
    }

    handleImage3Change = (event) => {
        const image = event.target.files[0];

        this.setState({
            imageThreePreview: URL.createObjectURL(image),
            files: this.state.files.concat(image)
        });
    }

    //handle upload picture stuff
    handleUploadImage1 = () => {
        const fileInput = document.getElementById('imageInput1');

        fileInput.click();
    }

    handleUploadImage2 = () => {
        const fileInput = document.getElementById('imageInput2');

        fileInput.click();
    }

    handleUploadImage3 = () => {
        const fileInput = document.getElementById('imageInput3');

        fileInput.click();
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //create form data object
        const formData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            formData.append('file', this.state.files[i]);
        }
        
        //append new post info
        //formData.append('file', this.state.companyTag)
        //formData.append('file', this.state.postDescription)
        //formData.append('file', this.props.user.idUser)

        this.props.createPost(formData, this.state.companyTag, this.state.postDescription, this.props.user.idUser);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { errors } = this.state;

        const { classes, UI: { loading } } = this.props;

        const image1Preview = !this.state.imageOnePreview ? (
            <IconButton onClick={this.handleUploadImage1} className={classes.uploadImageButton}>
                <img src={uploadIcon} className={classes.imagePreview}></img>
            </IconButton>
        ) : (
                <IconButton onClick={this.handleUploadImage1} className={classes.uploadImageButton}>
                    <img src={this.state.imageOnePreview} className={classes.imagePreview}></img>
                </IconButton>
            )

        const image2Preview = !this.state.imageTwoPreview ? (
            <IconButton onClick={this.handleUploadImage2} className={classes.uploadImageButton}>
                <img src={uploadIcon} className={classes.imagePreview}></img>
            </IconButton>
        ) : (
                <IconButton onClick={this.handleUploadImage2} className={classes.uploadImageButton}>
                    <img src={this.state.imageTwoPreview} className={classes.imagePreview}></img>
                </IconButton>
            )

        const image3Preview = !this.state.imageThreePreview ? (
            <IconButton onClick={this.handleUploadImage3} className={classes.uploadImageButton}>
                <img src={uploadIcon} className={classes.imagePreview}></img>
            </IconButton>
        ) : (
                <IconButton onClick={this.handleUploadImage3} className={classes.uploadImageButton}>
                    <img src={this.state.imageThreePreview} className={classes.imagePreview}></img>
                </IconButton>
            )
 
        return (
            <Fragment>
                <Button onClick={this.handleOpen}>
                    <AddIcon></AddIcon>
                </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Button onClick={this.handleClose} className={classes.closeButton}>
                        <CloseIcon></CloseIcon>
                    </Button>

                    <DialogTitle className={classes.dialogTitle}>
                        <AlternateEmailIcon fontSize="large" color="primary" className={classes.companyTag}></AlternateEmailIcon>

                        <TextField name="companyTag" label="Tag a company!" size="small" variant="outlined" color="primary" className={classes.tagTextfield} onChange={this.handleChange}></TextField>
                    </DialogTitle>

                    <DialogContent className={classes.dialogContent}>

                        <TextField
                            name="postDescription"
                            type="text"
                            label="Description ..."
                            multiline
                            rows="3"
                            placeholder="Post something cool"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.descriptionTextfield}
                            onChange={this.handleChange}
                            size="small"
                        >
                        </TextField>

                        <div className={classes.imageUploadersWrapper}>
                            {image1Preview}

                            {image2Preview}

                            {image3Preview}
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <input type="file" name="file" id="imageInput1" onChange={this.handleImage1Change} hidden="hidden"></input>
                            <input type="file" name="file" id="imageInput2" onChange={this.handleImage2Change} hidden="hidden"></input>
                            <input type="file" name="file" id="imageInput3" onChange={this.handleImage3Change} hidden="hidden"></input>

                            <Button type="submit" size="medium" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Post
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress>
                                )}
                            </Button>

                        </form>

                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})

const mapActionsToPros = {
    createPost
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(CreatePost));