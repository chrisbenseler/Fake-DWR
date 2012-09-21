(function () {
	var instance;
	FakeDWR = function FakeDWR(service) {
		
		var unmocked_service = {};
		var mocked_service = {}; //not modified yet
		for (var attr in service) {
			if (service.hasOwnProperty(attr)) {
				unmocked_service[attr] = service[attr];
				mocked_service[attr] = service[attr];
			}
		}
		var unmocked_methods = [];

		/*
		 * private methods
		 */

		/*
		 * get all methods from service
		 */
		var get_methods = function() {
			unmocked_methods = [];
			for(var key in service) {
				unmocked_methods.push(key);
			}
		}
		get_methods();


		/*
		 * public methods
		 */
		
		
		/*
		 * mock a certain method and return some fake data
		 */
		this.mock_method = function(method_name, fake_data) {
			var method_to_mock = mocked_service[method_name];
			var arguments_expected_length = method_to_mock.length;
			service[method_name] = function() {
				if(method_to_mock.length!=arguments.length) {
					throw "Wrong number of parameters passed to method " +  method_name;
				}  else if(arguments.length==0 || (typeof arguments[arguments.length - 1]["callback"]!="function")) {
					throw "Callback function not informed";
				} else {
					var callback = arguments[arguments.length - 1]["callback"];
					if(fake_data == undefined)
						fake_data = null;
					callback(fake_data);
				}
				
			}
		}

		/*
		 * unmock a certain method
		 */
		this.unmock_method = function(method_name) {
			if(mocked_service[method_name]!=null && unmocked_service[method_name]!=null) {
				service[method_name] = unmocked_service[method_name];
			}
				
		}


		
	}

})();
