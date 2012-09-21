Fake DWR
================================

Fake DWR creates a simple way to mock DWR request, usefull for tests suites.

DWR (http://directwebremoting.org/) is a Java library that enables Java on the server and JavaScript in a browser to interact and call each other as simply as possible.
Fake DWR is an framework-library-agnostic way to mock DWR methods without the need to create a fake server to mock ajax requests.

Browsers Tested
================================

Firefox stable, Chrome stable


Usage
================================

Step 1: include DWRs scripts as usual, changing yourService and DWRs paths to the appropriated ones
&lt;pre&gt;
&lt;script src="/dwr/interface/[yourService].js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/dwr/engine.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;/pre&gt;

Step 2: intialize FakeDWR and define with is the DWR service that will be mocked
&lt;pre&gt;
var fakedwr = new FakeDWR(yourService);
&lt;/pre&gt;

Step 3: create some fake data to be returned
&lt;pre&gt;
var data_to_be_returned = [{id: 1, name: "Git"}, {id: 2, name: "Hub"}];
&lt;/pre&gt;

Step 4: mock "yourMethod" method and define what data the callback function will return
&lt;pre&gt;
fakedwr.mock_method("yourMethod", data_to_be_returned);
&lt;/pre&gt;

Step 5: Call yourMethod from yourService (DWR method from DWR object) just the same way and define callback function, following DWR structure (as seen on the following example: http://directwebremoting.org/dwr-demo/simple/text.html).
  FakeDWR validates the amount of parameters passed to each method, so if yourService.yourMethod expects 'n' parameters, you must pass 'n' parameters to the mocked method, plus the callback function (surrounded by brackets).
  Calling the mocked method with wrong number of parameters or with missing callback function will throw an exception
&lt;pre&gt;
yourService.yourMethod(0,  { callback: function(dataFromServer) {
		for(var i=0; i&lt;dataFromServer.length; i++) {
			alert(dataFromServer[i].id + ": " + dataFromServer[i].name);
		}
	}
});
&lt;/pre&gt;
Step 6: you can also unmock method
&lt;pre&gt;
fakedwr.unmock_method("yourMethod");
&lt;/pre&gt;

Observations
================================

* You can have multiple fakers; you only have to instantiate a new FakeDWR object to each service
* You can pass any type of data for mocking the response in the callback function
* Change index.html with the appropriated object names to test