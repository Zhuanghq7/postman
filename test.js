(function () {
    console.log("wtf");
    (function foo() {
        var b = 1;
    })()
    console.log(b);
})()