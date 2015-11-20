var url = require('url');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/plain"
};

var results = [];
var requestHandler = function(request, response) {
  if(url.parse(request.url).pathname === '/classes/messages' && (request.method === 'GET' || request.method === 'POST' || request.method === 'OPTIONS')){

    if (request.method === 'GET'){

      response.writeHead(200, headers);
      response.end(JSON.stringify({'results' : results}));

    }

    else if (request.method === 'POST'){

      var temp = '';
      request.on('data', function(post){

        temp += post;

      });

      request.on('end', function(){
        var tempResults = JSON.parse(temp);
        results.push(tempResults);

        response.writeHead(201, headers);
        response.end(JSON.stringify({'results' : results}));

      });
    } else if (request.method === 'OPTIONS'){
      response.writeHead(404, headers);
      response.end(JSON.stringify("Not Found"));
    }


  } else {
    response.writeHead(404, headers);
    response.end();
  }


};

exports.requestHandler = requestHandler;
