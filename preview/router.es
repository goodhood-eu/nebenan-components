import React from 'react';
import Route from 'react-router/lib/Route';

import Error404 from './containers/error404';
import Index from './containers/index';

import Sliders from './containers/sliders';
import Content from './containers/content';
import Meta from './containers/meta';
import Utility from './containers/utility';
import Misc from './containers/misc';
import Markdown from './containers/markdown';

export default () => (
  <div>
    <Route path="/" component={Index} />

    <Route path="/meta" component={Meta} />
    <Route path="/sliders" component={Sliders} />
    <Route path="/content" component={Content} />
    <Route path="/markdown" component={Markdown} />
    <Route path="/utility" component={Utility} />
    <Route path="/misc" component={Misc} />

    <Route path="*" component={Error404} />
  </div>
);
