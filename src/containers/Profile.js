import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MainList from '../components/MainList';
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getMoreDetails } from "../actions/action";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 10,
        margin: theme.spacing.unit * 10
    },
    table: {
        minWidth: 700,
    },
});


class Profile extends React.Component {

    componentDidMount() {
        const { getMoreDetails } = this.props;
        const { id } = this.props.match.params
        getMoreDetails(id)
    }

    render() {
        const { classes, lease_more_info = [] } = this.props;
        const { start_date, end_date, rent, frequency, payment_day, } = lease_more_info;
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const days = ['sunday', 'monday', 'tuesday', 'wednesday',
            'thursday', 'friday', 'saturday'];
        const dataArr = [];
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        if (frequency === "weekly") {
            let index = 0
            for (index; index < days.length; index++) {
                const element = days[index];
                if (element === payment_day) {
                    break;
                }
            }

            let dateDiff = 0;
            if (index > startDate.getDay()) {
                dateDiff = index - startDate.getDay();

            } else {
                dateDiff = startDate.getDay() - index;
            }

            var date = new Date(startDate);
            const nextDate = date.addDays(dateDiff - 2);
            let nextBeginDate = date.addDays(dateDiff - 1);
            let diff = new Date(nextDate.getTime() - startDate.getTime());
            diff = diff.getUTCDate();
            dataArr.push({
                from: start_date,
                to: nextDate,
                days: diff,
                amount: (rent / 7) * diff
            });
            while (true) {
                if (nextBeginDate.addDays(6) < endDate) {
                    dataArr.push({
                        from: nextBeginDate,
                        to: nextBeginDate.addDays(6),
                        days: 7,
                        amount: rent
                    });
                    nextBeginDate = nextBeginDate.addDays(7)
                } else {
                    let diff = new Date(nextBeginDate.getTime() - endDate.getTime());
                    diff = diff.getUTCDate();
                    dataArr.push({
                        from: nextBeginDate,
                        to: end_date,
                        days: diff,
                        amount: rent / 7 * diff
                    });
                    break;
                }
            }
        }


        if (frequency === "fortnightly") {
            let index = 0
            for (index; index < days.length; index++) {
                const element = days[index];
                if (element === payment_day) {
                    break;
                }
            }

            let dateDiff = 0;
            const d = new Date(startDate);
            d.setDate(1);
            console.log(d);
            d.setDate(d.getDate() + ((7 + index) - d.getDay()) % 7);
            console.log(d);
            let nextDate = d.addDays(7);
            let diff = new Date(nextDate.addDays(-1).getTime() - startDate.getTime());
            diff = diff.getUTCDate();
            if (startDate < nextDate) {
                dataArr.push({
                    from: startDate,
                    to: nextDate.addDays(-1),
                    days: diff,
                    amount: rent / 7 * diff
                });
            } else {
                nextDate = nextDate.addDays(14);
                dataArr.push({
                    from: startDate,
                    to: nextDate.addDays(-1),
                    days: diff,
                    amount: rent / 7 * diff
                });
            }
            while (true) {
                if (nextDate.addDays(13) < endDate) {
                    dataArr.push({
                        from: nextDate,
                        to: nextDate.addDays(13),
                        days: 14,
                        amount: rent / 7 * 14
                    });
                    nextDate = nextDate.addDays(14)
                } else {
                    let diff = new Date(endDate.getTime() - nextDate.getTime());
                    diff = diff.getUTCDate();
                    dataArr.push({
                        from: nextDate,
                        to: end_date,
                        days: diff,
                        amount: rent / 7 * diff
                    });
                    break;
                }
            }

        }

        if (frequency === "monthly") {
            let index = 0
            for (index; index < days.length; index++) {
                const element = days[index];
                if (element === payment_day) {
                    break;
                }
            }
            const d = new Date(startDate);
            d.setDate(1);
            d.setDate(d.getDate() + ((7 + index) - d.getDay()) % 7);
            let nextDate = d.addDays(28);
            let diff = new Date(nextDate.addDays(-1).getTime() - startDate.getTime());
            diff = diff.getUTCDate();
            if (startDate < nextDate) {
                dataArr.push({
                    from: startDate,
                    to: nextDate.addDays(-1),
                    days: diff,
                    amount: rent / 7 * diff
                });
            } else {
                nextDate = nextDate.addDays(28);
                dataArr.push({
                    from: startDate,
                    to: nextDate.addDays(-1),
                    days: diff,
                    amount: rent / 7 * diff
                });
            }
            while (true) {
                if (nextDate.addDays(27) < endDate) {
                    dataArr.push({
                        from: nextDate,
                        to: nextDate.addDays(27),
                        days: 28,
                        amount: rent / 7 * 28
                    });
                    nextDate = nextDate.addDays(28)
                } else {
                    let diff = new Date(endDate.getTime() - nextDate.getTime());
                    diff = diff.getUTCDate();
                    dataArr.push({
                        from: nextDate,
                        to: end_date,
                        days: diff,
                        amount: rent / 7 * diff
                    });
                    break;
                }
            }

        }
        return (
            <div className="App">

                <center>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Lease information of {lease_more_info.id}
                        </Typography>

                        <br />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">From</TableCell>
                                    <TableCell align="left">To</TableCell>
                                    <TableCell align="right">Days</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataArr.map(row => {
                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    return (
                                        <TableRow>
                                            <TableCell align="left">{new Date(row.from).toLocaleDateString("en-US", options)}</TableCell>
                                            <TableCell align="left">{new Date(row.to).toLocaleDateString("en-US", options)}</TableCell>
                                            <TableCell align="right">{row.days}</TableCell>
                                            <TableCell align="right">{Math.round(row.amount * 100) / 100}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                </center>


            </div >
        );
    }
}
const mapStateToProps = ({ lease_more_info }) => {


    return { lease_more_info };
};

const mapActionsToProps = {
    getMoreDetails
};


export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapActionsToProps
    )(Profile))

// export default 
