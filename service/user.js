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