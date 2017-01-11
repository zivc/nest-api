const config = require('./config'),
  nestApi = require('./lib/nest'),
  nest = new nestApi(config);

nest.login()
	.then(console.log.bind(console))
	.catch(console.log.bind(console));

// nest.login(config.token)
//   .then(nest.cameras)
//   .then(console.log.bind(console))
//   .catch(console.log.bind(console));