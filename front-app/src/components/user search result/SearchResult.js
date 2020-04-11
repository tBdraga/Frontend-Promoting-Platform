import React, { Component } from "react";
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';


//redux
import { connect } from 'react-redux';

const styles = {
    card: {
        width: '500px',
    },
    avatar: {
        width: 200,
        height: 200,
    }
}

class SearchResult extends Component {
    followedUser = () => {
        if (this.props.user.followingList && this.props.user.followingList.find(followedUser => followedUser.idUser === this.props.searchResult.idUser)) {
            return true;
        } else {
            return false;
        }
    }
    
    followUser = () => {
    
    }
    
    unfollowUser = () => {
    
    }

    render(){
        const { searchResult, classes, user: { authenticated } } = this.props;

        let followButton = !authenticated ? (
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
        ) : (
                this.followedUser() ? (
                    <Button variant="contained" color="primary" onClick={this.unfollowUser}>
                        Unfollow
                    </Button>
                ) : (
                        <Button variant="contained" color="primary" onClick={this.followUser}>
                            Follow
                        </Button>
                    )
            )

        return(
            <Card className={classes.card} component={Link} to={`/users/${searchResult.idUser}`}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${searchResult.profilePicture}`} className={classes.avatar} >

                        </Avatar>
                    }
                    title={searchResult.firstName + ' ' + searchResult.lastName}
                />

                {followButton}
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {

}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchResult));