const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/ax',
    createProxyMiddleware({
      target: 'https://guest-api.sktax.chat',
      changeOrigin: true,
      pathRewrite: {
        '^/ax': '/v1/chat/completions',
      },
    })
  );
}; 