import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import createRouter from './router';


const mainNode = document.getElementById('main');

hydrateRoot(mainNode, (
  <BrowserRouter>
    {createRouter()}
  </BrowserRouter>
));
