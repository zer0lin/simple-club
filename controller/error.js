exports.err_404 = async (ctx, next) => {
  ctx.status = 404;
  await ctx.render('404');
}
