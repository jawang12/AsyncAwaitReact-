import React from 'react';
import PropTypes from 'prop-types';

const FilterInput = ({ handleChange }) => {
  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        className="form-control"
        placeholder="Enter artist name"
        onChange={ (e) => handleChange(e) }
      />
    </form>
  );
};

export default FilterInput;

FilterInput.propTypes = {
  handleChange: PropTypes.func
};
