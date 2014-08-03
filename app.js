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



app.get('/oldfood', function(req, res){

	createMessage();
})

app.listen('5000')
console.log('Magic happens on port 5000');
exports = module.exports = app; 	














function createMessage() {

	var d = new Date();
	var date = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var text = "";
	var favFood = "TUNA SALAD"
	var diningHall = "Dewick";
	var meal = "lunch";
	var allFoods = ["tuna salad", "yellow american cheese","samosa cake", "cheese omelet"];
	var i = 0;

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


		        for (i; i < allFoods.length; i++) {
		        	if (ar.search(allFoods[i].toLowerCase()) != -1) {
						if (text == "") {
		    				text = "Among " + diningHall + "'s fine offerings this " + meal + ": ";
						}
						text = text + " " + allFoods[i] + "!";
					}
		        }
		        console.log(text);
	        })
		}
        //res.send(lunch)
	})
}



function checkForFood(ar, text, favFood, diningHall, meal) {
	if (ar.search(favFood.toLowerCase()) != -1) {
		if (text == "") {
		    text = "Among " + diningHall + "'s fine offerings this " + meal + ": ";
		}
	text = text + " " + favFood + "!";
	}
	
	console.log(text);
	return text;
}






///////////////////////////////////////
//New structure of code:

app.get('/food', function(req, res){
	theDailyGrind();
})

function theDailyGrind() {
	var d = new Date();
	var date = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;

//url = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=05%2F31%2F2014&mealName=Lunch';
dLunchUrl = 'http://menus.tufts.edu/foodpro/longmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&dtdate=' + month + '%2F' + date + '%2F' + year + '&mealName=Lunch';
/* 
var dBfUrl
var dDinnerUrl
var cBfUrl
var cLunchUrl
var cDinnerUrl
*/

//var dBf = scrapeMeal(dBfUrl);
var dLunch = scrapeMeal(dLunchUrl);
// var dDinner = scrapeMeal(dDinnerUrl);
// var cBf = scrapeMeal(cBfUrl);
// var cLunch = scrapeMeal(cLunchUrl);
// var cDinner = scrapeMeal(cDinnerUrl);

// alertTheTroops(dBf, dLunch, dDinner, cBf, cLunch, cDinner);

}

function scrapeMeal(url) {
	request(url, function(error, response, html){
		var meal;

		if(!error){
			var $ = cheerio.load(html);
//console.log($);

$('.longmenucoldispname').filter(function(){
	var data = $(this);
	meal = data.children().text();
	var ar = JSON.stringify(meal);
	ar = ar.toLowerCase();
	return ar;
})
}
        //res.send(lunch)
    })
}


function alertTheTroops(dBf, dLunch, dDinner, cBf, cLunch, cDinner) {

//Fill in:
//how to call each user/access their info
//send_text()

for (each user) {
	var message = "";
	var meal;
	for (each food in their database) {
		meal = "bf";
		searchForFood(meal, food, message, "carm");
		searchForFood(meal, food, message, "dewick");
	}
	for (each food in their database) {
		meal = "lunch";
		searchForFood(meal, food, message, "carm");
		searchForFood(meal, food, message, "dewick");
	}
	for (each food in their database) {
		meal = "dinner";
		searchForFood(meal, food, message, "carm");
		searchForFood(meal, food, message, "dewick");
	}

	send_text(message, number);
}

}

function searchForFood(meal, food, message, hall) {
	if (meal.search(food) != -1) {
		appendToMessage(message, food, hall);
		return;       
	}
}

function favMessage() {
	var favMessage = "Today's favs:";
	return favMessage;
}

function appendToMessage(message, food, hall, meal) {
	if (message == "") {
		message = favMessage();
	} 
	toReturn = message + "\n" + food + ": " + hall + ", " + meal ;
	return toReturn;
}











