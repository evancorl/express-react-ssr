import React from 'react';
import { Link } from 'react-router';

const Layout = ({ children }) => (
  <div>
    <h1>Layout</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/test">Test</Link></li>
    </ul>
    {children}
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
