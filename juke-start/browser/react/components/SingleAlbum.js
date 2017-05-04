import React from 'react';
import PropTypes from 'prop-types';

const SingleAlbum = ({ selectedAlbum, play, currentSong, isPlaying, toggle }) => {

  return (
    <div className="album col-xs-10">
      <div>
        <h3>{ selectedAlbum.name }</h3>
        <img src={ selectedAlbum.image } className="img-thumbnail" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
        {
          selectedAlbum.songs && selectedAlbum.songs.map((song, i) => (
            <tr key={ i } className={ (isPlaying && currentSong.id) === song.id ? 'active' : '' }>
              <td>
                {
                  currentSong.id === song.id ?
                   <button className="btn btn-default btn-xs" onClick={ () => toggle() }>
                    <span className={isPlaying ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play'}></span>
                   </button>
                  :
                   <button className="btn btn-default btn-xs" onClick={ () => play(song) }>
                    <span className="glyphicon glyphicon-play"></span>
                   </button>
              }
              </td>
              <td>{ song.name }</td>
              <td>{ song.artists[0].name }</td>
              <td>{ song.genre }</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

SingleAlbum.propTypes = {
  isPlaying: PropTypes.bool,
  selectedAlbum: PropTypes.object,
  play: PropTypes.func,
  currentSong: PropTypes.object,
  toggle: PropTypes.func
};

export default SingleAlbum;
