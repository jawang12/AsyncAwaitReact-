import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
import PropTypes from 'prop-types';

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

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPlaylist(event);
    this.setState({ input: '', initial: false });
  }
  validate() {
    return this.state.input.length > 0 && this.state.input.length < 17;
  }

  render() {
    const warningMsg = !this.state.input.length ? 'Please enter a name' : 'Name cannot be longer than 16 characters';
    return (
      <div>
        <NewPlaylist handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } { ...this.state } validate={ this.validate }/>
        { this.state.initial && !this.validate() && <div className="alert alert-warning">{ warningMsg }</div> }
      </div>
    );
  }
}

NewPlaylistContainer.propTypes = {
  createPlaylist: PropTypes.func
};
