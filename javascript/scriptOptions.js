var name;
var oldpass;
var pass;
var passconf;
var securityQuestion;
var security;
var colorSet;
var viewSet;

var userName = new Array();
var userUsername = new Array();
var userPassword = new Array();
var userSecurityQuestion = new Array();
var userSecurity = new Array();
var userLoggedIn = new Array();
var userGamesWon = new Array();
var userGamesLost = new Array();
var userHighScore = new Array();
var userColor = new Array();
var userViewMode = new Array();
var userVolume = new Array();

var loggedInPosition;

var process = true;
var proceedals = [];

var bannerPosition = 0;
var interval;
var audio;

function startOptions()
{
	getOptionsLocalStorage();
	loggedInPosition = getLoggedInUser();
	getCurrentViewMode();
	getCurrentVolume();
	setView();
	getCurrentColor();
	disableBottomForm(true);
	audio = document.getElementById("audio-background");
}

function getLoggedInUser()
{
	for(i = 0; i < userLoggedIn.length; i++)
	{
		if(userLoggedIn[i] == true)
		{
			return i
		}
	}
}

function getCurrentViewMode()
{
	var elementValue = userViewMode[loggedInPosition];
	
	//bug getCurrentViewMode
	//localStorage.viewMode = JSON.stringify([]);
	
	var selectEl = document.getElementById("play-mode-list");
	var optionsEl = selectEl.options;
	
	for(i = 0; i < optionsEl.length; i++)
	{
		if(elementValue == optionsEl[i].value)
		{
			selectEl.selectedIndex = i;
			break;
		}
	}
}

function getCurrentColor()
{
	var elementValue = userColor[loggedInPosition];
	//bug getCurrentColor
	//localStorage.playerColor = JSON.stringify([]);
	
	var selectEl = document.getElementById("color-list");
	var optionsEl = selectEl.options;
	
	for(i = 0; i < optionsEl.length; i++)
	{
		if(elementValue == optionsEl[i].value)
		{
			selectEl.selectedIndex = i;
			break;
		}
	}
}

function getCurrentVolume()
{
	document.getElementById("volume-range").value = userVolume[loggedInPosition] * 100;
}

function setView()
{
	var changeView = userViewMode[loggedInPosition];
	
	var elementChange = document.getElementsByClassName("page-body");
	
	elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/" + changeView + ".png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");
	//bug setView
	//elementChange[0].setAttribute("style", "float : left; background-image:url(images/webdev-images/night-mode.png); background-size: 1300px 700px; background-repeat: no-repeat; background-position: center top; width : 1300px; height : 700px;");

}

function disableBottomForm(disabled)
{
	var items = document.getElementById("account-change").getElementsByTagName("*");
	
	for(i = 0; i < items.length; i++)
	{
		items[i].disabled = disabled;
	}
	
	if(disabled == true)
	{
		document.getElementById("deactivate-button").setAttribute("style", "color : white;");
		document.getElementById("save-button").setAttribute("style", "color : white;");
	}
	else
	{
		document.getElementById("deactivate-button").setAttribute("style", "color : black;");
		document.getElementById("save-button").setAttribute("style", "color : black;");
	}
}

function enableAccountModifications()
{
	var check = document.getElementById("account-modification").checked;
	
	if(check == true)
	{
		
		disableBottomForm(false);
		//bug disableBottomForm
		//disableBottomForm(true);
	}
	else
	{
		disableBottomForm(true);
	}
}

function getOptionsLocalStorage()
{
	userName = JSON.parse(localStorage.names);
	userUsername = JSON.parse(localStorage.usernames);
	userPassword = JSON.parse(localStorage.passwords);
	userSecurityQuestion = JSON.parse(localStorage.securityquestions);
	userSecurity = JSON.parse(localStorage.securityanswers);
	userLoggedIn = JSON.parse(localStorage.loggedIn);
	userGamesWon = JSON.parse(localStorage.gamesWon);
	userGamesLost = JSON.parse(localStorage.gamesLost);
	userHighScore = JSON.parse(localStorage.highScore);
	userColor = JSON.parse(localStorage.playerColor);
	userViewMode = JSON.parse(localStorage.viewMode);
	userVolume = JSON.parse(localStorage.volume);
}

function validateRegistrationModification()
{
	name = document.getElementById("name-textbox").value;
	oldpass = document.getElementById("old-password-textbox").value;
	pass = document.getElementById("password-textbox").value;
	passconf = document.getElementById("confirm-password-textbox").value;
	securityQuestion = document.getElementById("security-list").value;
	security = document.getElementById("security-textbox").value;
	
	inputtingErrorFound("security-textbox", "");
	inputtingErrorFound("old-password-textbox", "");
	inputtingErrorFound("password-textbox", "");
	inputtingErrorFound("confirm-password-textbox", "");
	inputtingErrorFound("name-textbox", "");
	
	while(proceedals.length > 0) {
		proceedals.pop();
	}
	
	validateAllForm();
	
	if(process == true)
	{
		for(i = 0; i < proceedals.length; i++)
		{
			if(proceedals[i] == "name-textbox")
			{
				userName[loggedInPosition] = name;
			}
			else if(proceedals[i] == "security-textbox")
			{
				userSecurityQuestion[loggedInPosition] = securityQuestion;
				userSecurity[loggedInPosition] = security;
			}
			else if(proceedals[i] == "password-textbox")
			{
				userPassword[loggedInPosition] = pass;
			}
		}
		
		setOptionsLocalStorage();
		document.getElementById("account-change").reset();
	}
	
}

function validateAllForm()
{
	var counter = 0;
	process = true;
	do
	{
		switch(counter)
		{
			case 0 :
				checkAmendedName();
				break;
				
			case 1 : 
				checkAmendedSecurity();
				break;
				
				
			case 2 :
				checkAmendedPassword();
				break;
				
			case 3 :
				if(!checkAnyChanges()) process = false;
				break;
		}
		
		counter++;
		
	}while(process == true && counter < 4);
	
}

function checkAmendedName()
{
	
	if(name != "")
	{
		if(name.length < 3 || name.length > 8)
		{
			inputtingErrorFound("name-textbox", "3 < Name < 8");
		}
		else
		{
			proceedals.push("name-textbox");
		}
	}
}

function checkAmendedSecurity()
{	
	if(securityQuestion == "")
	{
		if(security != "")
		{
			inputtingErrorFound("security-textbox", "Choose one of the questions");
		}
	}
	else
	{
		if(security == "")
		{
			inputtingErrorFound("security-textbox", "Input Security Answer.");
		}
		else
		{
			if(security.length < 1 || security.length > 20)
			{
				inputtingErrorFound("security-textbox", "1 < Security Answer < 20");
			}
			else
			{
				proceedals.push("security-textbox");
			}
		}
	}
}

function checkAmendedPassword()
{
	if(oldpass != "" && pass != "" && passconf != "")
	{
		if(oldpass == userPassword[loggedInPosition])
		{
			if(oldpass == pass)
			{
				inputtingErrorFound("password-textbox", "Cannot be same as old password.");
				inputtingErrorFound("confirm-password-textbox", "");
			}
			else
			{
				if(pass.length < 6 || pass.length > 12)
				{
					inputtingErrorFound("password-textbox", "6 < Password < 12");
					inputtingErrorFound("confirm-password-textbox", "");
				}
				else
				{
					if(pass === passconf)
					{
						proceedals.push("password-textbox");
					}
					else
					{
						inputtingErrorFound("password-textbox", "Passwords did not match.");
						inputtingErrorFound("confirm-password-textbox", "");
					}
				}
			}
		}
		else
		{
			inputtingErrorFound("old-password-textbox", "Incorrect password");
		}
	}
	else if(oldpass != "" || pass != "" || passconf != "")
	{
		if(oldpass == "")
		{
			inputtingErrorFound("old-password-textbox", "Input current password");
		}
		
		if(pass == "")
		{
			inputtingErrorFound("password-textbox", "1 < Password < 20");
		}
		
		if(passconf == "")
		{
			inputtingErrorFound("confirm-password-textbox", "1 < Password < 20");
		}
		
	
		process = false;
	}
}

function checkAnyChanges()
{
	if(proceedals.length == 0)
	{
		return false;
	}
	
	return true;
}

function inputtingErrorFound(elementID, message)
{
	document.getElementById(elementID).value = "";
	document.getElementById(elementID).placeholder = message;
	document.getElementById(elementID).focus();
	process = false;
}

function setOptionsLocalStorage()
{
	//localStorage.clear();
	
	localStorage.removeItem('names')
	localStorage.removeItem('usernames')
	localStorage.removeItem('passwords')
	localStorage.removeItem('securityquestions')
	localStorage.removeItem('securityanswers')
	localStorage.removeItem('loggedIn')
	localStorage.removeItem('gamesWon')
	localStorage.removeItem('gamesLost')
	localStorage.removeItem('highScore')
	localStorage.removeItem('playerColor')
	localStorage.removeItem('viewMode')
	localStorage.removeItem('volume')
	
	localStorage["names"] = JSON.stringify(userName);
	localStorage["usernames"] = JSON.stringify(userUsername);
	localStorage["passwords"] = JSON.stringify(userPassword);
	localStorage["securityquestions"] = JSON.stringify(userSecurityQuestion);
	localStorage["securityanswers"] = JSON.stringify(userSecurity);
	localStorage["loggedIn"] = JSON.stringify(userLoggedIn);
	localStorage["gamesWon"] = JSON.stringify(userGamesWon);
	localStorage["gamesLost"] = JSON.stringify(userGamesLost);
	localStorage["highScore"] = JSON.stringify(userHighScore);
	localStorage["playerColor"] = JSON.stringify(userColor);
	localStorage["viewMode"] = JSON.stringify(userViewMode);
	localStorage["volume"] = JSON.stringify(userVolume);
}

function deactivateAccount()
{
	var confirmation = confirm("Do you want to deactivate your account?");
	
	if(confirmation)
	{
		deleteUserData();
		showBanner();
	}
}


function deleteUserData()
{
	userName.splice(loggedInPosition, 1);
	userUsername.splice(loggedInPosition, 1);
	userPassword.splice(loggedInPosition, 1);
	userSecurityQuestion.splice(loggedInPosition, 1);
	userSecurity.splice(loggedInPosition, 1);
	userColor.splice(loggedInPosition, 1);
	userViewMode.splice(loggedInPosition, 1);
	userLoggedIn.splice(loggedInPosition, 1);
	userGamesLost.splice(loggedInPosition, 1);
	userGamesWon.splice(loggedInPosition, 1);
	userHighScore.splice(loggedInPosition, 1);
	userVolume.splice(loggedInPosition, 1);
	setOptionsLocalStorage();
}

function showBanner()
{
    var img = document.createElement("img");
	img.setAttribute("id", "banner-image");
    img.src = "images/webdev-images/banner.png";

    document.body.appendChild(img);
	
	interval = setInterval(moveImage, 20);
}

function moveImage()
{
	bannerPosition = bannerPosition + 10;
	
	if(bannerPosition > 1400)
	{
		clearInterval(interval);
		window.location.href = "index.html";
	}
		
	
	
		document.getElementById("banner-image").setAttribute("style" , "position : absolute; top : 400px; width : 450px; height : 100px; left : " + bannerPosition + "px;");
}

function setCurrentColor()
{
	colorSet = document.getElementById("color-list").value;
	
	userColor[loggedInPosition] = colorSet;
	setOptionsLocalStorage();
	getOptionsLocalStorage();
	
	
}

function setCurrentViewMode()
{
	viewSet = document.getElementById("play-mode-list").value;
	
	userViewMode[loggedInPosition] = viewSet;
	setOptionsLocalStorage();
	getOptionsLocalStorage();
	
	location.reload();
}

function setCurrentVolume()
{
	var volume = document.getElementById("volume-range").value;
	volume = volume / 100;
	userVolume[loggedInPosition] = volume;
	setOptionsLocalStorage();
	getOptionsLocalStorage();
}

function play()
{
	clearInterval(interval);
	audio.play();
}

function setVolume()
{
	audio.volume = userVolume[loggedInPosition];
}

function fade()
{
	var volume = userVolume[loggedInPosition];
	
	interval = setInterval(function()
	{
		audio.volume = volume;
		volume = volume - 0.01;
		volume = parseFloat(volume).toFixed(2);
		
		if(volume == 0)
		{
			pause();
			clearInterval(interval);
		}
	}, 10);
}

function pause()
{
	audio.pause();
}