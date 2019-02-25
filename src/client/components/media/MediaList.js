import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { withStyles } from '@material-ui/core/styles';

const styles = () => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'hidden'
        },
        gridList: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '3rem !important'
        },
        gridTile: {
            display: 'block',
            height: '250px !important',
            width: '250px !important'
        },
        gridTileInner: {
            background: '#ddd',
            content: '"?" !important',
            display: 'block',
            position: 'relative',

            '&:before': {
                color: '#fff',
                content: '"?"',
                display: 'block',
                fontFamily: 'sans-serif',
                fontSize: '98px',
                fontWeight: 'bold',
                lineHeight: '120px',
                textAlign: 'center',
                position: 'absolute',
                textShadow: '0 0 5px rgba(0,0,0,.2)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },

            '& img': {
                display: 'none'
            },
            '&.loaded img': {
                display: 'block'
            }
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)'
        }
    };
};

const MediaList = ({ classes, data, onClick }) => (
    <GridList cellHeight={ 180 } className={ classes.gridList }>
        {
            (data || []).map((tile) => (
                <GridListTile key={ tile.id } classes={ { root: classes.gridTile, tile: classes.gridTileInner } }>
                    <img src={ tile.img }
                            alt={ tile.title }
                            onLoad={ (ev) => {
                                ev.target.parentElement.classList.add('loaded');
                            } } />
                    <GridListTileBar title={ tile.title }
                            subtitle={ tile.subtitle }
                            actionIcon={ (
                                <IconButton className={ classes.icon } onClick={ onClick } data-id={ tile.id }>
                                    <PlayArrowIcon data-id={ tile.id } />
                                </IconButton>
                            ) } />
                </GridListTile>
            ))
        }
    </GridList>
);
MediaList.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            img: PropTypes.string,
            title: PropTypes.string,
            subtitle: PropTypes.any
        })
    ),
    onClick: PropTypes.func
};
MediaList.defaultProps = {
    data: []
};

export default withStyles(styles)(MediaList);
