import React from 'react';
import PropTypes from 'prop-types';

const Albums = (props) => {

  // console.log(props);

  const albums = props.albums.map((album, i) => (
    <div className="col-xs-4" key={ i }>
      <a className="thumbnail" href="#" onClick={() => props.handleClick(album) }>
        <img src={ album.image } />
        <div className="caption">
          <h5>
            <span>{ album.name }</span>
          </h5>
          <small>{ album.songs.length } songs</small>
        </div>
      </a>
    </div> ));

  return (
    <div className="col-xs-10">
      <h3>Albums</h3>
      <div className="row">
        { albums }
      </div>
    </div>
  );
};

export default Albums;

Albums.propTypes = {
  albums: PropTypes.array,
  handleClick: PropTypes.func
};
