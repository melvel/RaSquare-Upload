var imagesAmount = 4;
var sourceFolder = "images/shuffling-images/";
var counter = 2;

function startShuffling()
{
	setInterval(shuffleImages, 5000);
}

function shuffleImages()
{
	document.getElementById("shuffling-images").setAttribute("src", sourceFolder + counter + ".png");
	
	counter++;
	
	if(counter == 5)
	{
		counter = 1;
	}
}