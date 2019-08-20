import React from 'react';
import { hydrate } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import createRouter from './router';

const routes = createRouter();
const Component = (
  <BrowserRouter>
    {routes}
  </BrowserRouter>
);
hydrate(Component, document.getElementById('main'));
