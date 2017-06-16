import React, { Component } from 'react';
import Songs from './Songs';
import PropTypes from 'prop-types';

class SinglePlaylist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlistSongs: {}
    };
  }

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
    const { playlist, allSongs } = this.props;
    const songsList = allSongs.map((song, i) => <option key={ i } value={ song.id }>{ song.name } </option>);

    return (
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} />
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
        <div className="well">
          <form className="form-horizontal" noValidate name="songSelect">
            <fieldset>
              <legend>Add to Playlist</legend>
              <div className="form-group">
                <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                <div className="col-xs-10">
                  <select className="form-control" name="song">
                  { songsList }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success">Add Song</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default SinglePlaylist;

SinglePlaylist.propTypes = {
  selectPlaylist: PropTypes.func,
  songsList: PropTypes.array,
  playlist: PropTypes.object
};
