var rp = require('request-promise');
var color = require('colors');
module.exports = postman;

function postman(meth, url, body, isjson, callback,header) {
    url = parseURL(url);
    //var parsed = parsePost(url);
    var urii = url;
    var postbody = body;
    var judgejson = (isjson === "true");
    console.log("uri is ".green + urii);
    console.log("body is ".green + postbody);
    console.log("meth is ".green + meth);
    console.log("isjson ".green + isjson);
    console.log("header is".green+header);
    var options_post;
    var Header = header?JSON.parse(header):"";
    

    if (judgejson) {
        // Header["Content-Type"] = "application/json";
        options_post = {
            uri: urii,
            json: true,
            method: meth,
            body: postbody?JSON.parse(postbody):"",
            headers: Header
        };
    } else {
        options_post = {
            uri: urii,
            method: meth,
            body: postbody,
            headers:Header
        };
    }

    rp(options_post).then(function (body) {
        if (judgejson) {
            callback(JSON.stringify(body, null, 4));
        } else {
            callback(body);
        }
    }).catch(function (err) {
        console.log(err);
        if (judgejson) {
            callback(JSON.stringify(err, null, 4));
        } else {
            callback(body);
        }
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
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
    URL = URL.trim();
    if (URL.substring(0, 7) !== 'http://') {
        URL = 'http://' + URL;
    }
    return URL;
}