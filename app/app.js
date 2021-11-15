let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());
app.options('*', cors());

app.listen(8888, () => {
	console.log("App started, port 8888");
});

app.use(express.static(__dirname));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({limit: '200mb', extended:true}));
app.use(bodyParser.json({limit: '200mb'}));

app.post("/capture", (req, res) => {
	// DETECT PLATE BY OPENALPR
	var base64img = req.body.img;
	
	const fs = require("fs").promises;

	// strip off the data: url prefix to get just the base64-encoded bytes
	const data = base64img.replace(/^data:image\/\w+;base64,/, "");
  
	const buf = Buffer.from(data, "base64");
	fs.writeFile("plate.png", buf);
	
	var exec = require('child_process').exec;
	var cmd = 'alpr -c eu -n 1 --json plate.png';
	var number = null;

	exec(cmd, {windowsHide: true}, function(error, stdout, stderr) {

		console.log(stdout);
		
		try {
		   var data = JSON.parse(stdout.trim())
		} catch (e) {
		   console.error('Failed to Parse JSON!', e)
		}
		
		if (data && data.results &&  data.results.length > 0) {
			number = data.results[0].plate;
		} else {
			number = "No license plate found.";
		}
		res.send(number);
		fs.unlink("plate.png");
	});

});