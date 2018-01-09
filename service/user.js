const { query, parseData } = require('../util/dbutil');

exports.signup = async (user) => {
  let sql = `select * from user where username = "${user.username}"`;
  let result = await query(sql, []);
  if (result.length) {
    throw new Error('用户已存在');
  }
  sql = "insert into user(username, password, gender, bio, auth) values(?, ?, ?, ?, ?)";
  await query(sql, [user.username, user.password, user.gender, user.bio, user.auth]);
}

exports.signin = async (username) => {
  let sql = `select * from user where username = "${username}"`;
  let user = await query(sql, []);
  return parseData(user);
}

exports.info_edit = async user => {
  let sql = `update user set gender = ?, bio = ? where username = ?`;
  await query(sql, [user.gender, user.bio, user.username]);
}
