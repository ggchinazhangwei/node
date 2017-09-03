let express=require("express");
let router=express.Router();
let mongodb=require("mongodb");
let mongodbCT=mongodb.MongoClient;
router.post("/",(req,res,next)=>{
    let db=mongodbCT.connect("mongodb://127.0.1.1:27017/demo",(err,db)=>{
        let user=db.collection("register");
        var arr= req.body['my[]'];
        if (typeof arr !="object"){
            var arr2=[];
            arr2.push(arr);
            arr=arr2;
        }
        let arr1=[];
        for(var i in arr){
            arr1.push(Number(arr[i]));
        };
        console.log(arr1);
        user.find({"username":req.session.username}).toArray((err,result)=>{
            var newPro=result[0].pronews;
            console.log(newPro);
            for(var i in arr1){
                delete newPro[arr1[i]];
            }
            console.log(newPro);
            user.update({"username":req.session.username},{$set:{"pronews":newPro}});
        });
    });
});
module.exports=router;
