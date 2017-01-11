
//https://developers.nest.com/products

var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.home.nest.com",
  "port": null,
  "path": "/oauth2/access_token?"+qs.stringify({
	code: '',
	client_id: '',
	client_secret: '',
	grant_type: 'authorization_code'
})
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(JSON.parse(body.toString()));
  });
});

req.end();


//// curl -X POST -d 'code=WX98LUE4&client_id=2d96b110-6220-4ccd-bee1-580ee1a5acb3&client_secret=eiCOvpj4lVG5n1MsIV2aI8apa&grant_type=authorization_code' "https://api.home.nest.com/oauth2/access_token"


return;

var nestApi = require('./lib/nest'),
	nest = new nestApi('', '');

nest.login()
	.then(nest.cameras)
	.then(console.log.bind(console))
	.catch(console.log.bind(console));
