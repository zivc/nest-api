var request = require('request');

nest = (function() {

	var config,
		options,
		authObject = null,
		self,
		authMethod;

	function nestApi(configObj, passedOptions) {

		config = configObj;

		options = passedOptions || {
			loginPath:'https://home.nest.com',
			apiPath:'https://developer-api.nest.com',
			agent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
		};

	};

	nestApi.prototype.headers = function() {
		return {
			Authorization: 'Bearer '+config.token,
			'X-Requested-With':'XMLHttpRequest',
			'Referer':'https://home.nest.com/',
			'Content-Type':'application/json',
			'User-Agent': options.agent
		}
	};

	nestApi.prototype.login = function() {

		var self = this,
			getObj,
			headers;

		if (!authObject) {

			if (config.token) {

				getObj = {
					url:options.apiPath,
					method:'GET',
					headers:self.headers()
				};

			} else {

				getObj = {
					url:options.loginPath+'/session',
					body:JSON.stringify({
						email:config.user,
						password:config.pass
					}),
					headers:{
						'Content-Type':'application/json',
						'User-Agent': options.agent
					}
				};

				

			}

		}

		return new Promise(function(resolve,reject) {

			request[config.token ? 'get' : 'post'](getObj, function(err,response,body) {

				if (err) return reject(err);

				var json = JSON.parse(body);

				if (json.access_token) {
					// login user and pass
					config.access_token = json.access_token;
					return self.login().then(resolve).catch(reject);
				}

				resolve(body);

			});

		});

	};

	return nestApi;

})();

module.exports = nest;