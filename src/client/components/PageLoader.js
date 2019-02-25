import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
// import withState from '../../../utils/redux/decorators/withState';

// @withState({
//     io: true
// })
export default class IoOverlay extends React.Component {
    static propTypes = {
        io: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            present: (props.io || []).length > 0
        };
        console.log(`Is present? ${ this.state.present }`);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.present && (this.props.io || []).length === 0) {
            setTimeout(() => {
                this.setState({ present: false });
            }, 500);
        }
        if (!prevState.present && (this.props.io || []).length > 0) {
            this.setState({ present: true }); // eslint-disable-line react/no-did-update-set-state
        }
    }

    render() {
        return (
            <div className={ classnames('loader-overlay', {
                visible: (this.props.io || []).length > 0,
                hide: !this.state.present
            }) }
                    onTransitionEnd={ () => {
 this.setState({ present: false });
} }>
                <CircularProgress className="loader" />
            </div>
        );
    }
}
