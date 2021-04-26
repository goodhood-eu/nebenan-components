import { Switch, Route } from 'react-router';

import Error404 from './containers/error404';
import Index from './containers/index';

import Sliders from './containers/sliders';
import Content from './containers/content';
import Utility from './containers/utility';
import Misc from './containers/misc';
import Markdown from './containers/markdown';

export default () => (
  <Switch>
    <Route path="/" component={Index} exact />

    <Route path="/sliders" component={Sliders} />
    <Route path="/content" component={Content} />
    <Route path="/markdown" component={Markdown} />
    <Route path="/utility" component={Utility} />
    <Route path="/misc" component={Misc} />

    <Route component={Error404} />
  </Switch>
);
