const service = require('../service');
const moment = require('moment');

exports.show_posts = async (ctx, next) => {
  let board_name = ctx.params.name;
  let post_list = await service.post.post_list(board_name);
  await ctx.render('posts', {
    post_list: post_list
  });
}

exports.show_create = async (ctx, next) => {
  await ctx.render('post_create');
}

exports.create = async (ctx, next) => {
  const author = ctx.session.user.username;
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const board_name = ctx.request.body.board_name;
  let time = moment().format('YYYY-MM-DD HH:mm');
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
    if (!board_name.length) {
      throw new Error('请填写板块');
    }
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  let post = {
    title: title,
    author: author,
    content: content,
    board_name: board_name,
    time: time
  }
  try {
    service.post.create(post);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '发布成功');
  let board_path = '/board/' + board_name;
  ctx.redirect(board_path);
}
