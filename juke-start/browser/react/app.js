import React from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Albums from './components/Albums';
import SingleAlbum from './components/SingleAlbum';
import axios from 'axios';

const audio = document.createElement('audio');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      selectedAlbum: {},
      currentSong: {},
      isPlaying: false,
      progress: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleBack = this.toggleBack.bind(this);
    this.play = this.play.bind(this);
    this.toggle = this.toggle.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previous = this.previous.bind(this);
  }

  async componentDidMount() {
    try {
      const albums = await axios.get('/api/albums');
      albums.data.forEach(album => {
        const imageUrl = `/api/albums/${album.id}/image`;
        album.image = imageUrl;
      })
      this.setState({ albums: albums.data });
    }
    catch (err) {
      console.error('unable to load albums', err);
    }

    audio.addEventListener('ended', () => {
      this.nextSong(this.state.currentSong, this.state.selectedAlbum);
    });

    audio.addEventListener('timeupdate', () => {
      this.setState({ progress: 100 * audio.currentTime / audio.duration })
    });

  }

  async handleClick(selectedAlbum) {
    const album = await axios.get(`/api/albums/${selectedAlbum.id}`)
    console.log('this is the album', album)
    album.data.image = selectedAlbum.image;
    this.setState({ selectedAlbum: album.data })
  }

  toggleBack() {
    this.setState({ selectedAlbum: {} });
  }

  play(song) {
    audio.src = `/api/songs/${song.id}/audio`;
    audio.load();
    audio.play();
    this.setState({ currentSong: song, isPlaying: true });
  }

  toggle() {
    this.state.isPlaying ? audio.pause() : audio.play();
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  nextSong(song, album) {
    let index = album.songs.indexOf(song);
    const newSong = album.songs[index + 1] ? album.songs[++index] : album.songs[0];
    this.play(newSong);
  }

  previous(song, album) {
    let index = album.songs.indexOf(song);
    const newSong = album.songs[index - 1] ? album.songs[--index] : album.songs[album.songs.length - 1];
    this.play(newSong);
  }

  render() {

    return (
      <div id="main" className="container-fluid">
        <Sidebar toggle={ this.toggleBack }/>
        {
          !this.state.selectedAlbum.id ?  <Albums albums={ this.state.albums } handleClick={ this.handleClick }/>
          : <SingleAlbum { ...this.state } play={ this.play } toggle={ this.toggle }/>
        }
        {
          this.state.currentSong.id ? <Footer { ...this.state } toggle={ this.toggle } nextSong={ this.nextSong } previous={ this.previous }/> : null
        }
      </div>
    );
  }
}

export default App;
