const service = require('../service');

exports.show = async (ctx, next) => {
  let board_list = await service.board.board_list();
  await ctx.render('board', {
    board_list: board_list
  });
}

exports.show_create = async (ctx, next) => {
  await ctx.render('board_create');
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

exports.show_edit = async (ctx, next) => {
  const board_id = ctx.params.board_id;
  const board = await service.board.board(board_id);
  await ctx.render('board_edit', {
    board_id: board_id,
    board_name: board[0].name
  });
}

exports.edit = async (ctx, next) => {
  const board_id = ctx.params.board_id;
  const board_name = ctx.request.body.board_name;
  try {
    if (!board_name.length) {
      throw new Error('板块名称不能为空');
    }
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  try {
    await service.board.edit(board_id, board_name);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '修改板块成功');
  ctx.redirect('/board');
}

exports.delete = async (ctx, next) => {
  const board_id = ctx.params.board_id;
  board = await service.board.board(board_id);
  try {
    if (!board.length) {
      throw new Error('板块不存在');
    }
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  try {
    await service.board.delete(board_id);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '删除板块成功');
  ctx.redirect('/board');
}
