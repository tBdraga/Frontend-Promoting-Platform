import React, { Component } from "react";
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

//redux
import { connect } from 'react-redux';

//MUI stuff
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
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
        display: 'block',
        marginBottom: 5,
        width: '100%',
        height: 100,
        maxHeight: 500
    },
    content: {
        padding: 0,
        marginLeft: 15
    },
    avatar: {
    },
}

class Comment extends Component {

    render() {
        dayjs.extend(relativeTime);

        const { classes, commentData } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${commentData.profilePicture}`} className={classes.avatar}>

                        </Avatar>
                    }

                    title={commentData.userFirstName + ' ' + commentData.userLastName}
                    subheader={dayjs(commentData.creationDate).fromNow()}
                />

                <CardContent className={classes.content}>
                    <Typography variant="body1">{commentData.comment}</Typography>
                </CardContent>

            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Comment.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Comment));