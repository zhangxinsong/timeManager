var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	mobile: {
		type: String,
		unique: true
	},
    password: String,
    nickName: String,
	sex:　String,
	birthday: {
        type: String,
        default: new Date().getTime()
	},
    email: String,
	introduce: String
});

module.exports = mongoose.model('user',userSchema);