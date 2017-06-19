import React from 'react';
import PropTypes from 'prop-types';

const AddSong = ({ allSongs, onChange, onSubmit }) => {
  const songsList = allSongs.map((song, i) => <option key={ i } value={ song.id }>{ song.name }</option>);

  return (
    <div className="well">
      <form className="form-horizontal" noValidate name="songSelect" onSubmit={ onSubmit} >
        <fieldset>
          <legend>Add to Playlist</legend>
          <div className="form-group">
            <label htmlFor="song" className="col-xs-2 control-label">Song</label>
            <div className="col-xs-10">
              <select className="form-control" name="song" onChange={ onChange }>
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
  );
};

export default AddSong;

AddSong.propTypes = {
  allSongs: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};
