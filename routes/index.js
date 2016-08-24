var express = require('express');
var router = express.Router();
var myRedis = require('../myRedis');
var _ = require('underscore');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/checkIn/:id', function (req, res) {
    res.render('checkIn', {people: ['aaa', 'bbb'], title: req.params.id});
});

router.post('/checkIn', function (req, res) {
    var subject = req.body.subject;
    var uid = req.body.uid;
    console.log(subject);
    console.log(uid);
    if(_.isEmpty(subject) || _.isEmpty(uid)){
        res.redirect('/');
        return;
    }
    res.send(uid + ' ' + subject);
});

module.exports = router;
