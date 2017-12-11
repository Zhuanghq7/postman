var express = require('express');
var bodyParser = require('body-parser');
var color = require('colors');
var postman = require('./FuckWinCmd');

/* create app */
var app = express.createServer();

/* setting */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {
    layout: false
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
console.log("start reading examples".green);
var examples = require('fs').readFileSync('example.txt').toString().split("//");
var I = 0;
var exampleSen = new Array();
var exampleDoc = new Array();
for (var temp in examples) {
    if (I == 0) {
        exampleSen.push(examples[temp]);
        I = 1;
    } else {
        exampleDoc.push(examples[temp]);
        I = 0;
    }
}
console.log(exampleSen);
console.log(exampleDoc);
console.log("examples readed".green);
/* get func */
app.get('/', function (req, res) {
    res.render('index', {
        url: "",
        b:"",
        meth: "get",
        result: "",
        exampleS:exampleSen,
        exampleD:exampleDoc
    });
})
var count = 0;
/* post func */
app.post('/', function (req, res) {
    console.log('We have an new come! count:' + (++count));
    var body = postman(req.body.meth, req.body.q,req.body.b,req.body.json, function (RES) {
        res.render('index', {
            url: req.body.q,
            b:req.body.b,
            meth: req.body.meth,
            result: RES,
            exampleS:exampleSen,
            exampleD:exampleDoc
        })
    });
})

/* start server */
console.log("start server".red);
var server = app.listen(3000, function () {
    console.log('listening on port ' + '%d'.inverse, server.address().port);
});