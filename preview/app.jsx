import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import createRouter from './router';

hydrate(<BrowserRouter>{createRouter()}</BrowserRouter>, document.getElementById('main'));
