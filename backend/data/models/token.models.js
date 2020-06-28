const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({

    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200 // tokenul este sters daca trec 12 ore
    }
});

const TokenModel = mongoose.model('Token', TokenSchema);
module.exports = TokenModel;