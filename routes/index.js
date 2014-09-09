var express = require('express');
var router = express.Router();
var appdata = require ('../data.json');

/* GET home page. */
router.get('/', function(req, res) {
  var myArtWork = [];
  appdata.speakers.forEach (function (item) {
	myArtWork = myArtWork.concat (item.artwork);
  });
  res.render('index', { 
	title: 'Los Tani-Home',
	artwork: myArtWork,
	page: 'Home'
  });
});

/* GET famiglia page. */
router.get('/famiglia', function(req, res) {
  var myArtWork = [];
  var myPeople = [];
  myPeople = appdata.speakers;
  appdata.speakers.forEach (function (item) {
	myArtWork = myArtWork.concat (item.artwork);
  });
  res.render('people', { 
	title: 'Los Tani-Famiglia',
	artwork: myArtWork,
	people: myPeople,
	page: 'Famiglia'
  });
});

/* GET ONE famiglia page. */
router.get('/famiglia/:speakerid', function(req, res) {
  var myArtWork = [];
  var myPeople = [];
  
  appdata.speakers.forEach (function (item) {
	if (item.shortname == req.params.speakerid){
		myPeople.push (item);
		myArtWork = myArtWork.concat (item.artwork);
	}
  });
  res.render('people', { 
	title: 'Los Tani-Famiglia',
	artwork: myArtWork,
	people: myPeople,
	page: 'Famiglia Detail'
  });
});


module.exports = router;
