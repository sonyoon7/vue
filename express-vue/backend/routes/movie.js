const express = require('express');
const router = express.Router();
const movies = require('../data/movie.json');

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

module.exports = router;


