var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var	fs = require ('fs-extra');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
		dest: './public/images/uploads',
		limits: {
			fieldNameSize: 100,
			files: 1,
			fileSize: 524288
		},
		rename: function (fieldname, filename) {
			var today = new Date();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			if(mm<10) {
				mm='0'+mm
			} 
			today = mm+'-'+yyyy;
			return filename + "_" + today;
		},
		onFileSizeLimit: function (file) {
			console.log('Failed: ', file.originalname)
			fs.unlink('./' + file.path) // delete the partially written file
		}
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.appdata = require ('./data.json');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
			title: 'Error-404',
			page: 'Page_not_Found',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
		title: 'Error-404',
		page: 'Page_not_Found',
        message: err.message,
        error: {}
    });
});


module.exports = app;
