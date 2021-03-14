const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    title: {
        type: String,
        
    },
    description :{
        type: String,
    },
    file :{
        type:Buffer,
    },
    commentaires:{
        type :Array,default:[],
    }

}, { timestamps: true })



const publication = mongoose.model('Publication', publicationSchema);
module.exports = publication
