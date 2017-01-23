import Helmet from 'react-helmet';
import { Match, Miss } from 'react-router';
import React from 'react';

import Home from './Home';
import Layout from './Layout';
import NotFound from './NotFound';
import Test from './Test';

const App = () => (
  <div id="app">
    <Helmet defaultTitle="Page Title" />
    <Layout>
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/test" component={Test} />
      <Miss component={NotFound} />
    </Layout>
  </div>
);

export default App;
