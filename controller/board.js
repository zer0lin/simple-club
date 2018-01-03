exports.show = async (ctx, next) => {
  await ctx.render('board');
}

exports.show_create = async (ctx, next) => {
  await ctx.render('create_board');
}
