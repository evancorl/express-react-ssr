import { Match, Miss } from 'react-router';
import React from 'react';

import Home from './Home';
import Layout from './Layout';
import NotFound from './NotFound';
import Test from './Test';

const App = () => (
  <Layout>
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/test" component={Test} />
    <Miss component={NotFound} />
  </Layout>
);

export default App;
