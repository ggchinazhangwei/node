var express = require('express');
var router = express.Router();
var mongodb=require("mongodb");
mongodbCT=mongodb.MongoClient;
/* GET users listing. */
router.get('/', function(req, res, next) {
    mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
        let user=db.collection("register");
        user.find({username:req.session.username}).toArray((err,data)=>{
            if(data[0].pronews!=req.query.newPronews){
                user.update({pronews:data[0].pronews},{$set:{pronews:req.query.newPronews}});
                res.send(req.query.newPronews);
            }
        });
    });
});

module.exports = router;
