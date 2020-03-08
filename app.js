var cheerio = require('cheerio')
var request = require('request')
var express = require('express')
const http = require('http')
var app = express()
var port = process.env.PORT || 3000;
var url = 'http://ncov.mohw.go.kr/';
var url1 = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=';
var url2 = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=&brdGubun=&ncvContSeq=&contSeq=&board_id=&gubun='

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

app.get('/', function (req, res) {
    res.send('This page is made for corona19_data')
})

app.get('/infected', function (req, res) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('div#mapAll > .mapview > .cityinfo').each(function () {
            text = $(this).text().toString();
            text = text.split('\n')
            text = text[3].replace(/[^0-9]/g, "");
            text = text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            res.send(text);
            console.log(text);
        })
    })
})

app.get('/release', function (req, res) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('div#mapAll > .mapview > .cityinfo  ').each(function () {
            text = $(this).text().toString();
            text = text.split('\n')
            text = text[15].replace(/[^0-9]/g, "");
            res.send(text);
            console.log(text);
        })
    })
})

app.get('/die', function (req, res) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('div#mapAll > .mapview > .cityinfo  ').each(function () {
            text = $(this).text().toString();
            text = text.split('\n')
            text = text[11].replace(/[^0-9]/g, "");
            res.send(text);
            console.log(text);
        })
    })
})

app.get('/die_percentage', function (req, res) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('div#mapAll > .mapview > .cityinfo  ').each(function () {
            text = $(this).text().toString();
            text = text.split('\n');
            var infected = text[3].replace(/[^0-9]/g, "");
            var die = text[11].replace(/[^0-9]/g, "");
            die_percentage = (die / infected) * 100
            die_percentage = die_percentage.toFixed(2)
            res.send(die_percentage);
            console.log(die_percentage);
        })
    })
})

app.get('/infected_plus', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody').find('td.number').first().each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/seoul', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(2) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/busan', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(3) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/daegu', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(4) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/incheon', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(5) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/gwangju', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(6) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/daejun', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(7) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/wulsan', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(8) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/sejong', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(9) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/gyeonggi', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(10) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/gangwon', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(11) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/chungbuk', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(12) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/chungnam', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(13) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/junbuk', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(14) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/junnam', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(15) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/keongbuk', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(16) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/keongnam', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(17) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})
app.get('/jeju', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(18) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/china', function (req, res) {
    request(url2, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(1) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/iran', function (req, res) {
    request(url2, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(20) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/italy', function (req, res) {
    request(url2, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(45) > td:nth-child(3)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/japan', function (req, res) {
    request(url2, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(5) > td:nth-child(2)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/infected_percentage', function (req, res) {
    request(url1, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.num > tbody > tr:nth-child(1) > td:nth-child(5)').each(function () {
            text = $(this).text().toString();
            res.send(text)
            console.log(text)
        })
    });
})

app.get('/korea', function(req,res){
    request(url, function (error, response, body) {
        var $ = cheerio.load(body)
        $('.co_cur > ul').each(function () {
            text = $(this).text();
            test_text = text.toString();
            test_text = test_text.split('\n');
            var a = test_text[1].replace(/[^0-9]/g, "");
            var b = test_text[3].replace(/[^0-9]/g, "");
            var c = a + "명(사망 " + b + ")"
            res.send(c)
            console.log(c)
        })
    });
})

app.listen(port, function () {
    console.log('서버 실행중...');
});