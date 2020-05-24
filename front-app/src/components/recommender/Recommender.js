import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';

//icons
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    submitButton: {
        position: 'realtive',
        paddingTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '5%'
    },
    companyTag: {
        position: 'absolute',
        top: '5%'
    },
    tagTextfield: {
        position: 'absolute',
        left: '10%',
    },
    descriptionTextfield: {
        position: 'relative',
        display: 'block',
        width: '100%',
        paddingBottom: '50px'
    },
    dialogTitle: {
        paddingBottom: '50px'
    },
    dialogContent: {
        display: 'block'
    },
    imagePreview: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    uploadImageButton: {
        display: 'inline',
        padding: '40px'
    }
}

class Recommender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            buttonIsDisabled: false,
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

        //start button cooldown
        this.startTimer();
    }

    render() {

        return (
            <Fragment>
                <Tooltip title="Request Recommendation" placement="top-start">
                    <Button disabled={this.state.buttonIsDisabled} onClick={this.requestRecommendations}>
                        <SystemUpdateAltIcon></SystemUpdateAltIcon>
                    </Button>
                </Tooltip>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})

const mapActionsToPros = {
};

Recommender.propTypes = {
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(Recommender));