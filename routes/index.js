var express = require('express');
var router = express.Router();
var appdata = require ('../data.json');
var util = require('util');
var	fs = require ('fs-extra');

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


function uploaded_images_path (callback){
	var uploaded_images = [];
	fs.readdir('./public/images/uploads/', function (err, files) {
		if(err) throw err;
		// For every file in the list
		files.forEach(function (file) {
			uploaded_images = uploaded_images.concat ('/images/uploads/'+file);
		});
		callback (uploaded_images);
	});
};

/* GET Upload page. */
router.get('/upload', function(req, res) {
  var uploaded_images = [];
  uploaded_images_path (function (cb){
	uploaded_images=cb;
	res.render('upload', { 
		title: 'Los Tani-Compartir',
		page: 'Compartir',
		message: 'Si tenes alguna foto que quieras compartir con esta comunidad no lo dudes!',
		contributors_pics: uploaded_images
	});
  });
});

router.post ('/upload', function(req, res, next){
	var uploaded_images_paths = [];
    uploaded_images_path (function (cb){
		uploaded_images_paths=cb;
		if (req.files.uploadedFile === undefined) {
			res.render('upload', { 
				title: 'Archivo no seleccionado',
				page: 'No_File',
				message: 'No has seleccinado ningún archivo',
				contributors_pics: uploaded_images_paths
			});
		}else {
			fs.exists(req.files.uploadedFile.path, function(exists) { 
				if(exists) { 
					res.render('upload', { 
						title: 'Gracias por compartir',
						page: 'Uploaded',
						message: 'Gracias por compartir, podés seguir subiendo las imágenes que quieras.',
						contributors_pics: uploaded_images_paths
					});	
				} else {
					//algo paso que no se subio el archivo
				}		
			});
		}
	});
});

module.exports = router;