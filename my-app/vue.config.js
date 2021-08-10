module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
        '/zipkin': {
          target: process.env.ZIPKIN_ADDRESS || 'http://127.0.0.1:9411/api/v2/spans',
          pathRewrite: {
              '^/zipkin': ''
          },
          secure: false
          }
      }
    }
  }