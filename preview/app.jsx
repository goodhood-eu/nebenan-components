import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import createRouter from './router';


const mainNode = document.getElementById('main');
const isPrerender = Boolean(mainNode);

if (isPrerender) {
  hydrateRoot(mainNode, (
    <BrowserRouter>
      {createRouter()}
    </BrowserRouter>
  ));
} else {
  const node = document.createElement('main');
  document.body.appendChild(node);

  createRoot(node).render((
    // eslint-disable-next-line no-undef
    <HashRouter basename={PUBLIC_PATH}>
      {createRouter()}
    </HashRouter>
  ));
}
