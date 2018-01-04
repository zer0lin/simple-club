const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid')

exports.show = async (ctx, next) => {
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
