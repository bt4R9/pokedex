const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        minlength: 8,
        require: true,
        set: generateHash
    },
    email: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        require: true
    },
    confirmKey: {
        type: String,
        require: true
    },
    items: []
});

// generating a hash
userSchema.statics.generateHash = generateHash;

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
