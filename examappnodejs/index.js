var express =require('express');
var app=express();
var router=express.Router();
var wiki=require('./wiki');
bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var mysql=require('mysql');
var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('views engine','pug');

// app.get('/',function (req,res) {
// 	res.send('Hello Buty Girl!! ')
// });

app.get('/test',function(req,res){
	res.render('test.pug','')
});
app.use('/wiki',wiki);
app.use(express.static('public'));
app.use(express.static('public2'))
///////////////////////////////////////////////////////
// app.get('/index',function(req,res){
// 	res.render('index.pug',{title:'landmarks'})
// });

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'0599050371',
	database:'landmark'
});

connection.connect();
connection.query('select * from landmarks',function(err,rows,fields){
	if (!err) {
		console.log("landmarks",rows);
		console.log("Fields",fields);
	}
	else
		console.log("Error" ,err);
});
////////////////////////
app.get('/index',function(req,res){
	connection.query('select * from landmarks ',function(err,result){
	if (!err) {
		res.render('index.pug',{title:'landmarks Names',landmarks:result});
	}
});
});
//////////////////////////////////////////////
app.get('/user/:id',function(req,res){
	id=req.params.id;
	res.send("Sama Id = " + id);
});

app.get('/student',function(req,res){
	var id=req.query.id;//http://localhost:3003/student?id=12
	res.send("Student ID is " + id);
});

app.post('/viewuser',function(req,res){
	var id=req.body.id;
	var name=req.body.name;

	res.send("Welcome " +name+"id"+id);
});

app.post('/adduser',function(req,res){
	var fn=req.body.fn;
	var ln=req.body.ln;
	res.send("Welcome Buty " + fn + ln )
});
app.use('/wiki',wiki);

module.export=router;

/////////////////////handling error
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500).send('Sama !!!!!!!!!!!somthing broke!');

});

app.listen(3003,function () {
console.log('Exxample app listen in port 3003');
});