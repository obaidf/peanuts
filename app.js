var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://www.imdb.com/title/tt1229340/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};

			$('.header').filter(function(){
		        var data = $(this);
		        title = data.children().first().text();
		        release = data.children().last().children().text();

		        json.title = title;
		        json.release = release;
	        })

	        $('.star-box-giga-star').filter(function(){
	        	var data = $(this);
	        	rating = data.text();

	        	json.rating = rating;
	        })
		}

        res.send(json)
	})
})



app.get('/food', function(req, res){

	var d = new Date();
	var date = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;

	//url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=05%2F31%2F2014&mealName=Lunch';
	url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=' + month + '%2F' + date + '%2F' + year + '&mealName=Lunch';

	console.log("here");
	request(url, function(error, response, html){
		var lunch;

		if(!error){
			var $ = cheerio.load(html);
			//console.log($);

			$('.longmenucoldispname').filter(function(){
		        var data = $(this);
		        lunch = data.children().text();
		        var ar = JSON.stringify(lunch);
		        ar = ar.toLowerCase();
		        if (ar.search("vg samosa cake") != -1) {
		        	console.log("found it!!!!");
		        	return;
		        }
	        })
		}
        //res.send(lunch)
	})
})

app.listen('5000')
console.log('Magic happens on port 5000');
exports = module.exports = app; 	