import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Albums = (props) => {

  const albums = props.albums;

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            <Link className="thumbnail" to={ `/albums/${album.id}` }>
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  );
};

Albums.propTypes = {
  albums: PropTypes.array,
};

export default Albums;