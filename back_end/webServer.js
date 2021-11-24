const express = require('express');
const cors = require('cors'); // Access-Control-Allow-Origin  해결 모듈
const multer  = require('multer') // // form-data를 받을 때 필요 
const upload = multer({ dest: 'uploads/' }) // form-data를 받을 때 필요 
const app = express();

let portNumber = 3333;

app.use(express.static('public')); //특정 폴더의 접근을 허가 
app.use(express.urlencoded({ extended: false })); //포스트로 일반 json object를 받을 때 필요 
app.use(express.json()) //포스트로 일반 json object를 받을 때 필요 
app.use(cors());

app.listen(portNumber, () => {
    console.log(`start ${portNumber} prot`);
});

app.get('/', function (req, res) {
    let body={
        a:'dddd',
        b:'bb',
        c:'234'
    }
    res.send(body);
})

app.get('/img', (request, response) => {
    response.send('login <img src="/javascript.jpg">')
});

app.get('/html', (request, response) => {
    let html=`
        <ul>
         <li>aaa</li>
         <li>bbb</li>
         <li>${Date()}</li>
        </ul>`;
    response.send(html)
});

// 쿼리로 웹브라우져에서 전달 
//http://localhost/query?id=20&count=22&name=%22dksdf|||%22
app.get('/query', function (req, res) {
    console.log(req.query);
    // 웹브라우져 호출 
    res.send(req.query)
})

// 시멘틱 URL
//http://localhost/param/0/2
app.get('/param/:id/:name', function (req, res) {
    console.log(req.params);
    res.send(req.params)
})

app.post('/create', function (req, res) {
    console.log('post create req.headers',req.headers['content-type']);    
    console.log(req.body);
    res.send(req.body)
})

app.post('/create_form',upload.array(),function (req, res) {
    console.log('post create req.headers',req.headers['content-type']);    
    console.log(req.body.email);
    res.send(req.body)
    
    //res.status(500).send('Internal Server Error');
})