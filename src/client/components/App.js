import { Match } from 'react-router';
import React from 'react';

import Home from './Home';
import Layout from './Layout';
import Test from './Test';

const App = () => (
  <Layout>
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/test" component={Test} />
  </Layout>
);

export default App;
