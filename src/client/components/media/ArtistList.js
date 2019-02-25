import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MediaList from './MediaList';

class ArtistList extends React.Component {
    static propTypes = {
        fetchArtists: PropTypes.func,
        artists: PropTypes.shape({
            data: PropTypes.array
        }),
        updatePlaying: PropTypes.func
    };

    constructor(props) {
        super(props);

        props.fetchArtists();
        this.artists = this.artists.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(ev) {
        ev.persist();
        this.props.updatePlaying({ artistId: ev.currentTarget.getAttribute('data-id') });
    }

    artists() {
        return ((this.props.artists || {}).data || [])
            .map((artist) => ({
                id: artist._id,
                img: `/albums/${ artist._id }/cover`,
                title: artist.name
            }));
    }

    render() {
        return (
            <MediaList data={ this.artists() } onClick={ this.onClick } />
        );
    }
}

export default compose(
    connect(
        (state) => ({
            artists: state.artists
        }),
        (dispatch) => ({
            fetchArtists() {
                dispatch({ type: 'FETCH_ARTISTS_REQUEST' });
            },
            updatePlaying(request) {
                dispatch({
                    type: 'UPDATE_PLAYING_REQUEST',
                    request
                });
            }
        })
    )
)(ArtistList);
