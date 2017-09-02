let express=require("express");
let router=express.Router();
let mongodb=require("mongodb");
let mongodbCT=mongodb.MongoClient;
router.use("/",(req,res)=>{
    mongodbCT.connect("mongodb://127.0.0.1:27017/demo",(err,db)=>{
        let user=db.collection("register");
        user.find({username:req.session.username}).toArray((err,result)=>{
            var newpronews={};
            for(var i in result[0].pronews){
                newpronews[i]=result[0].pronews[i];
            }
            if(newpronews[req.query.xuhao]){
                newpronews[req.query.xuhao]=Number(newpronews[req.query.xuhao])+Number(req.query.num);
            }else{
                newpronews[req.query.xuhao]=1;
            }
            user.update({"username":result[0].username},{$set:{"pronews":newpronews}});
            res.end();
        })
    });
});
module.exports=router;