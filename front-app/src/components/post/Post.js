import React, { Component } from "react";
import Link from 'react-router-dom/Link';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from "@material-ui/core";

import Axios from "axios";

//CSS
import './Post.css';
import { red } from "@material-ui/core/colors";
import logo from '../../assets/logo.png';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        //maxWidth: 345
    },
    content: {
        padding: 25
    },
    avatar: {
        backgroundColor: red[500],
    }
}


class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: 'loading ... ',
            postPictures: []
        };
    }

    componentDidMount() {
        this.loadAuthor(this.props.post);
        //this.loadPostMedia(this.props.post);
    }

    loadPostMedia(post) {
        let getMediaUrl = '/posts/getPostMedia/' + post.idPost;

        //get all post media
        Axios.get(getMediaUrl)
            .then((res) => {
                let media = res.data;

                this.setState({
                    postPictures: media
                });
            })
            .catch(err => console.log(err))
    }

    loadAuthor(post) {

        let getAuthorsUrl = '/users/' + post.idUser;

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

    doLoadAuthor(post) {
        return new Promise(function (resolve, reject) {

            let getAuthorsUrl = '/users/' + post.idUser;

            //get All Authors
            Axios.get(getAuthorsUrl)
                .then((res) => {
                    var author = res.data;

                    resolve(author);
                })
                .catch(err => console.log(err));
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="zama de pizda"
                    subheader="September 14, 2016"
                />

                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${this.state.author.idUser}`} color="primary">{this.state.author.firstName + ' ' + this.state.author.lastName}</Typography>
                    <Typography variant="body2" color="textSecondary">{this.props.post.creationDate}</Typography>
                    <Typography variant="body1">{this.props.post.description}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Post)