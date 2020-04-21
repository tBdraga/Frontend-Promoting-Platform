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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Axios from "axios";
import PropTypes from 'prop-types';

//MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//redux stuff
import { connect } from 'react-redux';
import { likePost, unlikePost,  getPostComments} from '../../redux/actions/dataActions';
import { openPostMenu } from '../../redux/actions/menuActions';

//CSS
import './Post.css';
import { red } from "@material-ui/core/colors";
import logo from '../../assets/logo.png';

//components
import MediaCarousel from "../carousel/MediaCarousel";
import PostMenu from '../post menu/PostMenu';
import CommentSection from '../comment section/CommentSection';

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
            postDate: 'loading ... ',
            drawerIsOpen: false
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

    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.idPost === this.props.post.idPost)) {
            return true;
        } else {
            return false;
        }
    }

    likePost = () => {
        let url = '/users/likePost';

        this.props.likePost(url, this.props.post.idPost, this.props.user.idUser);
    }

    unlikePost = () => {
        let url = '/users/unlikePost';

        this.props.unlikePost(url, this.props.post.idPost, this.props.user.idUser);
    }

    openPostMenu = (event) => {
        this.props.openPostMenu(event.currentTarget);
    }

    closePostMenu = () => {
        this.props.closePostMenu();
    }

    openCommentsDrawer = () =>{
        this.props.getPostComments(this.props.post.idPost);

        this.setState({
            drawerIsOpen: true
        })
    }

    render() {
        dayjs.extend(relativeTime);

        const { classes, user: { authenticated, profilePicture }, post: { likes, idPost, comments } } = this.props;

        const likeButton = !authenticated ? (
            <Tooltip title={likes + ' likes'} placement="top">
                <IconButton>
                    <Link to="/login">
                        <FavoriteBorder color="primary"></FavoriteBorder>
                    </Link>
                </IconButton>
            </Tooltip>
        ) : (
                this.likedPost() ? (
                    <Tooltip title={likes + ' likes'} placement="top">
                        <IconButton onClick={this.unlikePost}>
                            <FavoriteIcon color="primary"></FavoriteIcon>
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title={likes + ' likes'} placement="top">
                            <IconButton onClick={this.likePost}>
                                <FavoriteBorder color="primary"></FavoriteBorder>
                            </IconButton>
                        </Tooltip>
                    )
            )
            
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${profilePicture}`} className={classes.avatar} component={Link} to={`/users/${this.state.author.idUser}`}>

                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" id="settings-menu" onClick={this.openPostMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.author.firstName + ' ' + this.state.author.lastName}
                    subheader={dayjs(this.props.post.creationDate).fromNow()}
                />

                <PostMenu post={this.props.post}>
                </PostMenu>

                <MediaCarousel post={this.props.post}>
                </MediaCarousel>

                <CardContent className={classes.content}>
                    <Typography variant="body1">{this.props.post.description}</Typography>
                </CardContent>

                <CardActions disableSpacing>
                    {likeButton}

                    <Tooltip title="Load Comments" placement="top">
                        <IconButton aria-label="comments" onClick={this.openCommentsDrawer}>
                            <ChatIcon color="primary" />
                        </IconButton>
                    </Tooltip>


                    <IconButton aria-label="share">
                        <ShareIcon color="primary" />
                    </IconButton>
                </CardActions>

                <CommentSection isOpen={this.state.drawerIsOpen} idPost={this.props.post.idPost}></CommentSection>
            </Card>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost,
    openPostMenu,
    getPostComments
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    openPostMenu: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));