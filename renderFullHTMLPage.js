import React from 'react';
import ReactServer from 'react-dom/server';

export default function renderFullHTMLPage(stringifyHTML, initialState, user) {
  return `<!doctype html>${ReactServer.renderToStaticMarkup(
    <html>
      <head>
        <title>Bit Buy</title>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: stringifyHTML }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};` }}></script>
        <script dangerouslySetInnerHTML={ {__html: `var USER="${user}"`} }/>
        <script src="/scripts/bundle.js"></script>
        <link rel="stylesheet" type="text/css" href="/scripts/style.css" />
      </body>
    </html>
  )}`;
}
