let mySQL = require('mysql');
class Database {
  queryStr = {
    INSERT_BOARD_QUERY: `INSERT INTO board (title,tag,content,created) VALUE(?,?,?,NOW())`,
    ALL_SELECT_BOARD_QUERY: `SELECT board.id,title,tag.name,content,created FROM board INNER JOIN tag ON board.tag=tag.id`,
    SEARCH_TAG_NAME_QUERY: 'SELECT * FROM tag where name=?',
    INSERT_TAG_QUERY: `INSERT INTO tag (name) VALUE(?)`,
    ALL_SELECT_TAG_QUERY: 'SELECT * FROM tag',
    WHERE_TAG_NAME_QUERY: 'WHERE tag.id=?',
    ORDER_BY_QUERY: 'ORDER BY created DESC',
    SELECT_TAG_QUERY: `SELECT tag.id, tag.name, count(tag.id) as 'count' FROM board INNER JOIN tag ON board.tag=tag.id group by tag.id`,
    BOARD_ALL_COUNT: 'SELECT count(*) AS count FROM board ',
    SELECT_BOARD_ITEM: 'WHERE board.id=?',
    DELETE_BOARD_ITEM: 'DELETE FROM board WHERE id=?',
    UPDATE_BOARD_ITEM: 'UPDATE board SET title=?,tag=?,content=? WHERE id=?',
    // SELECT board.id,title,tag.name,content,created FROM board INNER JOIN tag ON board.tag=tag.id WHERE tag.id=?
  };

  databaseInfo = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blog',
    timezone: 'KST', //NOW() 타임존 설정
  };

  constructor() {
    this.db = mySQL.createConnection(this.databaseInfo);
    this.db.connect();
  }

  insertBoard(values) {
    return this.query(this.queryStr.INSERT_BOARD_QUERY, values);
  }

  updateBoard(values, id) {
    return this.query(this.queryStr.UPDATE_BOARD_ITEM, values, id);
  }

  getBoardList(id, callback) {
    let query =
      id != 0
        ? `${this.queryStr.ALL_SELECT_BOARD_QUERY} ${this.queryStr.WHERE_TAG_NAME_QUERY} ${this.queryStr.ORDER_BY_QUERY}`
        : `${this.queryStr.ALL_SELECT_BOARD_QUERY} ${this.queryStr.ORDER_BY_QUERY}`;
    console.log('query', query);
    return this.db.query(query, id, callback);
  }

  deleteBoardItem(id) {
    return this.query(this.queryStr.DELETE_BOARD_ITEM, id);
  }

  getBoardItem(id) {
    let query = `${this.queryStr.ALL_SELECT_BOARD_QUERY} ${this.queryStr.SELECT_BOARD_ITEM}`;
    return this.query(query, id);
  }

  getBoardCount() {
    return this.query(this.queryStr.BOARD_ALL_COUNT);
  }

  isTagName(tagName) {
    return this.query(this.queryStr.SEARCH_TAG_NAME_QUERY, tagName);
  }

  addTagName(tagName) {
    return this.query(this.queryStr.INSERT_TAG_QUERY, tagName);
  }

  getTagList() {
    return this.query(this.queryStr.SELECT_TAG_QUERY);
  }

  databaseResultPromise(error, results, resolve, reject) {
    if (error == null) {
      resolve(results);
    } else {
      reject(error);
    }
  }

  query(queryStr, values = null) {
    return new Promise((resolve, reject) => {
      if (values == null) {
        this.db.query(queryStr, (error, results) => {
          this.databaseResultPromise(error, results, resolve, reject);
        });
      } else {
        this.db.query(queryStr, values, (error, results) => {
          this.databaseResultPromise(error, results, resolve, reject);
        });
      }
    });
  }
}
module.exports = new Database(mySQL);
