import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip, convertSong } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  async componentDidMount () {
    /*
    const getAlbums = axios.get('/api/albums');
    const getArtists = axios.get('/api/artists');
    Promise.all([getAlbums, getArtists])
    .then(([albums, artists]) => {
      this.onLoad(convertAlbums(albums.data), artists.data);
    })
    .catch(err => console.error('unable to load', err)); */

    const albums = await axios.get('/api/albums');
    const artists = await axios.get('/api/artists');
    const playlists = await axios.get('/api/playlists');

    this.onLoad(convertAlbums(albums.data), artists.data, playlists.data);

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums, artists, playlists) {
    this.setState({
      albums,
      artists,
      playlists
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  async selectAlbum (albumId) {
    const album = await axios.get(`/api/albums/${albumId}`)
    this.setState({ selectedAlbum: convertAlbum(album.data) });
  }

  async selectArtist (artistId) {
    const artist = await axios.get(`/api/artists/${artistId}`);
    //load all albums of artist
    const albums = await axios.get(`/api/artists/${artistId}/albums`);
    const songs = await axios.get(`/api/artists/${artistId}/songs`);

    this.setState({
      selectedArtist: artist.data,
      artistAlbums: convertAlbums(albums.data),
      currentSongList: songs.data.map(song => convertSong(song))
    })
  }

  async createPlaylist(event) {
    try {
      const playlist = await axios.post('/api/playlists', { name: event.target.name.value });
      this.setState({ playlists: [...this.state.playlists, playlist.data]})
    } catch(err) {
      console.error('unable to create new playlist', err);
    }
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={ this.state.playlists }/>
        </div>
        <div className="col-xs-10">
        {
          this.props.children ?
          React.cloneElement(this.props.children, {

          // Album (singular) component's props
          album: this.state.selectedAlbum,
          currentSong: this.state.currentSong,
          isPlaying: this.state.isPlaying,
          toggleOne: this.toggleOne,

          // Albums (plural) component's props
          albums: this.state.albums,
          selectAlbum: this.selectAlbum,

          //Artists
          artists: this.state.artists,

          //Artist
          artist: this.state.selectedArtist,
          selectArtist: this.selectArtist,
          selectedArtist: this.state.selectedArtist,
          artistAlbums: this.state.artistAlbums,

          songs: this.state.currentSongList,

          createPlaylist: this.createPlaylist
          })
          : null
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

