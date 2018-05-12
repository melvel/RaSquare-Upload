<DOCTYPE! html>
	<head>
		<title>
			RaSquare - Game
		</title>
	
		<link rel="stylesheet" type="text/css" href="css/pages-style/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages-style/game-options-style.css"/>
		<script  type="text/javascript" src="javascript/accountLogOut.js"></script>
		<script  type="text/javascript" src="javascript/scriptOptions.js"></script>
		

		<script type="text/javascript" src="javascript/JQuery.js"></script>

	</head>
	
	<body onload="startOptions();">
		<?php
			include('header.php');
			outputBannerNavigation("Options");
		?>
			
			<div class="page-body">
				<div id="page-header">
					<div id="page-title">
						<span>Game Options</span>
					</div>
					
					<div id="page-username">
						<span></span>
					</div>
				</div>
				
				<div id="first-options">
					<div class="options-label">
						<span>Play Mode</span>
					</div>
					
					<div class="options-selection">
						<select id="play-mode-list" name="List Of Questions" onchange="setCurrentViewMode()">
							<option value="morning-mode">Morning Mode</option>
							<option value="night-mode">Night Mode</option>
							<option value="plain-mode">Plain</option>						
						</select>
					</div>
					
					<div class="options-label">
						<span>Player Colour</span>
					</div>
					
					<div class="options-selection">
						<select id="color-list" name="List Of Questions" onchange="setCurrentColor()">
							<option value="black">Black</option>
							<option value="blue">Blue</option>
							<option value="red">Red</option>
							<option value="yellow">Yellow</option>
							<option value="pink">Pink</option>
						</select>
					</div>
					
					<div class="options-label">
						<span>Game Volume</span>
					</div>
					
					<div class="sound-area">
						<input id="volume-range" type="range" min="0" max="100" onmousedown="play()" onkeydown="play()" onmouseup="fade()" onkeyup="fade()" oninput="setCurrentVolume(); setVolume();"/>
						<audio id="audio-background" loop>
							<source id="audio-source" src="sounds/game-background.mp3" type="audio/mpeg"/>
						</audio>
					</div>
				</div>
				
				<div id="second-options">
					<div id="home-form">
						<div id="form-activation">
							<input type="checkbox" id="account-modification" value="acmod" onchange=enableAccountModifications()>Modify Account Details</input>
						</div>
						
						<form id="account-change" onsubmit="return false;">
							<div class="left-form-label">
								<span>Name:</span>
								<span>Security Question:</span>
								<span>Security Answer:</span>
							</div>
							
							<div class="left-form-textbox">
								<input id="name-textbox" type="textbox"/>
								<select id="security-list" name="List Of Questions">
									<option value="">List of Questions</option>
									<option value="pet-question">First pet name?</option>
									<option value="car-question">First car?</option>
									<option value="mother-question">Mother's maiden name?</option>
									<option value="hobby-question">Favourite hobby?</option>
								</select>
								
								<input id="security-textbox" type="textbox"/>
								
							</div>
							
							<div class="right-form-label">
								<span>Current Password:</span>
								<span>New Password:</span>
								<span>Confirm Password:</span>
							</div>
							
							<div class="right-form-textbox">
								<input id="old-password-textbox" type="password"/>
								<input id="password-textbox" type="password"/>
								<input id="confirm-password-textbox" type="password"/>
							</div>
							
							<div id="options-button">
								<div id="save-part">
									<input id="save-button" type="button" value="Save Details" onclick="validateRegistrationModification()"/>
								</div>
							
								<div id="deactivation-part">
									<input id="deactivate-button" type="button" value="Deactivate Account" onclick="deactivateAccount()"/>
								</div>
							</div>
						</form>
					</div>
				</div>
				
				<?php
					outputFooter();
				?>
			</div>
		</div>
	</body>
</html>