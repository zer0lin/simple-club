const sha1 = require('sha1');

exports.show = async (ctx, next) => {
  await ctx.render('signup');
}

exports.signup = async (ctx, next) => {
  // console.log('have request');
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
  console.log(password.length);
  let user = {
    username: username,
    password: password,
    gender: gender,
    bio: bio,
    auth: 0
  };
  console.log(user);
}