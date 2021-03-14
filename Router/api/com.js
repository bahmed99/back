const express = require("express")
const app = express()


const router = express.Router()
const commentaire = require("../../Models/commentaire")
const publication = require("../../Models/publication")


router.use(express.json());


router.post('/comment/:id', (req, res) => {
    const idPost = req.params.id
    const idUser = req.body.idUser
    const description = req.body.description;
    let comment = { idUser: idUser, description: description };
    let commentModel = new commentaire(comment);
    commentModel.save().then((comment) => {
        publication.findById(idPost).then((result) => {
            publication.findByIdAndUpdate(req.params.id, {
                title: result.title,
                description: result.description,
                file: result.file,
                commentaires: [...result.commentaires,comment._id]
            }).then((resu) => {
                resu.save();
                res.send(resu)
            }).catch((err) => { console.log(err) }
            )

        }).catch((err) => { console.log(err) }
        )
    }).catch((err) => { console.log(err) })
});


async function getComments(id) {let comm=[]
    
     const publications= await publication.findById(id) 
     for (const comment of publications.commantaires){
        console.log(comment)
         const comments = await commentaire.findById(comment)
         
comm.push(comments)
     }
     return comm ; 
    }


router.get('/comment/publication/:id', async (req, res) => {

     const idPost = req.params.id

    publication.findById(idPost).then((result) => {
        

        commentaire.find({'_id':{$in:result.commentaires}}).then((resu)=>{
            res.send(resu)
        })
        
    }).catch((err) => { console.log(err) }
    )

    
});






module.exports = router