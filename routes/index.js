var express = require('express');
var router = express.Router();
var myRedis = require('../myRedis');
var _ = require('underscore');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/checkIn/:id', function (req, res) {
    myRedis.getSubjectValues(req.params.id).then(function (data) {
        res.render('checkIn', {people: data, title: req.params.id});
    });
});

router.post('/checkIn', function (req, res) {
    var subject = req.body.subject;
    var uid = req.body.uid;
    console.log(subject);
    console.log(uid);
    if (_.isEmpty(subject) || _.isEmpty(uid)) {
        if (!_.isEmpty(subject)) {
            res.redirect('/checkIn/' + subject);
        } else {
            res.redirect('/');
        }
        return;
    }
    myRedis.checkIn(uid, subject).then(function () {
        res.redirect('/checkIn/' + subject);
    });
});

module.exports = router;
