import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to={ `/` }>ALBUMS</Link>
        </h4>
      </section>
      <section>
      <h4 className="menu-item">
        <Link to={ `/artists` }>ARTISTS</Link>
      </h4>
      </section>
      <hr />
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        <h4>
          <Link className="btn btn-primary btn-block" to={ '/playlist' }>
            <span className="glyphicon glyphicon-plus"></span> ADD
          </Link>
        </h4>
      </section>
    </sidebar>
  );
};

export default Sidebar;
