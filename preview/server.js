require('@babel/register')({ extensions: ['.jsx'] });
const app = require('express')();
const serveStatic = require('serve-static');
const morgan = require('morgan');

const { createElement: e } = require('react');
const { renderToString } = require('react-dom/server');

const { StaticRouter } = require('react-router');
const createRouter = require('./router');

const port = parseInt(process.env.PORT, 10) || 3000;

const getHTML = (content) => (`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>React Nebenan UI Components</title>
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
  const routerContext = {};
  const routes = createRouter();

  const App = e(StaticRouter, { context: routerContext, location: req.url }, routes);

  const content = renderToString(App);

  if (routerContext.url) return res.redirect(302, routerContext.url);

  res.send(getHTML(content));
};

app.set('port', port);

const emojis = serveStatic(`${__dirname}/../node_modules/emoji-assets/png/`, { redirect: false });
const fonts = serveStatic(`${__dirname}/../node_modules/nebenan-ui-kit/fonts/`, { redirect: false });
app.use(morgan('dev'));

app.use('/images/emojis-7.0.1', emojis);
app.use('/fonts', fonts);
app.use(serveStatic(`${__dirname}/public`, { redirect: false }));

app.use(renderApp);
app.get('*', (req, res) => res.send('Unhandled request'));
app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
