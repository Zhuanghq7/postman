var rp = require('request-promise');
var color = require('colors');
module.exports = postman;

function postman(meth, url, callback) {
    url = parseURL(url);
    var parsed = parsePost(url);
    var urii = parsed[0];
    var postbody = parsed[1];
    console.log("uri is ".green + urii);
    console.log("body is ".green + postbody);
    var options_post;
    if (postbody) {
        options_post = {
            uri: urii,
            json: true,
            method: meth,
            body: JSON.parse(postbody),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } else {
        options_post = {
            uri: urii,
            json: true,
            method: meth,
            body: postbody,
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
    rp(options_post).then(function (body) {
        callback(JSON.stringify(body, null, 4));
    }).catch(function (err) {
        console.log(err);
        callback(JSON.stringify(err, null, 4));
    });

}

function parsePost(url) {
    for (var i = 0; i < url.length; i++) {
        if (url.charAt(i) === '\r' && i < url.length - 2) {
            return [url.substring(0, i), url.substring(i + 2)];
        }
    }
    return [url, undefined];
}




function parseURL(URL) {
    if(!String.prototype.trim) {  
        String.prototype.trim = function () {  
          return this.replace(/^\s+|\s+$/g,'');  
        };  
      } 
    URL = URL.trim();
    if (URL.substring(0, 7) !== 'http://') {
        URL = 'http://' + URL;
    }
    return URL;
}