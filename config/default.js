/**
 * Created by hwh on 16/12/27.
 */
var path = require('path');
var cache = require('koa-router-cache');
var RedisCache = cache.RedisCache();
module.exports = {
  port:process.env.PORT || 3000,
  mongodb:{
    url: 'mongodb://'+process.env['MONGO_PORT_27017_TCP_ADDR']+':'+process['MONGO_PORT_27017_TCP_PORT']+'/patch'
  },
  schemeConf:path.join(__dirname,'./config.scheme'),
  staticPath:"http://112.126.78.86:80/",
  staticCacheConf:path.join(__dirname,'../static'),
  dbPath:path.join(__dirname,'./db/1.db'),
  routerCacheConf: {
    '/': {
      key: 'cache:index',
      expire: 10 * 1000,
      get: RedisCache.get,
      set: RedisCache.set,
      passthrough: RedisCache.passthrough,
      evtName: 'clearIndexCache',
      destroy: RedisCache.destroy
    }
  }
}