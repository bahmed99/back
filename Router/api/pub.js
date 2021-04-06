const express = require("express")
const app=express()
const fs = require('fs')

const multer = require('multer')
const config = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'./CV')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.nom + '-' + file.originalname);
  }  
  
})
const upload = multer({storage: config})

const router = express.Router() 
const publication = require("../../Models/publication")

router.use(express.json());

router.post('/post',upload.single('file'), (req, res) => {
    let data = req.body
    console.log(data)

    let file_test=false
        if(req.file)
        {
          fs.renameSync(req.file.path, req.file.path.replace('undefined', true + req.body.title));
          file_test=true
        }

    let pub = {title: data.title,body:data.body ,file:data.file,commentaires:[]};
    let postModel = new publication(pub);
    postModel.save().then((result) => {
        res.send(JSON.stringify(result))}).catch((err) => { console.log(err) })  
});


router.put('/comment/:id', (req, res) => {
    const idUser = req.body.idUser
    const description = req.body.description;
    console.log(req.body)
    let comment = { idUser: idUser, description: description };
 
        publication.findById(req.params.id).then((result) => {
            publication.findByIdAndUpdate(req.params.id, {
                title: result.title,
                body: result.body,
                file: result.file,
                commentaires: [...result.commentaires,comment]
            }).then((resu) => {
                resu.save();
                res.send(resu)
            }).catch((err) => { console.log(err) }
            )

        }).catch((err) => { console.log(err) }
        )
});






















router.get('/post', (req, res) => {
    publication.find().then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
});






module.exports = router 