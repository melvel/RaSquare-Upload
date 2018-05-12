var elementType = ["username", "password"];
var values;
var elementChecked;
var processLogin;
var checkingCounter;

var username;
var pass;
var userPlacing;

var userUsername = new Array();
var userPassword = new Array();
var userLoggedIn = new Array();

function userLogin()
{	
	username = document.getElementById("login-username-textbox").value;
	pass = document.getElementById("login-password-textbox").value;
	
	
	values = [username, pass];
	checkingCounter = 0;
	processLogin = true;
	elementChecked = false;
	
	do{
		if(processLogin == true)
		{
			if(checkingCounter == 0)
			{
				checkUsername();
			}
			else if(checkingCounter == 1)
			{
				checkPassword();
			}
			else
			{
				userLoggedIn[userPlacing] = true;
				//bug saveItem
				//JSLibrary.registration.userNameExistsLogIn = false
				
				saveItem("loggedIn", JSON.stringify(userLoggedIn));
			
				location.href = "game-menu.php";
			}
		}
		
		checkingCounter++;
	}while(checkingCounter < 3);	
}

function checkUsername()
{
	var usernameFound = false;
	
	if("usernames" in localStorage)
	{
		getLoginLocalStorage();
		
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
		processLogin = true;
		//bug inputLoginErrorFound
		//inputLoginErrorFound("login-username-textbox", "Username does not exist.");
		//processLogin = false;
	}
	else
	{
		inputLoginErrorFound("login-username-textbox", "Username does not exist.");
		processLogin = false;
	}
}

function checkPassword()
{
	if(pass === userPassword[userPlacing])
	{
		processLogin = true;
	}
	else
	{
		inputLoginErrorFound("login-password-textbox", "Incorrect password.")
		processLogin = false;
	}
}

function inputLoginErrorFound(elementID, message)
{
	document.getElementById("error-message").innerHTML = message;
	document.getElementById(elementID).value = "";
	document.getElementById(elementID).focus();
	
}

function getLoginLocalStorage()
{
	userUsername = JSON.parse(localStorage.usernames);
	userPassword = JSON.parse(localStorage.passwords);
	userLoggedIn = JSON.parse(localStorage.loggedIn);
}

function saveItem(location, item){
	localStorage.setItem(location, item)
}