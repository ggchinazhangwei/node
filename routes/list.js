var express = require('express');
var router = express.Router();
let mongodb = require("mongodb");
let mongodbCT = mongodb.MongoClient;
router.get('/',(req, res, next)=> {
    mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
        let product = db.collection("list");
        product.find({}).toArray((err,result)=> {
            res.send({productjson:result});
        })
        ;
    })
    ;
});
module.exports = router;

