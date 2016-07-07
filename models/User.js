/**
 * Created by congshan on 7/6/16.
 */
var userBD = require('./userDB.js');

function User() {
    this.id = 0;
    this.username = null;
    this.password = null;
    this.db = new userBD();
}

User.prototype.initialize = function (id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    return this;
};

User.prototype.findOne = function (username, callback) {
    this.db.findUserByName(username, function (err, user) {
        if (err || user == null) {
            callback(err, null);
        } else {
            callback(null, user);
        }
    });
};

User.prototype.findById = function (id, callback) {
    this.db.findUserById(id, function (err, user) {
        if (err || user == null) {
            callback(err, null);
        } else {
            callback(null, user);
        }
        return this;
    });
};

User.prototype.validPassword = function (password) {
    if (this.password == password) {
        return true;
    } else {
        return false;
    }
};

User.prototype.addUser = function (username, password, callback) {
    this.db.addUser(username, password, callback);
};

User.prototype.save = function (callback) {
    this.db.addUser(this.username, this.password, callback);
};

module.exports = User;