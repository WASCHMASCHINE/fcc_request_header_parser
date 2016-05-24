'use strict';

var express = require('express');
var app = express();


function parseLanguage(str){
    var stopIndex = str.search(",");
    return str.substr(0,stopIndex);
}

function parseSoftware(str){
    var bracketBegin = str.indexOf('(');
    var bracketEnd = str.indexOf(')');
    return str.substr(bracketBegin+1, bracketEnd-bracketBegin-1);
}

app.get('/api/whoami/', function(req, res){
    var ip = req.headers['x-forwarded-for'];
    var language = parseLanguage(req.headers['accept-language']);
    var software = parseSoftware(req.headers['user-agent']);
    
    var sendObject = { "ipadress": ip, "language": language, "software": software};
    res.end(JSON.stringify(sendObject));
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});