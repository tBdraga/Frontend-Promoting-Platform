import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';
import { requestRecommendations } from '../../redux/actions/dataActions';

//icons
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//Components
import SearchSuggestion from '../user search suggestion/SearchSuggestion';

const styles = {
    progressSpinner: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '5%'
    },
    dialogTitle: {
        paddingBottom: '50px'
    },
    dialogContent: {
        display: 'block'
    },
    unsortedList: {
        position: 'absolute',
    },
    listItem: {
        width: '500px'
    }
}

class Recommender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogIsOpen: false,
            count: 0,
            buttonIsDisabled: false,
        }
    }

    suggestionSelected = (userSearchSuggestion) => {
    }

    renderRecommendations = () => {
        const { classes, data: { loadingRecommendations, recommendations } } = this.props;

        if (!loadingRecommendations && recommendations) {
            return (
                <List className={classes.unsortedList}>
                    {recommendations.map((recommendation) => <ListItem className={classes.listItem} button onClick={() => this.suggestionSelected(recommendation)}><SearchSuggestion searchSuggestion={recommendation}></SearchSuggestion></ListItem>)}
                </List>
            );
        } else {
            return (
                <p>No recommendations available at this time :(</p>
            );
        }

    }

    stopTimer = () => {
        this.setState({
            buttonIsDisabled: false
        });

        clearInterval(this.myInterval);
    }

    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            if (this.state.count > 0) {
                this.setState(prevState => ({
                    count: prevState.count - 1
                }))
            }

            if (this.state.count === 0) {
                this.stopTimer();
            }
        }, 1000)
    }

    startTimer = () => {
        this.setState({
            count: this.props.startCount,
            buttonIsDisabled: true,
        })

        //start time interval
        this.doIntervalChange();
    }

    requestRecommendations = () => {
        //bla bla request
        this.props.requestRecommendations(this.props.user.idUser);

        //open dialog
        this.setState({
            dialogIsOpen: true
        })

        //start button cooldown
        this.startTimer();
    }

    handleClose = () => {
        this.setState({
            dialogIsOpen: false
        })
    }

    render() {

        const { classes, data: { loadingRecommendations, recommendations } } = this.props;

        return (
            <Fragment>
                <Tooltip title="Request Recommendation" placement="top-start">
                    <Button disabled={this.state.buttonIsDisabled} onClick={this.requestRecommendations}>
                        <SystemUpdateAltIcon></SystemUpdateAltIcon>
                    </Button>
                </Tooltip>

                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Button onClick={this.handleClose} className={classes.closeButton}>
                        <CloseIcon></CloseIcon>
                    </Button>

                    <DialogTitle className={classes.dialogTitle}>
                        <Typography variant="h5" gutterBottom>
                            Daily recommendations!
                        </Typography>
                    </DialogTitle>

                    <DialogContent className={classes.dialogContent}>

                        {loadingRecommendations && (
                            <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress>
                        )}

                        {this.renderRecommendations()}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
    data: state.data
})

const mapActionsToPros = {
    requestRecommendations
};

Recommender.propTypes = {
    requestRecommendations: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(Recommender));