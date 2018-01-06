const { query, parseData } = require('../util/dbutil');
const objectid = require('objectid');

exports.comment_list = async (post_id) => {
  let sql = `select * from comment where post_id = ?`;
  let comment_list = await query(sql, [post_id]);
  return parseData(comment_list);
}
