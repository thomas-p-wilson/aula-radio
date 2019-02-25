import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = (theme) => {
    return {
        fixedBottom: {
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            right: 0
        },
        card: {
            display: 'flex',
            borderRadius: '4px 4px 0 0',
            margin: '0 auto !important',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        },
        title: {
            display: 'flex',
            marginLeft: '2.5rem'
        },
        artist: {
            display: 'flex',
            marginLeft: '1.5rem'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingLeft: theme.spacing.unit
        },
        playIcon: {
            height: 38,
            width: 38
        }
    };
};

function MediaControlCard(props) {
    const { classes, theme, playing } = props;

    return (
        <div className={ classes.fixedBottom }>
            <Card classes={ { root: classes.card } }>
                <Typography component="h5" variant="h5" classes={ { root: classes.title } }>
                    { playing.title || '-' }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" classes={ { root: classes.artist } }>
                    { (playing.artist || {}).name || '-' }
                </Typography>
                <div className={ classes.controls }>
                    <IconButton aria-label="Previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="Play/pause">
                        <PlayArrowIcon className={ classes.playIcon } />
                    </IconButton>
                    <IconButton aria-label="Next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </div>
            </Card>
        </div>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    playing: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        artist: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        })
    }),
    theme: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        ({ playing }) => ({
            playing
        })
    )
)(MediaControlCard);
