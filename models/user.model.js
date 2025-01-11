const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3,'username must be atleast 3 characters'],
        lowercase: true


    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength:[13,'email must be atleast 13 characters']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'password must be atleast 8 characters'],
        
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;



    