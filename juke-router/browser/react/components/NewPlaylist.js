import React from 'react';
import PropTypes from 'prop-types';

const NewPlaylist = ({ handleChange, handleSubmit, input, validate }) => {
  return (
    <div className="well">
      <form className="form-horizontal" onSubmit={ handleSubmit }>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input className="form-control" type="text" name="name" value={ input } onChange={ handleChange }/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success" disabled={ !validate() }>Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default NewPlaylist;

NewPlaylist.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  input: PropTypes.string,
  validate: PropTypes.func
};
