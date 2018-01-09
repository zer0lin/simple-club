const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid');

exports.board_list = async (ctx, next) => {
  let sql = `select * from board order by sub_id desc`;
  let result = await query(sql, []);
  return parseData(result);
}

exports.create = async (board_name) => {
  let sql = `select * from board where name = "${board_name}"`
  let result = await query(sql, []);
  if (result.length) {
    throw new Error('板块已存在');
  }
  const id = objectid();
  sql = `insert into board(id, name) values(?, ?)`;
  await query(sql, [id.toString(), board_name]);
}

exports.board = async board_id => {
  let sql = `select * from board where id = ?`;
  let result = await query(sql, [board_id]);
  return parseData(result);
}

exports.edit = async (board_id, board_name) => {
  let sql = `update board set name = ? where id = ?`;
  await query(sql, [board_name, board_id]);
}

exports.delete = async board_id => {
  // 删除评论
  let sql = `delete from comment where post_id in (select id from post where board_id = ?)`;
  await query(sql, [board_id]);
  // 删除文章
  sql = `delete from post where board_id = ?`;
  await query(sql, [board_id]);
  // 删除板块
  sql = `delete from board where id = ?`;
  await query(sql, [board_id]);
}
