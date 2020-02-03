const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const movies = require('../data/movie.json');
const log = console.log;

// "/movies/"로 get요청이 오면 모든 영화 리스트를 반환합니다.
// "/movies/:id"로 get요청이 오면 특정 id를 가진 영화의 정보를 반환합니다.



// router.get('/', function(req, res){
//     res.send(movies);
// });
let ulList = [];

router.get('/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    const movie = ulList.filter(function(movie){
        return movie.id === id;
    });
    res.send(movie);
});

router.get('/', function(req, res){
    let url = 'https://movie.naver.com/movie/running/current.nhn';
  
    axios.get(url).then(html => {
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.lst_wrap ul.lst_detail_t1").children("li");
      //each : list 마다 함수 실행, forEach와 동일
    $bodyList.each(function(i, elem) {
        ulList[i] = {
        //find : 해당 태그가 있으면 그 요소 반환
            id:i,
            name: $(this).find('dt.tit a').text(),
            // year: $(this).find('dt.tit_t1').next().find('#text').text(),
            poster: $(this).find('div.thumb img').attr('src').replace('m99_141_2','m203_290_2'),
            director:$(this).find('dt.tit_t2').next().find('span a').text(),
            description:function () {
                let detail_url= 'https://movie.naver.com'+$(this).find('dt.tit a').attr('href')
                console.log(detail_url)
                return detail_url;    
            }
            
           
        //     "id": 1,
        // "name": "공조",
        // "year": 2017,
        // "director": "김성훈",
        // "poster": "http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79416/79416_185.jpg",
        // "description": "공조 입니다."
            // url: $(this).find('strong.news-tl a').attr('href'),
            // image_url: $(this).find('p.poto a img').attr('src'),
            // image_alt: $(this).find('p.poto a img').attr('alt'),
            // summary: $(this).find('p.lead').text().slice(0, -11),
            // date: $(this).find('span.p-time').text()
        };
    });

  
      const data = ulList.filter(n => n.name);
      //json으로 변환하여 app으로 전송
      return res.json(data);
    })
});






module.exports = router;


