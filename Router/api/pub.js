const express = require("express")
const app=express()


const router = express.Router() 
const publication = require("../../Models/publication")


router.use(express.json());


router.post('/post', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    let pub = {title: title,description:description ,commentaires:[]};
    let postModel = new publication(pub);
    postModel.save().then((result) => {
        res.send(JSON.stringify(result))}).catch((err) => { console.log(err) })  
});

router.get('/post', (req, res) => {
    publication.find().then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
});






module.exports = router 