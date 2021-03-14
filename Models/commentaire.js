const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentaireSchema = new Schema({
    idUser: {
        type: String
    },
    description: {
        type: String,
    },
}, { timestamps: true })



const commentaire = mongoose.model('commentaire', commentaireSchema);
module.exports = commentaire
