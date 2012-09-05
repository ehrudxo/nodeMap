var express 	= require('express')
	, app 		= express()
	, nodeMap 	= require('./lib/NodeMap')
	, Bounds 	= require('./lib/atomic/BaseTypes').Bounds
	, writer 	= require('./lib/writer/ImgTagWriter')
	, test		= require('./server-test')
	, jade 		= require('jade');

//css, image등등의 static folder 셋팅 .
app.configure(function(){
	//config
	app.engine('jade', jade.__express);
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
app.get("/Map1", function(req,res){
	res.render("Map1");
});
app.get(/^\/users?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){
	res.send(__dirname+"<BR>"+"보내신 userId는 :"+req.params+"입니다.");
	nodeMap.Logger(__dirname,nodeMap.version);
});
app.get(/^\/nmap?(?:\/(\d+)(?:\/(\d+))(?:\/(\d+))?)?/,function(req,res){
	res.send("보내신 z,x,y는 :"+req.params+"입니다.");
});
//http://localhost:3000/canvas/bbox/123
app.get("/canvas/imgSvc/:str",function(req,res){
	
	var size,bbox;
	var layerIds = req.params.str.split(",");
	var boundsArray = layerIds.splice(layerIds.length-4);
	var sizeArray = layerIds.splice(layerIds.length-2);
	size ={ x :sizeArray[0], y : sizeArray[1] };
	bbox = new Bounds( boundsArray[0], boundsArray[1], boundsArray[2], boundsArray[3]);
	//일단 여기도 refactorng
	nodeMap.setExtent( layerIds, bbox, size , function( str ){
		//png string 을 data *.png 파일로 저장하는 모듈.
		var data = str.replace(/^data:image\/\w+;base64,/, "");
		var buf = new Buffer(data, 'base64');
		res.send( buf );
		
	});

});

app.listen(parseInt(process.argv[2] || '8080', 10));