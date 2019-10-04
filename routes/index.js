var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: `My name is Jonathan Hellberg born in Skövde, Sweden. At young age i got involved
             with computers games. At age 12 i started curiosity towards programming i wanted to 
             know how mods to minecraft where made. I went throgth many tutorials on youtube and i 
             finally had a prodcut but had still no ide what i was doing but i was fascinate 
             what i could do. At 14 i 'did' my first game in java i was a space shooter game 
             late 14-15 i made my first website at that moment i knew i was in the right track. 
             15-18 i learned how to program my english skills had developed and i started to 
             graps what 
             i acutally where doing i learn Java, PHP, SQL, HTML, CSS and much more. Now i study 
             in collage in the topic webproagmming.`
        }
    };

    res.json(data);
});

module.exports = router;
