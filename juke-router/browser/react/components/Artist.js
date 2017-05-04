import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


class Artist extends React.Component {

  componentWillMount() {
    this.props.selectArtist(+this.props.params.artistId);
  }

  render() {
    const { selectedArtist, artistAlbums, children, isPlaying, songs, currentSong, toggleOne } = this.props;
    const propsToPassToChildren = {
      albums: artistAlbums,
      isPlaying,
      toggleOne,
      currentSong,
      songs,
    };

    return (
      <div>
        <h3>{ selectedArtist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${selectedArtist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${selectedArtist.id}/songs`}>SONGS</Link></li>
        </ul>
        { children && React.cloneElement(children, propsToPassToChildren) }
      </div>
    );
  }
}

Artist.propTypes = {
  selectedArtist: PropTypes.object,
  artistAlbums: PropTypes.array,
  selectArtist: PropTypes.func
};

export default Artist;
