var koa = require('koa');
var app = koa();

// x-response-time

app.use(require('koa-static')('./public', {
    index: 'index.html',
    hidden: false,
    maxage: 0 //decide later
}));

app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %sms', this.method, this.url, ms);
});

// response

app.use(function* () {
    this.body = 'Hello World';
});

app.listen(3000);
