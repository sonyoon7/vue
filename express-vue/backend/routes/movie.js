const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const movies = require('../data/movie.json');
const log = console.log;

// "/movies/"로 get요청이 오면 모든 영화 리스트를 반환합니다.
// "/movies/:id"로 get요청이 오면 특정 id를 가진 영화의 정보를 반환합니다.



router.get('/', function(req, res){
    res.send(movies);
});


router.get('/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    const movie = movies.filter(function(movie){
        return movie.id === id;
    });
    res.send(movie);
});

// router.get('/', function(req, res){
//     let url = 'https://www.yna.co.kr/sports/all';
  
//     axios.get(url).then(html => {
//       let ulList = [];
//       const $ = cheerio.load(html.data);
//       const $bodyList = $("div.headline-list ul").children("li.section02");
//           //each : list 마다 함수 실행, forEach와 동일
//       $bodyList.each(function(i, elem) {
//         ulList[i] = {
//           //find : 해당 태그가 있으면 그 요소 반환
          
//             title: $(this).find('strong.news-tl a').text(),
//             url: $(this).find('strong.news-tl a').attr('href'),
//             image_url: $(this).find('p.poto a img').attr('src'),
//             image_alt: $(this).find('p.poto a img').attr('alt'),
//             summary: $(this).find('p.lead').text().slice(0, -11),
//             date: $(this).find('span.p-time').text()
//         };
//       });
  
//       const data = ulList.filter(n => n.title);
//       //json으로 변환하여 app으로 전송
//       return res.json(data);
//     })
// });






module.exports = router;


