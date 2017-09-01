let express=require("express");
let router=express.Router();
let mongodb=require("mongodb");
let mongodbCT=mongodb.MongoClient;
router.use("/",(req,res)=>{
    mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
        let user=db.collection("register");
        user.find({username:req.session.username}).toArray((err,result)=>{
            var newpronews=result[0].pronews;
            newpronews[req.query.xuhao]=Number( newpronews[req.query.xuhao])+Number(req.query.num);
            user.update({"username":result.username, "pronews":result.pronews},{$set:{"username":result.username, "pronews":newpronews}});
            res.end();
        })
    });
});
module.exports=router;