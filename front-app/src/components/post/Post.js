import React, { Component } from "react";
import Link from 'react-router-dom/Link';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Axios from "axios";

//CSS
import './Post.css';
import { red } from "@material-ui/core/colors";
import logo from '../../assets/logo.png';
import MediaCarousel from "../carousel/MediaCarousel";

const styles = {
    card: {
        display: 'block',
        marginBottom: 20,
        maxWidth: 550
    },
    content: {
        padding: 25,
    },
    avatar: {
        backgroundColor: red[500],
    },
    /*expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },*/
}


class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: 'loading ... ',
            postPictures: [],
            postDate: 'loading ... '
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

    render() {
        dayjs.extend(relativeTime);

        const { classes } = this.props;

        /*const handleExpandClick = () => {
            setExpanded(!expanded);
        };*/

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} component={Link} to={`/users/${this.state.author.idUser}`}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.author.firstName + ' ' + this.state.author.lastName}
                    subheader={dayjs(this.props.post.creationDate).fromNow()}
                />

                <MediaCarousel post={this.props.post}>
                </MediaCarousel>

                <CardContent className={classes.content}>
                    <Typography variant="body1">{this.props.post.description}</Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Post)