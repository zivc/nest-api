var request = require('request');

nest = (function() {

	var options,
		user,
		pass,
		token,
		authObject;

	function nestApi(u, p, o) {

		user = u;
		pass = p;
		options = o || {
			path:'https://home.nest.com',
			agent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
		};

	};

	nestApi.prototype.login = function(t) {

		if (t) {
			return new Promise(function(resolve,reject) {
				// check token
			});
		}

		return new Promise(function(resolve,reject) {

			request.post({
				url:options.path+'/session',
				headers:{
					'Content-Type':'application/json',
					'User-Agent': options.agent
				},
				body:JSON.stringify({
					email:user,
					password:pass
				})
			}, function(err, response, body) {
				if (err) return reject(err, response, body);

				authObject = JSON.parse(body);
				token = authObject.access_token;

				resolve(token);
			});

		});
	};

	nestApi.prototype.cameras = function() {

		return new Promise(function(resolve,reject) {

			request.get({
				url:options.path+'/dropcam/api/cameras?_='+(+new Date),
				headers:{
					'X-Requested-With':'XMLHttpRequest',
					'Referer':'https://home.nest.com/',
					'Authorization':'Basic '+token,
					'Content-Type':'application/json',
					'User-Agent': options.agent
				}
			}, function(err, response, body) {
				if (err) return reject(err, response, body);

				console.log(response, body);

				resolve(body);
			});

		});

	};

	return nestApi;

})();

module.exports = nest;


//Cookie:eu_compliance=50; _gaexp=GAX1.2.QX8xGJTQRzeLaS2X8GfuQA.17243.1; _ga=GA1.2.594216176.1482413321; viewer-volume=0.5; website_2=fe3033c99dff419f8b0997f8bd3e4f718773f51e6351bd50bc3379b8278b675fb27bd8fe; _ga=GA1.3.594216176.1482413321; n=eyJoYXMiOnsiNTI3NTE3MSI6eyJzdHIiOjF9fSwiaWRzIjpbIjUyNzUxNzEiXX0%3D; cztoken=b.5275171.EbqX4QZmjuVrrdc8sIdhe8wGSTio0nFErBJP77RicnY7q3ZcFMqwIIqWV8u3uYMwrgLQtFD14fqXNGtlly6hgJ70ZEtUQnoEJTeT0sMvqCtrwVNCtEpqCglFVWfBM7qKtL8eSSVy2aVhAuEh

// access_token
// :
// "lQkANQEwAQgOibTCIm1YgCQCBDcDLAEHNTI3NTE3MRgmBBEnnSAmBZEhxDM3BiwBBzUyNzUxNzEYJAcCJgglAFojMAo5BIPrjnWFhY9z0NxkAPmdfItNsni3/Zg0MeFVOEqBhGQdo0mZa2pfrTk6Jx+FZSPTcM2+6y1pkwBiNYMpARg1gikBJAIFGDWEKQE2AgQCBAEYGDWBMAIISGgHRFGlNxUYNYAwAghIaAdEUaU3FRg1DDABHQDtuVgRHjGuhw13pHv/kjXqEQeDgUtBBdhJ/tDdMAIccWYcPCxdHr3FU4egSn1ul8rLzJLlbI9zxteOfxgYNQImASUAWiMwAhxM8P7znSSN69+OYW2R1fJXwW4ACV0mFCv8Sdx5GBg="
// pairing_token
// :
// "wu.48A0XGNmlw0elz97Ij5e8Jo2DXNwv1xWUGuQGN2mHQY1JEi4dx8q5akipldzHJPgaOHljnFhlFKCziqvJBWKiAzwVhw="
// service_config
// :
// "1QAADw

// module.exports = (function() {

// 	var options = null;

// 	function nestApi(passedOptions) {

// 		options = passedOptions || {
// 			path:'https://home.nest.com',
// 			agent:'Nest/3.0.15 (iOS) os=6.0 platform=iPad3,1'
// 		};

// 		return this;

// 	};

// 	nestApi.prototype.login = function(username, password) {
// 		return new Promise(function(resolve,reject) {
// 			request.post(options.path+'/session', {
// 				body:{
// 					email:username,
// 					password:password
// 				}
// 			}, function(err, response, body) {
// 				if (err) return reject(err, response, body);
// 				resolve(response, body);
// 			});
// 		})
// 	};

// 	return nestApi;

// })();
