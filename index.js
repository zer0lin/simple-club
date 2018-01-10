const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('./route');
const session = require('koa-generic-session');
const flash = require('koa-better-flash');
const config = require('config-lite')(__dirname);

const app = new Koa();

app.keys = ['SC_S', 'SC_C'];
// 配置session
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    overwrite: true,
    signed: true
  }
}));

// 配置flash
app.use(flash());

// 配置静态资源目录
app.use(koaStatic(
  path.join(__dirname, './public')
));

// 配置全局变量
app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user;
  ctx.state.success = ctx.flash('success').toString();
  ctx.state.error = ctx.flash('error').toString();
  await next();
});

// 配置模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

// 配置表单解析
app.use(bodyParser());

// 配置路由
app.use(router.routes());

app.listen(config.port);
