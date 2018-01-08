const service = require('../service');
const moment = require('moment');

exports.create = async (ctx, next) => {
  const author = ctx.session.user.username;
  const time =  moment().format('YYYY-MM-DD HH:mm');
  const post_id = ctx.request.body.post_id;
  const content = ctx.request.body.content;
  const comment = {
    post_id: post_id,
    time: time,
    content: content,
    author: author
  }
  try {
    await service.comment.create(comment);
    ctx.flash('success', '留言成功');
    ctx.redirect('back');
  } catch (err) {
    ctx.flash('error', '留言失败')
    ctx.redirect('back');
  }
}

exports.delete_by_id = async (ctx, next) => {
  const comment_id = ctx.params.comment_id;
  const username = ctx.session.user.username;
  const auth = ctx.session.user.auth;
  let comment = await service.comment.comment(comment_id);
  if (!comment.length) {
    ctx.flash('error', '留言不存在');
    return ctx.redirect('back');
  }
  if (!(comment[0].author == username || auth == 1)) {
    ctx.flash('error', '没有权限删除留言');
    return ctx.redirect('back');
  }
  try {
    await service.comment.delete_by_id(comment_id);
  } catch (err) {
    ctx.flash('error', err.message);
    return ctx.redirect('back');
  }
  ctx.flash('success', '删除留言成功');
  return ctx.redirect('back');
}
