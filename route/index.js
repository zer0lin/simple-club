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
// 创建板块页
router.get('/board/create', auth.checkAdmin, controller.board.show_create);
// 创建板块请求
router.post('/board/create', auth.checkAdmin, controller.board.create);

// 板块下的帖子页
router.get('/board/:board_id', controller.post.show_posts);
// 创建帖子页
router.get('/post/create', auth.checkUser, controller.post.show_create);
// 创建帖子请求
router.post('/post/create', auth.checkUser, controller.post.create);
// 单个帖子页
router.get('/post/:post_id', controller.post.show_post);
// 删除帖子
router.get('/post/:post_id/delete', auth.checkLogin, controller.post.delete);

// 发表评论请求
router.post('/comment/create', auth.checkUser, controller.comment.create);
// 删除评论
router.get('/comment/:comment_id/delete', auth.checkLogin, controller.comment.delete_by_id);

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
// 编辑个人信息页
router.get('/user/:username/edit', auth.checkUser, controller.user.info_edit)


module.exports = router;
