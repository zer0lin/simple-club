const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid');

exports.comment_list = async (post_id) => {
  let sql = `select * from comment where post_id = ?`;
  let comment_list = await query(sql, [post_id]);
  return parseData(comment_list);
}

exports.create = async comment => {
  const id = objectid();
  let sql = `insert into comment(id, post_id, author, content, moment) values(?, ?, ?, ?, ?)`;
  await query(sql, [id.toString(), comment.post_id, comment.author, comment.content, comment.time]);
}

exports.comment = async comment_id => {
  let sql = `select * from comment where id = ?`;
  let comment = await query(sql, [comment_id]);
  return parseData(comment);
}

exports.delete_by_id = async comment_id => {
  let sql = `delete from comment where id = ?`;
  await query(sql, [comment_id]);
}

exports.delete_by_post_id = async post_id => {
  let sql = `delete from comment where post_id = ?`;
  await query(sql, [post_id]);
}
