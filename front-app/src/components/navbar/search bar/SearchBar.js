import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';

//CSS
import './SearchBar.css';

//MUI stuff
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

//redux
import { connect } from 'react-redux';
import { getUserSearchSuggestions, getUserSearchResult } from '../../../redux/actions/dataActions';

//icons
import SearchIcon from '@material-ui/icons/Search';

//Components
import SearchSuggestion from '../../user search suggestion/SearchSuggestion';

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

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ''
        };
    }

    suggestionSelected(userSearchSuggestion) {
        this.setState({
            searchString: ''
        })
    }

    renderSuggestions() {
        const { classes, data: { userSearchSuggestions, loadingSearchSuggestion } } = this.props;

        if (!loadingSearchSuggestion && this.state.searchString) {
            return (
                <List className={classes.unsortedList}>
                    {userSearchSuggestions.map((userSearchSuggestion) => <ListItem className={classes.listItem} button onClick={() => this.suggestionSelected(userSearchSuggestion)}><SearchSuggestion searchSuggestion={userSearchSuggestion}></SearchSuggestion></ListItem>)}
                </List>
            );
        } else {
            return (
                <p></p>
            );
        }

    }

    handleOnInputChange = (event) => {
        const searchString = event.target.value;

        this.setState({
            searchString: searchString
        })

        this.fetchSearchSuggestions(this.state.searchString);
    }

    fetchSearchSuggestions = (searchString) => {
        this.props.getUserSearchSuggestions(searchString);
    }

    handleOnSearch = (event) => {
        const searchString = this.state.searchString;

        this.setState({
            searchString: ''
        });

        this.props.getUserSearchResult(searchString);
    }

    render() {
        const { text, searchString } = this.state;

        const { classes, data: { loadingSearchSuggestion } } = this.props;

        return (
            <div className="search-bar">
                <TextField value={searchString} id="outlined-search" label="Search users or brands" type="search" variant="outlined" className={classes.textField} onChange={this.handleOnInputChange} />

                <Tooltip title="Complete Search" placement="bottom">
                    <IconButton  onClick={this.handleOnSearch} className={classes.button} component={Link} to="/searchResult">
                        <SearchIcon></SearchIcon>
                    </IconButton>
                </Tooltip>

                {loadingSearchSuggestion && (<CircularProgress className={classes.progress} size={35}></CircularProgress>)}

                {this.renderSuggestions()}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    data: state.data,
})

const mapActionsToProps = {
    getUserSearchSuggestions,
    getUserSearchResult
}

SearchBar.propTypes = {
    user: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getUserSearchSuggestions: PropTypes.func.isRequired,
    getUserSearchResult: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchBar));