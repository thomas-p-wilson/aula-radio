import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MediaList from './MediaList';

class TrackList extends React.Component {
    static propTypes = {
        fetchTracks: PropTypes.func,
        tracks: PropTypes.shape({
            data: PropTypes.array
        }),
        updatePlaying: PropTypes.func
    };

    constructor(props) {
        super(props);

        props.fetchTracks();
        this.tracks = this.tracks.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(ev) {
        ev.persist();
        this.props.updatePlaying({ trackId: ev.currentTarget.getAttribute('data-id') });
    }

    tracks() {
        return ((this.props.tracks || {}).data || [])
            .map((track) => ({
                id: track._id,
                img: `/albums/${ track.album._id }/cover`,
                title: track.title,
                subtitle: (<span>by: { track.artist.name }</span>)
            }));
    }

    render() {
        return (
            <MediaList data={ this.tracks() } onClick={ this.onClick } />
        );
    }
}

export default compose(
    connect(
        (state) => ({
            tracks: state.tracks
        }),
        (dispatch) => ({
            fetchTracks() {
                dispatch({ type: 'FETCH_TRACKS_REQUEST' });
            },
            updatePlaying(request) {
                dispatch({
                    type: 'UPDATE_PLAYING_REQUEST',
                    request
                });
            }
        })
    )
)(TrackList);
