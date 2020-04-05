import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';

//redux
import { connect } from 'react-redux';

//MUI stuff
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core";
import Paper from '@material-ui/core/Paper/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    chartWebsiteVisits: {
        height: '300px',
        width: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20
    },
    chartPostMentions: {
        height: '300px',
        width: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20
    },
    chartMonthlyAddsBudget: {
        height: '300px',
        width: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20
    },
    paper: {
        padding: 20
    },
    buttons: {
        textAllign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartDataWebsiteVisits: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Website visits',
                        data: [
                            5,
                            6,
                            12,
                            65,
                            444,
                            675,
                            898,
                            12032,
                            20000,
                            33333,
                            44444,
                            66666
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }
                ]
            },
            chartDataPostTags: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Post tags',
                        data: [
                            5,
                            6,
                            12,
                            65,
                            444,
                            675,
                            898,
                            1000,
                            1100,
                            666,
                            333,
                            498
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }
                ]
            },
            chartDataMonthlyBudget: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Dollars',
                        data: [
                            5,
                            6,
                            12,
                            65,
                            40,
                            50,
                            44,
                            66,
                            87,
                            88,
                            123,
                            100
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }
                ]
            },
        }
    }

    render() {
        const { classes, user: { loading, authenticated, userRole } } = this.props;

        let dashboardMarkup = !loading ? (authenticated ? ( userRole === 'BUSINESS_OWNER' ? (
            <Paper className={classes.paper}>
                <div className={classes.dashboard}>

                    <div className={classes.chartWebsiteVisits}>
                        <Line
                            data={this.state.chartDataWebsiteVisits}
                            height={50}
                            width={100}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Nr. of users that checked out your website'
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                maintainAspectRatio: false
                            }}
                        >
                        </Line>
                    </div>

                    {' '}

                    <div className={classes.chartPostMentions}>
                        <Line
                            data={this.state.chartDataPostTags}
                            height={50}
                            width={100}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Nr. of users that mentioned you in new posts'
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                maintainAspectRatio: false
                            }}
                        >
                        </Line>
                    </div>

                    {' '}

                    <div className={classes.chartMonthlyAddsBudget}>
                        <Bar
                            data={this.state.chartDataMonthlyBudget}
                            height={50}
                            width={100}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Amount of money you spent on monthly adds'
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                maintainAspectRatio: false
                            }}
                        >
                        </Bar>
                    </div>
                </div>
            </Paper>
        ) : (<p>Dashboard available only for Business Owners</p>)   
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">Not logged in!</Typography>
                </Paper>
            )) : (<p>loading...</p>)

        return dashboardMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));