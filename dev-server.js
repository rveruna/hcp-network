// dev-server.js
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/orcid-proxy',
  createProxyMiddleware({
    target: 'https://pub.orcid.org',
    changeOrigin: true,
    pathRewrite: {
      '^/orcid-proxy': ''
    }
  })
);

app.listen(5174, () => {
  console.log('Proxy server running at http://localhost:5174');
});
