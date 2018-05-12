var elementType = ["name", "username", "password", "security"];
var values;
var valuesLength = [3, 6, 6, 1];
var valuesMaxLength = [8, 12, 12, 20];
var elementChecked;
var processRegistration;
var checkingCounter;
var name;
var username;
var pass;
var passconf;
var securityQuestion;
var security;

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

function validateRegistration()
{	
	 
	name = document.getElementById("name-textbox").value;
	username = document.getElementById("username-textbox").value;
	pass = document.getElementById("password-textbox").value;
	passconf = document.getElementById("confirm-password-textbox").value;
	securityQuestion = document.getElementById("security-list").value;
	security = document.getElementById("security-textbox").value;
	values = [name, username, pass, security];
	checkingCounter = 0;
	processRegistration = true;
	elementChecked = false;
	
	do{
		if(processRegistration == true)
		{
			if(checkingCounter == 0)
			{
				checkLengths();
			}
			else if(checkingCounter == 1)
			{
				checkPasswordConfirmation();
			}
			else if(checkingCounter == 2)
			{
				checkChosenQuestion();
			}
			else if(checkingCounter == 3)
			{
				checkUsernameAvailability();
			}
			else
			{
				//bug registerNewAccount
				//JSLibrary.registration.securityQuestionChosen = false
				
				registerNewAccount();
				document.getElementById("register-form").reset();
			}
		}
		
		checkingCounter++;
	}while(checkingCounter < 5);	
}

function checkLengths()
{
	 
	for(i = 0; i < values.length; i++)
	{
		
		if(!checkElementLength(values[i], valuesLength[i], valuesMaxLength[i]))
		{
			inputtingErrorFound(elementType[i] + "-textbox", elementType[i] + " should be longer than " + valuesLength[i] + " characters and less than " + valuesMaxLength[i] + " characters.");
			processRegistration = false;
			break;
		}
	}
}

function checkElementLength(valueOfElement, minLength, maxLength)
{
	 
	 
	if(valueOfElement.length < minLength || valueOfElement.length > maxLength)
	{
		return false;
		//bug checkElementLength
		//return true
	}
	else
	{
		return true;
		//bug inputtingErrorFound
		//return false
	}
}

function checkPasswordConfirmation()
{
	 
	 
	if(pass === passconf)
	{
		processRegistration = true;
	}
	else
	{
		processRegistration = false;
		inputtingErrorFound(elementType[2] + "-textbox", "Passwords did not match.");
		document.getElementById("confirm-password-textbox").value = "";
	}
	
}

function checkChosenQuestion()
{
	 
	 
	if(securityQuestion == "")
	{
		processRegistration = false;
		document.getElementById("status-message").innerHTML = "Choose a Security Question.";
		document.getElementById("status-message").setAttribute("style", "color : red;");
		document.getElementById("security-list").focus();
	}
}

function checkUsernameAvailability()
{
	 
	 
	if("usernames" in localStorage)
	{
		getLocalStorage();
		
		for(i = 0; i < userUsername.length; i++)
		{
			if(username == userUsername[i])
			{
				inputtingErrorFound("username-textbox", "Please input another username since " + userUsername[i] + " is already being used.");
				processRegistration = false;
				break;
			}
		}
	}
}

function inputtingErrorFound(elementID, message)
{
	 
	document.getElementById("status-message").innerHTML = message;
	document.getElementById("status-message").setAttribute("style", "color : red;");
	document.getElementById(elementID).value = "";
	document.getElementById(elementID).focus();
	
}

function registerNewAccount()
{	
	 
	if("names" in localStorage)
	{
		getLocalStorage();
		storeLocalStorage();
	}
	else
	{
		storeLocalStorage();
	}
	
	
	document.getElementById("status-message").innerHTML = "Registration Successful"
	document.getElementById("status-message").setAttribute("style", "color : green;");
}

function storeLocalStorage()
{
	 
	userName.push(name);
	userUsername.push(username);
	userPassword.push(pass);
	userSecurityQuestion.push(securityQuestion);
	userSecurity.push(security);
	userLoggedIn.push(false);
	userGamesWon.push(0);
	userGamesLost.push(0);
	userHighScore.push(0);
	userColor.push("red");
	userViewMode.push("morning-mode");
	userVolume.push(1);
	
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

function getLocalStorage()
{
	 
	
	//bug getLocalStorage
	//localStorage.names = JSON.stringify([])
	
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