import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import createRouter from './router';
import MicroHelmetProvider from '../lib/micro_helmet/provider';


const routes = createRouter();
const Component = (
  <MicroHelmetProvider>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </MicroHelmetProvider>
);

hydrate(Component, document.getElementById('main'));
