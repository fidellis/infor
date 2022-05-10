import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Header = ({ label, menuLabel, itemLabel, ...props }) => (
  <header>
    <div className="main-container">
      <div className="main-container-label">
        <span className="main-container-label-header">
          <span>{menuLabel} {itemLabel && '|'} {itemLabel}</span>
        </span>
        <div className="main-container-label-main">
          <h1>{typeof label === 'function' ? label({ params: props.match.params }) : label}</h1>
        </div>
      </div>
    </div>
  </header>

);

Header.propTypes = {
  label: PropTypes.string,
  menuLabel: PropTypes.string,
  itemLabel: PropTypes.element.string,
};

Header.defaultProps = {
  label: null,
  menuLabel: null,
  itemLabel: null,
};

export default withRouter(Header);
