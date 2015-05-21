var mongoose = require('mongoose');
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema( {
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);


