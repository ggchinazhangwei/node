let express=require("express");
let router=express.Router();
let mongodb=require("mongodb");
let mongodbCT=mongodb.MongoClient;
router.post("/",(req,res,next)=>{
    let db=mongodbCT.connect("mongodb://127.0.1.1:27017/demo",(err,db)=>{
        let user=db.collection("product");
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
        user.find({productId:{"$in":arr1}}).toArray((err,result)=>{
            res.send(result);
        });
    });
});
module.exports=router;