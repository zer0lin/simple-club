const sha1 = require('sha1');
const service = require('../service');

exports.show_signup = async (ctx, next) => {
  await ctx.render('signup');
}

exports.signup = async (ctx, next) => {
  const username = ctx.request.body.username;
  let password = ctx.request.body.password;
  const repassword = ctx.request.body.repassword;
  const bio = ctx.request.body.bio;
  const gender = ctx.request.body.gender;
  try {
    if (!(username.length >= 1 && username.length <= 20)) {
      throw new Error('名字请限制在1-20个字符');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是m、f或x');
    }
    if (password.length < 6) {
      throw new Error('密码至少6个字符');
    }
    if (password != repassword) {
      throw new Error('两次输入的密码不一致');
    }
  } catch(e) {
    ctx.flash('error', e.message);
    return ctx.redirect('/signup');
  }
  // 密码加密
  password = sha1(password);
  let user = {
    username: username,
    password: password,
    gender: gender,
    bio: bio,
    auth: 0
  };
  try {
    await service.user.signup(user);
    delete user.password;
    ctx.session.user = user;
    ctx.flash('success', '注册成功');
    ctx.redirect('/board');
  } catch (err) {
    ctx.flash('error', err.message);
    ctx.redirect('/signup');
  }
}

exports.signout = async (ctx, next) => {
  ctx.session.user = null;
  ctx.flash('success', '登出成功');
  ctx.redirect('/');
}

exports.show_signin = async (ctx, next) => {
  await ctx.render('signin');
}

exports.signin = async (ctx, next) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  // 校验参数
  try {
    if (!username.length) {
      throw new Error('请填写用户名');
    }
    if (!password.length) {
      throw new Error('请填写密码');
    }
  } catch(e) {
    ctx.flash('error', e.message);
    return ctx.redirect('back');
  }
  let user = await service.user.signin(username);
  if (!user.length) {
    ctx.flash('error', '用户不存在');
    return ctx.redirect('back');
  }
  // 检查密码是否匹配
  // console.log(sha1(password));
  // console.log(user);
  // console.log(user[0].password);
  if (sha1(password) !== user[0].password) {
    ctx.flash('error', '用户名或密码错误');
    return ctx.redirect('back');
  }
  ctx.flash('success', '登陆成功');
  delete user[0].password;
  ctx.session.user = user[0];
  ctx.redirect('/board');
}
