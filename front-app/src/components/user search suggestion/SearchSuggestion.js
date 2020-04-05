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

//redux
import { connect } from 'react-redux';

const styles = {
    card: {
        width: '500px',
        backgroundColor: "red"
    }
}

class SearchSuggestion extends Component {
    render(){
        const { searchSuggestion, classes } = this.props;

        return(
            <Card className={classes.card} component={Link} to={`/users/${searchSuggestion.idUser}`}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={`data:image/jpeg;base64,${searchSuggestion.profilePicture}`} className={classes.avatar} >

                        </Avatar>
                    }
                    title={searchSuggestion.firstName + ' ' + searchSuggestion.lastName}
                />
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {

}

SearchSuggestion.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchSuggestion));