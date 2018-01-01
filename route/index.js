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
router.get('/signup', auth.checkNotLogin, controller.user.show)
// 注册请求
router.post('/signup', auth.checkNotLogin, controller.user.signup);


module.exports = router;
