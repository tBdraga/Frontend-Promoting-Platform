import React, { Component } from "react";
import Link from 'react-router-dom/Link';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

//redux
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/userActions'

const styles = {
    card: {
        width: '500px',
        backgroundColor: "red"
    }
}

class SearchSuggestion extends Component {
    followedUser = () => {
        if (this.props.user.followingList && this.props.user.followingList.find(followedUser => followedUser.idUser === this.props.searchSuggestion.idUser)) {
            return true;
        } else {
            return false;
        }
    }

    followUser = () => {
        this.props.followUser(this.props.user.idUser, this.props.searchSuggestion.idUser);
    }

    unfollowUser = () => {
        this.props.unfollowUser(this.props.user.idUser, this.props.searchSuggestion.idUser);
        console.log(this.props.user.idUser,this.props.searchSuggestion.idUser);
    }

    render() {
        const { searchSuggestion, classes, user: { authenticated } } = this.props;

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

        return (
            <div className="suggestion-wrapper">
                <Card className={classes.card} component={Link} to={`/users/${searchSuggestion.idUser}`}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${searchSuggestion.profilePicture}`} className={classes.avatar} >

                            </Avatar>
                        }
                        title={searchSuggestion.firstName + ' ' + searchSuggestion.lastName}
                    />
                </Card>

                {followButton}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    followUser,
    unfollowUser
}

SearchSuggestion.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchSuggestion));