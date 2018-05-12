var elementType = ["password"];
var values;
var valuesLength = [6];
var elementChecked;
var processRenewal;
var checkingCounter;
var name;
var username;
var pass;
var passconf;
var securityQuestion;
var security;
var userPlacing;

var userName = new Array();
var userUsername = new Array();
var userPassword = new Array();
var userSecurityQuestion = new Array();
var userSecurity = new Array();

function validateForgot()
{	
	username = document.getElementById("username-textbox").value;
	securityQuestion = document.getElementById("security-list").value;
	security = document.getElementById("security-textbox").value;
	
	checkingCounter = 0;
	processRenewal = true;
	
	do{
		if(processRenewal == true)
		{
			if(checkingCounter == 0)
			{
				checkChosenQuestion();
			}
			else if(checkingCounter == 1)
			{
				checkForgotUsername();
			}
			else if(checkingCounter == 2)
			{
				checkForgotSecurityQuestion();
			}
			else if(checkingCounter == 3)
			{
				checkForgotSecurityAnswer();
			}
			else
			{
				document.getElementById("status-message").innerHTML = "Input new password.";
				document.getElementById("status-message").setAttribute("style", "color : green;");
				disablePasswordArea(false);
			}
		}
		
		checkingCounter++;
	}while(checkingCounter < 5);	
}

function validateNewPassword()
{
	checkingCounter = 0;
	processRenewal = true;
	elementChecked = false;
	
	do
	{
		if(processRenewal == true)
		{
			if(checkingCounter == 0)
			{
				pass = document.getElementById("password-textbox").value;
				passconf = document.getElementById("confirm-password-textbox").value;
				values = [pass];
				
				checkLengths();
			}
			else if(checkingCounter == 1)
			{
				checkPasswordConfirmation();
			}
			else if(checkingCounter == 2)
			{
				//bug changePassword
				/*
				JSLibrary.forgot.usernameExists = false
				JSLibrary.forgot.invalidSecurityQuestion = true
				JSLibrary.forgot.invalidSecurityAnswer = true
				*/
				
				changePassword();
			}
			else
			{
				storeForgotLocalStorage();
				document.getElementById("status-message").innerHTML = "New Password confirmed.";
				document.getElementById("status-message").setAttribute("style", "color : green;");
				disablePasswordArea(true);
				document.getElementById("forget-form").reset();
			}
		}
		
		checkingCounter++;
	}while(checkingCounter < 4);
}

function checkForgotUsername()
{
	var usernameFound = false;
	
	if("usernames" in localStorage)
	{
		getForgotLocalStorage();
		
		for(i = 0; i < userUsername.length; i++)
		{
			if(username === userUsername[i])
			{
				usernameFound = true;
				userPlacing = i;
				break;
			}
		}
	}
	
	if(usernameFound == true)
	{
		processRenewal = true;
		
		//bug inputForgotErrorFound
		//inputForgotErrorFound("username-textbox", "Username does not exist.")
	}
	else
	{
		inputForgotErrorFound("username-textbox", "Username does not exist.");
		processRenewal = false;
	}
}

function checkForgotSecurityQuestion()
{
	
	if(securityQuestion === userSecurityQuestion[userPlacing])
	{
		processRenewal = true;
		//bug checkForgotSecurityQuestion
		//processRenewal = false;
	}
	else
	{
		document.getElementById("status-message").innerHTML = "Incorrect Security Question.";
		document.getElementById("status-message").setAttribute("style", "color : red;");
		document.getElementById("security-list").focus();
		processRenewal = false;
	}
}

function checkForgotSecurityAnswer()
{
	if(security === userSecurity[userPlacing])
	{
		processRenewal = true;
		//bug checkForgotSecurityAnswer
		//processRenewal = false;
	}
	else
	{
		inputForgotErrorFound("security-textbox", "Incorrect security answer.")
		processRenewal = false;
	}
}

function checkLengths()
{
	for(i = 0; i < values.length; i++)
	{
		elementChecked = checkElementLength(values[i], valuesLength[i]);
		
		if(elementChecked == false)
		{
			inputForgotErrorFound(elementType[i] + "-textbox", elementType[i] + " should be longer than " + valuesLength[i] + " characters.");
			processRenewal = false;
			break;
		}
	}
}

function checkElementLength(valueOfElement, minLength)
{
	if(valueOfElement.length < minLength)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function checkPasswordConfirmation()
{
	if(pass === passconf)
	{
		processRenewal = true;
	}
	else
	{
		processRenewal = false;
		inputForgotErrorFound("password-textbox", "Passwords did not match.");
		document.getElementById("confirm-password-textbox").value = "";
	}
}

function checkChosenQuestion()
{
	if(securityQuestion == "")
	{
		processRenewal = false;
		document.getElementById("status-message").innerHTML = "Choose a Security Question.";
		document.getElementById("status-message").setAttribute("style", "color : red;");
		document.getElementById("security-list").focus();
	}
}

function inputForgotErrorFound(elementID, message)
{
	document.getElementById("status-message").innerHTML = message;
	document.getElementById("status-message").setAttribute("style", "color : red;");
	document.getElementById(elementID).value = "";
	document.getElementById(elementID).focus();
	
}

function storeForgotLocalStorage()
{
	saveItem("passwords", JSON.stringify(userPassword));
}

function getForgotLocalStorage()
{
	userName = JSON.parse(localStorage.names);
	userUsername = JSON.parse(localStorage.usernames);
	userPassword = JSON.parse(localStorage.passwords);
	userSecurityQuestion = JSON.parse(localStorage.securityquestions);
	userSecurity = JSON.parse(localStorage.securityanswers);
}

function disablePasswordArea(inactive)
{	
	document.getElementById("username-textbox").disabled = !inactive;
	document.getElementById("security-list").disabled = !inactive;
	document.getElementById("security-textbox").disabled = !inactive;
	
	document.getElementById("password-textbox").disabled = inactive;
	document.getElementById("confirm-password-textbox").disabled = inactive;
	document.getElementById("change-password-button").disabled = inactive;
	
	if(inactive == true)
	{
		document.getElementById("change-password-button").setAttribute("style", "color : white;");	
		document.getElementById("validate-details-button").setAttribute("style", "color : black;");
	}
	else
	{
		document.getElementById("change-password-button").setAttribute("style", "color : black;");
		document.getElementById("validate-details-button").setAttribute("style", "color : white;");
	}	
	
	document.getElementById("status-part").setAttribute("style", "margin-left : 350px;");
}

function changePassword()
{
	userPassword[userPlacing] = document.getElementById("password-textbox").value;
}


function saveItem(location, item){
	localStorage.setItem(location, item)
}