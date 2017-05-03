import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ isPlaying, toggle, nextSong, currentSong, selectedAlbum, previous, progress }) => {

  return (
     <footer>
      <div>
      <div className="pull-left">
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-step-backward" onClick={ () => previous(currentSong, selectedAlbum) }></span>
        </button>
        <button className="btn btn-default" onClick={ () => toggle() }>
          <span className={ isPlaying ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play' }></span>
        </button>
        <button className="btn btn-default" onClick={ () => nextSong(currentSong, selectedAlbum) }>
          <span className="glyphicon glyphicon-step-forward"></span>
        </button>
      </div>
      <div className="bar">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  previous: PropTypes.func,
  selectedAlbum: PropTypes.object,
  isPlaying: PropTypes.bool,
  currentSong: PropTypes.object,
  toggle: PropTypes.func,
  nextSong: PropTypes.func,
  progress: PropTypes.number
};

export default Footer;
