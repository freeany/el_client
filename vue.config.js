module.exports = {
  // 浏览器识别到的请求，mockjs不会通过此代理。
    devServer: {
      proxy: {
        // 
        //   给每个请求都加上api，起到了一种统一的作用，
        // 识别到以api开头的请求都会进到这里来进行跨域处理。
        // 跨域之后，对请求地址进行重写，将api替换为空。over
        '/api': {           
          target: 'http://localhost:4000',   // 将请求代理到这个基础路径
          changeOrigin: true,                // 开启跨域
          pathRewrite: {            // 重写请求路径
            '^/api': ''      //将以/api开头的地址的开头替换为 '' 
          }
        },
        
      }
    }
  }