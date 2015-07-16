var express = require('express');
var http = require('http');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var compare = require('./compareFile.js');
var done= false;
var filename;

// Initialize Server
var app = express();
var server = http.createServer(app);



// app Enviroment
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname,'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer(
	{ 
		dest: path.join(__dirname,'upload'),
		rename: function (fieldname, filename) {
	   		return filename+Date.now();
	  	},	
		onFileUploadStart: function (file) {
			console.log(file.originalname + ' is starting ...');
		},
		onFileUploadComplete: function (file) {
			filename = file.name;
		  	done=  true;
		}
	}
));


app.use(bodyParser.json());                        

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req,res){
	res.render('index', {title: 'Diff'});
});



app.post('/upload/', function(req,res){
	var text;
	if(done == true){
		var fs = require('fs');
		fs.readFile( path.join(__dirname,'upload') +'/'+ filename, 'utf8', function(err, data) {
			if( err ){
		       console.log(err)
		    }
			else{
				text= data.toString('binary'); 
				res.send(text);
				fs.unlinkSync(path.join(__dirname,'upload') +'/'+ filename);
		    }
		})	
	}
});



app.post('/compare/',function(req,res){
	
	
	var text1 = req.body.text1.toString().replace(new RegExp(',', 'g'),'');
	var text2 = req.body.text2.toString().replace(new RegExp(',', 'g'),'');
	text1 = text1.replace(new RegExp('\r', 'g'),'').split('\n');
	text2 = text2.replace(new RegExp('\r', 'g'),'').split('\n');
	compared = new compare(text1,text2);
	res.send(compared.fileCompare());	

	
	
});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});