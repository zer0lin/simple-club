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
