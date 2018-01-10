const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid');

exports.post_list = async board_id => {
  sql = `select * from post where board_id = ? order by sub_id desc`;
  let result = await query(sql, [board_id]);
  return parseData(result);
}

exports.create = async post => {
  let sql = `select * from board where id = "${post.board_id}"`;
  let board = await query(sql, []);
  board = parseData(board);
  if (board.length < 1) {
    throw new Error('板块不存在');
  }
  const id = objectid();
  sql = `insert into post(id, board_id, title, author, content, moment) values(?, ?, ?, ?, ?, ?)`;
  await query(sql, [id.toString(), post.board_id, post.title, post.author, post.content, post.time]);
}

exports.post = async (post_id) => {
  let sql = `select * from post where id = ?`;
  let post = await query(sql, [post_id]);
  return parseData(post);
}

exports.delete_by_id = async post_id => {
  let sql = `delete from post where id = ?`;
  await query(sql, [post_id]);
}

exports.move = async (post_id, board_id) => {
  let sql = `update post set board_id = ? where id = ?`;
  await query(sql, [board_id, post_id]);
}
