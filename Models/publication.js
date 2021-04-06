const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    title: {
        type: String,
        
    },
    body :{
        type: String,
    },
    file :{
        type:String,
    },
    commentaires:{
        type :Array,default:[],
    }


}, { timestamps: true })



const publication = mongoose.model('PublicationS', publicationSchema);
module.exports = publication
