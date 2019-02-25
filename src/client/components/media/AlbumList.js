import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MediaList from './MediaList';

class AlbumList extends React.Component {
    static propTypes = {
        fetchAlbums: PropTypes.func,
        albums: PropTypes.shape({
            data: PropTypes.array
        }),
        updatePlaying: PropTypes.func
    };

    constructor(props) {
        super(props);

        props.fetchAlbums();
        this.albums = this.albums.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(ev) {
        ev.persist();
        this.props.updatePlaying({ albumId: ev.currentTarget.getAttribute('data-id') });
    }

    albums() {
        return ((this.props.albums || {}).data || [])
            .map((album) => ({
                id: album._id,
                img: `/albums/${ album._id }/cover`,
                title: album.title,
                subtitle: (<span>by: { album.artist.name }</span>)
            }));
    }

    render() {
        return (
            <MediaList data={ this.albums() } onClick={ this.onClick } />
        );
    }
}

export default compose(
    connect(
        (state) => ({
            albums: state.albums
        }),
        (dispatch) => ({
            fetchAlbums() {
                dispatch({ type: 'FETCH_ALBUMS_REQUEST' });
            },
            updatePlaying(request) {
                dispatch({
                    type: 'UPDATE_PLAYING_REQUEST',
                    request
                });
            }
        })
    )
)(AlbumList);
