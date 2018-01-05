module.exports = {
  checkLogin: async (ctx, next) => {
    if (!ctx.session.user) {
      ctx.flash('error', '未登录');
      return ctx.redirect('/signin');
    }
    await next();
  },
  checkNotLogin: async (ctx, next) => {
    if (ctx.session.user) {
      ctx.flash('error', '已登录');
      return ctx.redirect('back');
    }
    await next();
  },
  checkAdmin: async (ctx, next) => {
    if (ctx.session.user.auth != 1) {
      ctx.flash('error', '非管理员');
      return ctx.redirect('back');
    }
    await next();
  },
  checkUser: async (ctx, next) => {
    if (ctx.session.user.auth != 0) {
      ctx.flash('error', '非普通用户');
      return ctx.redirect('back');
    }
    await next();
  }
}
