import React from 'react';
import PropTypes from 'prop-types';
import FilterInput from '../components/FilterInput';
import Artists from '../components/Artists';

export default class FilterableArtistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div>
        <FilterInput handleChange={ this.handleChange }/>
        <Artists artists={ this.props.artists.filter(artist => artist.name.toLowerCase().includes(this.state.input.toLowerCase())) }/>
      </div>
    );
  }
}

FilterableArtistsContainer.propTypes = {
  artists: PropTypes.array
};
