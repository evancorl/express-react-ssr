import Helmet from 'react-helmet';
import { Match, Miss } from 'react-router';
import React, { PropTypes } from 'react';

import Home from './Home';
import Layout from './Layout';
import NotFound from './NotFound';
import Test from './Test';

const App = ({ routeData }) => (
  <div id="app">
    <Helmet defaultTitle="Page Title" />
    <Layout>
      <Match exactly pattern="/" component={Home} {...routeData['/']} />
      <Match exactly pattern="/test" component={Test} {...routeData['/test']} />
      <Miss component={NotFound} />
    </Layout>
  </div>
);

App.propTypes = {
  routeData: PropTypes.object,
};

App.defaultProps = {
  routeData: {},
};

export default App;
