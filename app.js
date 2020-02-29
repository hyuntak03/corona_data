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

app.get('/examine',function (req, res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > td').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            a = test_text[0].replace(/[^0-9]/g, "");
        })
        res.send(a)
        console.log(a)
    });
})

app.listen(port, function () {
    console.log('서버 실행중...');
});