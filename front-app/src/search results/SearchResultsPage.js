import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import Axios from 'axios';

//Components
import SearchResult from '../components/user search result/SearchResult';

//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, Icon } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

//redux
import { connect } from 'react-redux';

const styles = {
    textField: {
        margin: '10px auto 10px auto'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'relative',
        right: '90px',
        top: '12px'
    },
    textField: {
        width: '500px',
    },
    unsortedList: {
        position: 'absolute',
    },
    listItem: {
        width: '500px'
    }
}

class SearchResultsPage extends Component {

    render() {
        const { data: { userSearchResult, loadingSearchResult } } = this.props;

        let userSearchResultMarkup = !loadingSearchResult && userSearchResult ? (
            userSearchResult.map(searchResult => <SearchResult searchResult={searchResult}></SearchResult>)
        ) : <p>No available results :(</p>

        return (
            <Grid container spacing={3}>
                <Grid item sx={12}>
                    {userSearchResultMarkup}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
})

const mapActionsToPros = {
};

SearchResultsPage.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(SearchResultsPage));