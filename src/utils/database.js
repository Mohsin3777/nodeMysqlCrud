const mysql = require('mysql');
const conn =require('../connections/conn')
class Database {
  constructor(config) {
    this.config = config;
    this.connection = mysql.createConnection(config);
  }

  async query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async insert(table, data) {
 try {
  const sql = `INSERT INTO ${table} SET ?`;
  const results = await this.query(sql, data);

  return results.insertId;
 } catch (error) {
  return 'aaaa'
 }
  }

  async update(table, data, where) {
    const sql = `UPDATE ${table} SET ? WHERE ?`;
    const params = [data, where];
    await this.query(sql, params);
  }

  async delete(table, where) {
    const sql = `DELETE FROM ${table} WHERE ?`;
    await this.query(sql, where);
  }
}

module.exports = Database;