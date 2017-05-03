import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ toggle }) => {
  return (
   <div className="col-xs-2">
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <a href="#" onClick={ () => toggle() }>ALBUMS</a>
        </h4>
      </section>
    </sidebar>
  </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  toggle: PropTypes.func
};
