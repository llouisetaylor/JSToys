// Initialisation
var initialText = "My friend and I went to the park today. I was disappointed because the weather was miserable. My friend was unhappy for the rest of the day."
$("#textbox").val(initialText); //Puts initialText in textarea
var happyWords = ["delight", "delighted", "delightful", "happy", "glad", "joy", "joyful", "merry", "pleasant"];
var sadWords = ["disappointed", "miserable", "sad", "sorrow", "unhappy"];
var allWords = happyWords.concat(sadWords); //
var animateSpeed = 300;
var score;

// Randomly order keywords
while (allWords.length != 0) {
	var randIndex = Math.floor(Math.random()*allWords.length);
	var word = allWords.splice(randIndex, 1);
	var item = document.createElement("li");
	item.textContent = word;
	$("ul").append(item);
}

// Assign event handler to textbox
$("#textbox").on("input", function() {
	var hsc = getHappySadCount();
	var newScore = calculate(hsc.happy, hsc.sad); 
	if (newScore != score) { // Only update when score changes
		updatePage(newScore);
		score = newScore;
	}
});

function getHappySadCount() {
	var text = $("#textbox").val()
		.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") // Strings in list contain no punctuation
		.toLowerCase(); // Strings in list contain no uppercase
	var textList = text.split(/\s+/g); // Split by whitespace characters
	
	var happyCount = 0;
	var sadCount = 0;
	for (var i = 0; i < textList.length; i++) { 
		if (happyWords.indexOf(textList[i]) != -1) { // Text input is a keyword
			happyCount++;
		} else if (sadWords.indexOf(textList[i]) != -1) {
			sadCount++;
		}
	}
	return {
		happy: happyCount,
		sad: sadCount,
	};
}

function calculate(happy, sad) {
	if (happy != sad) {
		return (happy - sad) / (happy + sad) ;
	} else {
		return 0;
	}
}

function updatePage(value) {
	if (value >= 0.2) {
		$("body").animate({ backgroundColor: "#FFF07C" }, animateSpeed);
		$("#bee").attr("src", "beehappy.png");
		$("#bee").attr("alt", "Bumble Bee is happy")
	} else if (value <= -0.2) {
		$("body").animate({ backgroundColor: "#66C7F4" }, animateSpeed);
		$("#bee").attr("src", "beesad.png");
		$("#bee").attr("alt", "Bumble Bee is sad")
	} else {
		$("body").animate({ backgroundColor: "#FFFFFF" }, animateSpeed);
		$("#bee").attr("src", "beeneutral.png");
		$("#bee").attr("alt", "Bumble Bee is neither happy nor sad")
	}
	$("#positive").animate({width: (50 + value * 50)+'%'}, animateSpeed);
	$("#negative").animate({width: (50 - value * 50)+'%'}, animateSpeed);
}
