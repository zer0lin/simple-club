const service = require('../service');

exports.show = async (ctx, next) => {
  let board_list = await service.board.show();
  await ctx.render('board', {
    board_list: board_list
  });
}

exports.show_create = async (ctx, next) => {
  await ctx.render('create_board');
}

exports.create = async (ctx, next) => {
  const board_name = ctx.request.body.board_name;
  // 校验参数
  try {
    if (!board_name.length) {
      throw new Error('请填写内容');
    }
  } catch(e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }
  try {
    await service.board.create(board_name);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '添加板块成功');
  ctx.redirect('/board');
}
