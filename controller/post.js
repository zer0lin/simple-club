const service = require('../service');
const moment = require('moment');

exports.show_posts = async (ctx, next) => {
  let board_id = ctx.params.board_id;
  let post_list = await service.post.post_list(board_id);
  await ctx.render('posts', {
    post_list: post_list
  });
}

exports.show_post = async (ctx, next) => {
  let post_id = ctx.params.post_id;
  let post = await service.post.post(post_id);
  let comment_list = await service.comment.comment_list(post_id);
  if (post[0]) {
    post[0].content = post[0].content.split('\r\n');
  }
  await ctx.render('post', {
    post: post[0],
    comment_list: comment_list
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

exports.delete = async (ctx, next) => {
  const post_id = ctx.params.post_id;
  const username = ctx.session.user.username;
  const auth = ctx.session.user.auth;
  let post = await service.post.post(post_id);
  if (!post.length) {
    ctx.flash('error', '文章不存在');
    return ctx.redirect('back');
  }
  if (!(post[0].author == username || auth == 1)) {
    ctx.flash('error', '没有权限删除文章');
    return ctx.redirect('back');
  }
  try {
    await service.comment.delete_by_post_id(post_id);
    await service.post.delete_by_id(post_id);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '删除文章成功');
  return ctx.redirect('/board/<%= post.board_id %>');
}
