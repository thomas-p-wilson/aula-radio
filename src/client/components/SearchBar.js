import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root: {
        alignItems: 'center',
        backgroundColor: '#6e94ff',
        borderRadius: '100px',
        boxShadow: 'none',
        display: 'flex',
        margin: '3rem auto',
        padding: '2px 4px',
        width: 400
    },
    input: {
        color: 'white',
        flex: 1,
        marginLeft: 8
    },
    iconButton: {
        color: 'white',
        padding: 10
    },
    divider: {
        color: 'white',
        width: 1,
        height: 28,
        margin: 4
    }
};

function CustomizedInputBase(props) {
    const { classes } = props;

    return (
        <Paper className={ classes.root } elevation={ 1 }>
            <InputBase className={ classes.input } placeholder="Search Music" />
            <IconButton className={ classes.iconButton } aria-label="Search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

CustomizedInputBase.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputBase);
