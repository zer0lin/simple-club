const Router = require('koa-router');
const controller = require('../controller');
const auth = require('../middleware/auth');

const router = new Router();

// 主页
router.get('/', async (ctx, next) => {
  ctx.redirect('/board');
});

// 板块页
router.get('/board', controller.board.show);

// 注册页
router.get('/signup', auth.checkNotLogin, controller.user.show_signup)
// 注册请求
router.post('/signup', auth.checkNotLogin, controller.user.signup);
// 登出
router.get('/signout', auth.checkLogin, controller.user.signout);
// 登陆页
router.get('/signin', auth.checkNotLogin, controller.user.show_signin);
// 登陆请求
router.post('/signin', auth.checkNotLogin, controller.user.signin);

module.exports = router;
