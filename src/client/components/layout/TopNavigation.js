import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

const styles = () => {
    return {
        tabs: {
            color: 'white'
        },
        indicator: {
            backgroundColor: '#ccc'
        }
    };
};

class TopNavigation extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        history: PropTypes.shape({
            push: PropTypes.func
        }),
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev, value) {
        this.props.history.push(`${ value }`);
    }

    render() {
        const { classes } = this.props;
        const tab = this.props.location.pathname;
        return (
            <Tabs value={ tab }
                    onChange={ this.handleChange }
                    centered
                    classes={ { root: classes.tabs, indicator: classes.indicator } }>
                <Tab label="Albums" value="/" />
                <Tab label="Artists" value="/artists" />
                <Tab label="Tracks" value="/tracks" />
            </Tabs>
        );
    }
}

export default compose(
    withRouter,
    withStyles(styles, { withTheme: true })
)(TopNavigation);
