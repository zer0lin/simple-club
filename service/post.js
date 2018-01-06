const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid');

exports.post_list = async board_name => {
  let sql = `select * from board where name = "${board_name}"`;
  let board = await query(sql, []);
  board = parseData(board);
  sql = `select * from post where board_id = ? order by sub_id desc`;
  let result = await query(sql, [board[0].id]);
  return parseData(result);
}

exports.create = async post => {
  let sql = `select * from board where name = "${post.board_name}"`;
  let board = await query(sql, []);
  board = parseData(board);
  if (board.length < 1) {
    throw new Error('板块不存在');
  }
  const id = objectid();
  sql = `insert into post(id, board_id, title, author, content, moment) values(?, ?, ?, ?, ?, ?)`;
  await query(sql, [id.toString(), board[0].id, post.title, post.author, post.content, post.time]);
}

exports.post = async (post_id) => {
  let sql = `select * from post where id = ?`;
  let post = await query(sql, [post_id]);
  return parseData(post);
}
