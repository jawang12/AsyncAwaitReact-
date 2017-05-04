import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
import axios from 'axios';

export default class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      initial: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value, initial: true });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const playlist = await axios.post('/api/playlists', { name: event.target.name.value })
      this.setState({ input: '' });
    } catch(err) {
      console.error('unable to create new playlist', err);
    }
  }
  validate() {
    return this.state.input.length > 0 && this.state.input.length < 17;
  }

  render() {
    return (
      <div>
        <NewPlaylist handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } { ...this.state } validate={ this.validate }/>
        { this.state.initial && !this.validate() && <div className="alert alert-warning">Please enter a name</div> }
      </div>
    );
  }
}
