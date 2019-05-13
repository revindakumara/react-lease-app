import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

function AlignItemsList(props) {
    const { classes, data } = props;
    return (
        <List className={classes.root}>
            <Link to={"/profile/" + data.id}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/images.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={data.id}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    {data.tenant}
                                </Typography>

                            </React.Fragment>
                        }
                    />
                </ListItem>
            </Link>
        </List>
    );
}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);