import React, { Component } from 'react';
import Songs from './Songs';
import AddSongContainer from '../containers/AddSongContainer';
import PropTypes from 'prop-types';

class SinglePlaylist extends Component {

  componentDidMount() {
    this.props.selectPlaylist(+this.props.params.playlistId);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('current props', this.props);
    // console.log('nextProps', nextProps);
    const nextPlaylistId = nextProps.routeParams.playlistId;
    const currentPlaylistId = this.props.routeParams.playlistId;
    const selectPlaylist = this.props.selectPlaylist;
    if (nextPlaylistId !== currentPlaylistId) {
      selectPlaylist(nextPlaylistId);
    }
  }

  render() {
    const { playlist } = this.props;

    return (
      <div>
        <h3>{ playlist.name }</h3>
        <Songs { ...this.props } songs={playlist.songs} />
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
        <AddSongContainer { ...this.props } />
      </div>
    );
  }
}

export default SinglePlaylist;

SinglePlaylist.propTypes = {
  selectPlaylist: PropTypes.func,
  playlist: PropTypes.object
};
