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
    render(){
        const { user, classes } = this.props;

        return(
            <Card className={classes.card} component={Link} to={`/users/${user.idUser}`}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${user.profilePicture}`} className={classes.avatar} >

                        </Avatar>
                    }
                    title={user.firstName + ' ' + user.lastName}
                />
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {

}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchResult));