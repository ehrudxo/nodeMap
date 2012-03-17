var express = require('express')
  , app = express.createServer()
  , nodeMap = require('./lib/NodeJsMap')
  , jade = require('jade');

//css, image등등의 static folder 셋팅 .
app.configure(function(){
	//config
	app.register('.jade', jade);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	//middleware
	app.use("/css",express.static(__dirname+"/css"));
	app.use("/img",express.static(__dirname+"/img"));
	app.use("/web",express.static(__dirname+"/web"));
	app.use(express.favicon());
	app.use(express.logger({ format: ':method :url' }));
	//router옵션을 써서 request의 queryString을 가지고 데이타를 만질 수 있다.
	app.use(app.router);
	app.use(express.bodyParser());
});
app.get("/", function(req,res){
	res.render("getMap");
});
app.get(/^\/users?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){
	res.send(__dirname+"<BR>"+"보내신 userId는 :"+req.params+"입니다.");
	nodeMap.Logger(__dirname,nodeMap.version);
});
app.get(/^\/nmap?(?:\/(\d+)(?:\/(\d+))(?:\/(\d+))?)?/,function(req,res){
	res.send("보내신 z,x,y는 :"+req.params+"입니다.");
});
//http://localhost:3000/canvas/bbox/123
app.get("/canvas/bbox/:bbox",function(req,res){
	//res.send("보내신 BBOX는 :"+req.params.bbox+"입니다.");
	nodeMap.makeCanvas(res);
});

app.listen(parseInt(process.argv[2] || '3000', 10));