const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = {
  "changeOrigin": true,
  "secure": true,
  "target": "https://moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com",
  "headers": {
      "host": "moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com",
      "origin": "*",
      "method": "*"
  },
  "onProxyReq": function(proxyReq, req, res) {
      proxyReq.setHeader('Authorization', `Bearer @spiderman03`)
  },
  "ws": true, // enable websocket proxy
  "logger": console,
}

module.exports = function(app) {
  app.use(createProxyMiddleware("/users", proxyConfig));
  app.use(createProxyMiddleware("/auth/login", proxyConfig));
  app.use(createProxyMiddleware("/items/user_profile", proxyConfig));
  app.use(createProxyMiddleware("/items/vendor", proxyConfig));
  app.use(createProxyMiddleware("/items/company", proxyConfig));
  app.use(createProxyMiddleware("/items/vendor", proxyConfig));
  app.use(createProxyMiddleware("/items/customer", proxyConfig));
  app.use(createProxyMiddleware("/items/product", proxyConfig));
  app.use(createProxyMiddleware("/items/country", proxyConfig));
  app.use(createProxyMiddleware("/items/currency", proxyConfig));
  app.use(createProxyMiddleware("/items/payment_mode", proxyConfig));
  app.use(createProxyMiddleware("/items/payment_terms", proxyConfig));
  app.use(createProxyMiddleware("/items/posting_group", proxyConfig));
};