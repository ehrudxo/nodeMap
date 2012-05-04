var express 	= require('express')
	, app 		= express.createServer()
	, nodeMap 	= require('./lib/NodeMap')
	, Bounds  	= require('./lib/atomic/BaseTypes')
	, Bar 		= require('./lib/model/layer/bar').Layer
	, Bounds 	= require('./lib/atomic/BaseTypes').Bounds
	, styler 	= require('./lib/styler/Styler') 
	, adaptor 	= require('./lib/adaptor/database/pg/PostGisAdaptor')
	, writer 	= require('./lib/writer/ImgTagWriter')
	, jade 		= require('jade');

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
app.get("/canvas/imgSvc/:str",function(req,res){
	console.log("service called");
	var layer, size,bbox;
	var arrString = req.params.str.split(",");
	if(arrString.length != 7){
		res.send("보내신 BBOX는 :"+req.params.str+"입니다.");
	}else{
		layer = arrString[0];
		size ={ x :arrString[1], y : arrString[2] };
		bbox = new Bounds(arrString[3],arrString[4],arrString[5],arrString[6]);
		var bar = new Bar();
		bar.setAdaptor( adaptor );
		styler.init({
			type : "POINT"
		});
		bar.setStyler( styler );
		nodeMap.init();
		nodeMap.addLayer( bar );	
		
		nodeMap.setExtent( bbox, size , function( str ){
			//png string 을 data *.png 파일로 저장하는 모듈.
			var data = str.replace(/^data:image\/\w+;base64,/, "");
			var buf = new Buffer(data, 'base64');
			res.send(buf,{"Content-Type":"image/png"});
			
//			console.log("before response set");
//			writer.setResponse(res);
//			writer.write(str);
//			console.log("after response write");
//		    console.log("the end now.");
		});
//		res.send("456");
	}

//	nodeMap.makeCanvas(res); 
});

app.listen(parseInt(process.argv[2] || '3000', 10));