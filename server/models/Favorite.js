const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tvId: {
        type: String
    },
    tvTitle: {
        type: String
    },
   tvPost: {
        type: String
    },
    tvRunTime: {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }