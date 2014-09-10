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
router.get('/conceptos', function(req, res) {
  var myArtWork = [];
  var myPeople = [];
  myPeople = appdata.speakers;
  var intro = appdata.introduccion;
  appdata.speakers.forEach (function (item) {
	myArtWork = myArtWork.concat (item.artwork);
  });
  res.render('people', { 
	title: 'Los Tani-Conceptos',
	artwork: myArtWork,
	people: myPeople,
	page: 'Conceptos',
	introduccion: intro
  });
});

/* GET ONE famiglia page. */
router.get('/conceptos/:speakerid', function(req, res) {
  var myArtWork = [];
  var myPeople = [];
  
  appdata.speakers.forEach (function (item) {
	if (item.shortname == req.params.speakerid){
		myPeople.push (item);
		myArtWork = myArtWork.concat (item.artwork);
	}
  });
  res.render('people', { 
	title: 'Los Tani-Conceptos',
	artwork: myArtWork,
	people: myPeople,
	page: 'Conceptos Detail'
  });
});


module.exports = router;
