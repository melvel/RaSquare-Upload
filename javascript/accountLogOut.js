
var userLoggedIn = new Array();
var loadPage;
var interval;
var carRotate = 0;
var carRotations = 0;

function logOut()
{
	
	 
	
	getLogOutLocalStorage();
	
	for(i = 0; i < userLoggedIn.length; i++)
	{
		if(userLoggedIn[i] == true)
		{
			userLoggedIn[i] = false;
		}
	}
	
	saveItem("loggedIn", JSON.stringify(userLoggedIn));
	sessionStorage.clear();
}

function getLogOutLocalStorage()
{
	//bug getLogOutLocalStorage
	//localStorage["names"] =  JSON.stringify(["hello"]);
	
	 
	if(typeof localStorage.loggedIn != 'undefined') userLoggedIn = JSON.parse(localStorage.loggedIn);
	else console.log("Currently no data can be found")
}

function loadToNextPage(nextPage)
{
	var getLinks = document.getElementsByTagName("a");
	for(i = 0; i < getLinks.length; i++)
	{
		getLinks[i].onclick = function(){return false;}
	}
	
	
	var img = document.createElement("img");
	img.setAttribute("id", "car-loading-image");
    img.src = "images/webdev-images/car.png";

    document.body.appendChild(img);
	
	loadPage = nextPage;
	interval = setInterval(startLoading, 30);
}

function startLoading(nextPage)
{
	if(carRotations < 2)
	{
		carRotate = carRotate + 20;
		document.getElementById("car-loading-image").setAttribute("style", "position : absolute; top : 45%; left : 45%; width : 215px; height : 87px; transform : rotate(" + carRotate + "deg)  translateY(-100%);");
		
		if(carRotate == 360)
		{
			carRotate = 0;
			carRotations++;
		}
	}
	else
	{
		clearInterval(interval);
		window.location.href = loadPage;
	}
}

function saveItem(location, item){
	 
	localStorage.setItem(location, item)
}