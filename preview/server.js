require('@babel/register')({ extensions: ['.es'] });
const app = require('express')();
const serveStatic = require('serve-static');
const morgan = require('morgan');

const React = require('react');
const { renderToString } = require('react-dom/server');

const { StaticRouter } = require('react-router');
const createRouter = require('./router');
const MicroHelmetProvider = require('../lib/micro_helmet/provider');


const { createElement: e } = React;
const port = parseInt(process.env.PORT, 10) || 3000;

const getHTML = (meta, content) => (`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>${meta && meta.title ? meta.title : 'React Nebenan UI Components'}</title>
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="cleartype" content="on" />
    <link rel="stylesheet", href="/style.css" />
  </head>
  <body>
    <main id="main">${content}</main>
    <script src="/script.js" async></script>
  </body>
</html>
`);

const renderApp = (req, res) => {
  const helmetContext = {};
  const routerContext = {};
  const routes = createRouter();

  const Component = e(StaticRouter, { context: routerContext, location: req.url }, routes);
  const App = e(MicroHelmetProvider, { context: helmetContext }, Component);

  const content = renderToString(App);

  if (routerContext.url) return res.redirect(302, routerContext.url);

  res.send(getHTML(helmetContext.value, content));
};

app.set('port', port);

const emojis = serveStatic(`${__dirname}/../node_modules/emojione-assets/png/`, { redirect: false });
app.use(morgan('dev'));
app.use(serveStatic(`${__dirname}/public`, { redirect: false }));
app.use('/images/emojis-v4.0.0', emojis);

app.use(renderApp);
app.get('*', (req, res) => res.send('Unhandled request'));
app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
