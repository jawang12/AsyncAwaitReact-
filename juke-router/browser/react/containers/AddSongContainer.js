import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddSong from '../components/AddSong';

class AddSongContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSongs();
  }

  handleChange(evt) {
    this.setState({ songId: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { updatePlaylist } = this.props;
    const playlistId = this.props.params.playlistId;
    const { songId } = this.state;

    updatePlaylist(+playlistId, +songId);
  }

  render() {
    return (
      <AddSong
      onChange={ this.handleChange }
      onSubmit={ this.handleSubmit }
      allSongs={ this.props.allSongs }
      />
    );
  }
}

AddSongContainer.propTypes = {
  allSongs: PropTypes.array,
  loadSongs: PropTypes.func,
  updatePlaylist: PropTypes.func
};

export default AddSongContainer;