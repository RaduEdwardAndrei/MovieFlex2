const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//It is required, it must be unique, and it must be at least 3 characters long. Also, white space is trimmed off the end.
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        default: ''
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// UserSchema.virtual('profileImagePath').get(function() {
//     if ( this.profileImage != null && this.profileImageType != null) {
//         return `data:${this.profileImageType};charset=utf-8;base64,${this.profileImage.toString('base64')}`;
//     }
// })

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;