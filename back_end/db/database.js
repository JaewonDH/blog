let mySQL = require('mysql');
class Database {
    queryStr = {
        INSERT_BOARD_QUERY: `INSERT INTO board (title,tag,content,created) VALUE(?,?,?,NOW())`,
        ALL_SELECT_BOARD_QUERY: `SELECT * FROM board`
    }

    databaseInfo = {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'blog'
    }

    constructor() {
        this.db = mySQL.createConnection(this.databaseInfo);
        this.db.connect();
    }

    insertBoard(values, callback) {
        this.query(this.queryStr.INSERT_BOARD_QUERY, values, callback);
    }

    getBoardList(callback) {
        this.query(this.queryStr.ALL_SELECT_BOARD_QUERY, null, callback);
    }

    query(queryStr, values, callback) {
        if (values == null) {
            this.db.query(queryStr, callback);
        } else {
            this.db.query(queryStr, values, callback);
        }
    }
}
module.exports =new Database(mySQL);
/*
  db.insertBoard(['node.js에서 mysql 사용하기','node.js','node.js1111111111111111111112323'],(error,results)=>{
      console.log('error',error);
      console.log('results',results);
  });

 db.getBoardList((error,results)=>{
    console.log('error',error);
    console.log('results',results);
 });
*/