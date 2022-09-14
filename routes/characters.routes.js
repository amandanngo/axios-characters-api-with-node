const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
}); 

router.get('/characters/:id/edit', (req,res,next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { 
            character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
})


router.post('/characters/:id/update', (req,res,next) => {
    const charURL = `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`;

    async function charEditor(){
        if(req.body.name){
            await axios.patch(charURL, {name: req.body.name});
        }
        if(req.body.occupation){
            await axios.patch(charURL, {occupation: req.body.occupation});
        }
        if(req.body.weapon){
            await axios.patch(charURL, {weapon: req.body.weapon});
        }
        res.redirect('/characters/'+ req.params.id)
    }
    charEditor();
})


router.post('/characters/:id/delete', (req,res,next) => {
    const charURL = `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`;
    axios.delete(charURL)
        .then(() =>{
            res.redirect('/characters')
        })

})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters