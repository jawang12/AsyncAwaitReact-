import React from 'react';
import Songs from '../components/Songs';
import PropTypes from 'prop-types';

class Album extends React.Component {

  componentDidMount() {
    this.props.selectAlbum(+this.props.params.albumId);
  }

  render() {
  const { currentSong, isPlaying, toggleOne, album } = this.props;

  return (
    <div className="album">
      <div>
        <h3>{ album.name }</h3>
        <img src={ album.imageUrl } className="img-thumbnail" />
      </div>
      <Songs
        songs={album.songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        toggleOne={toggleOne} />
    </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object,
  toggleOne: PropTypes.func,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  selectAlbum: PropTypes.func
};

export default Album;
