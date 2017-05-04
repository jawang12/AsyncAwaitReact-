import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums';
import Album from './components/Album';
import FilterableArtistsContainer from './containers/FilterableArtistsContainer';
import NewPlaylistContainer from './containers/NewPlaylistContainer';
import Artist from './components/Artist';
import Songs from './components/Songs';
import SinglePlaylist from './components/SinglePlaylist';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ AppContainer }>
      <Route path="/albums" component={ Albums } />
      <Route path="/albums/:albumId" component={ Album } />
      <Route path="/artists" component={ FilterableArtistsContainer } />
      <Route path="/artists/:artistId" component={ Artist } >
        <Route path="albums" component={ Albums } />
        <Route path="songs" component={ Songs } />
      </Route>
      <Route path="playlist" component={ NewPlaylistContainer } />
      <Route path="playlist/:playlistId" component={ SinglePlaylist } />
      <IndexRedirect to="/albums" />
    </Route>
  </Router>,
  document.getElementById('app')
);
