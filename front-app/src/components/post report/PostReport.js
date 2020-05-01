import React, { Component } from "react";
import Link from 'react-router-dom/Link';
import uploadIcon from '../../assets/uploadIcon.png'

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

//redux
import { connect } from 'react-redux';

const styles = {
    card: {
        width: '500px',
        backgroundColor: "red"
    },
    reportPaper: {
        padding: 20,
        position: 'relative'
    },
    imageDisplay: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        display: 'inline',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    buttons: {
        position: 'absolute',
        right: 0,
        top: 0
    }
}

class PostReport extends Component {
    state = {
        user: 'test user',
        description: 'test description Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut liber'
    }

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.reportPaper}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div className={classes.uploaderInfo}>
                            <Typography variant="h3" color="primary">{this.state.user}</Typography>
                            <Typography variant="body2">{this.state.description}</Typography>
                        </div>
                    </Grid>

                    <Grid item xs={8}>
                        <img src={uploadIcon} className={classes.imageDisplay}></img>
                        <img src={uploadIcon} className={classes.imageDisplay}></img>
                        <img src={uploadIcon} className={classes.imageDisplay}></img>

                        <div className={classes.buttons}>
                            <Tooltip title="Delete Post" placement="top">
                                <IconButton size="medium">
                                    <DeleteIcon color="primary" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Approve Post" placement="top">
                                <IconButton size="medium">
                                    <CheckIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToPros = {};

PostReport.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(PostReport));