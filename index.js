var config = require('./config'),
  nestApi = require('./lib/nest'),
  nest = new nestApi(config);

nest.login()
	.then(nest.cameras())
	.then(function(obj) {
		console.log(obj);
		//console.log(JSON.parse(obj,null,4));
	})
	.catch(function(err) {
		console.log('there has been an error', err);
	});

// nest.login(config.token)
//   .then(nest.cameras)
//   .then(console.log.bind(console))
//   .catch(console.log.bind(console));
