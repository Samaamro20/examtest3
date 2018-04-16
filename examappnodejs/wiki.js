var express=require('express');
var router=express.Router();

router.get('/wiki',function (req,res) {
	res.send("This is wiki home Page  ");
});

router.get('/about',function(req,res){
	res.send("Wiki about Page ");
});


module.exports=router;