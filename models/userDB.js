/**
 * Created by congshan on 7/6/16.
 */
var sqlite3 = require('sqlite3').verbose();
var User = require('./User.js');

function userDB() {
   this.db = new sqlite3.Database('./dashboard.db');
}

userDB.prototype.addUser = function (username, password, callback) {
    var queryString = 'SELECT * FROM user WHERE username=\"' + username + '\"';
    var dbTemp = this.db;

    dbTemp.all(queryString, function (err, rows) {
        if (rows != null && rows.length != 0) { // username already exists
            callback("User exists.", null);
        } else { // insert user
            var insertQuery = dbTemp.prepare("INSERT INTO user Values(?, ?,?)");
            insertQuery.run(null, username, password);

            dbTemp.all(queryString, function(err, rows) {
                if (err || rows == null || rows.length == 0) { // failed to insert user
                    callback("Insertion failed!", null);
                } else {
                    callback(null, rows[0]);
                }
            });
        }
    });
};

userDB.prototype.findUserByName = function (username, callback) {
   var queryString = 'SELECT * FROM user WHERE username=\"' + username + '\"';
   var dbTemp = this.db;

   dbTemp.all(queryString, function (err, rows) {
      if (err) {
          callback(err, null);
      } else {
          // user not found
          if (rows == null || rows.length == 0) {
              callback(err, null);
          } else {
              var user = rows[0];
              callback(err, user);
          }
      }
   })
};

userDB.prototype.findUserById = function (id, callback) {
    var queryString = 'SELECT * FROM user WHERE id=\"' + id + '\"';
    var dbTemp = this.db;
    dbTemp.all(queryString, function (err, rows) {
        if (err) {
            callback(err, null);
        } else {
            // user not found
            if (rows == null || rows.length == 0) {
                callback(err, null);
            } else {
                var user = rows[0];
                callback(err, user);
            }
        }
    })
};

module.exports = userDB;