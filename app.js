var cheerio = require('cheerio')
var request = require('request')
var express = require('express')
const http = require('http')
var app = express()
var port = process.env.PORT || 3000;
var url = 'http://ncov.mohw.go.kr/index_main.jsp';


setInterval(function () {
    http.get("http://corona-data.herokuapp.com")
}, 900000)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.get('/',function (req, res){
    res.send('This page is made for corona19_data')
})

app.get('/infected',function (req, res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.co_cur > ul').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            var a = test_text[1].replace(/[^0-9]/g, "");
            res.send(a)
            console.log(a)
        })
    });
})

app.get('/release',function (req, res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.co_cur > ul').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            a = test_text[2].replace(/[^0-9]/g, "");
        })
        res.send(a)
        console.log(a)
    });
})

app.get('/die',function (req, res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.co_cur > ul').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            a = test_text[3].replace(/[^0-9]/g, "");
        })
        res.send(a)
        console.log(a)
    });
})

app.get('/die_percentage',function (req, res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.co_cur > ul').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            a = test_text[1].replace(/[^0-9]/g, "");
        })
        request(url, function (error, response, body) {
            var $ = cheerio.load(body)
            $('.co_cur > ul').each(function () {
                text = $(this).text();
                test_text = text.toString();
                test_text = test_text.split('\n');
                var b = test_text[3].replace(/[^0-9]/g, "");
                b = (b / a )* 10000
                b = b.toFixed(0)
                res.send(b)
                console.log(b)
            })
        });
    });
})

app.listen(port, function () {
    console.log('서버 실행중...');
});