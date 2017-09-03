var express = require('express');
var router = express.Router();
var mongodb=require("mongodb");
mongodbCT=mongodb.MongoClient;
router.get('/', function(req, res, next) {
    mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
        let user=db.collection("register");
        console.log(req.query);
        console.log(req.session);
        user.find({"username":req.session.username}).toArray((err,result)=>{
            user.update({"username":req.session.username},{$set:{"pronews":{}}});
            res.end();
        });
    });
});

module.exports = router;
