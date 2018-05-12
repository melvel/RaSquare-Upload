<DOCTYPE! html>
	<head>
		<title>
			RaSquare - Menu
		</title>
	
		<link rel="stylesheet" type="text/css" href="css/pages-style/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages-style/game-menu-style.css"/>
		<script  type="text/javascript" src="javascript/accountLogOut.js"></script>
		<script  type="text/javascript" src="javascript/scriptMenu.js"></script>
		
		<script type="text/javascript" src="javascript/JQuery.js"></script>


	</head>

	<body onload="getSampleRanksData();startInstructions();">
		<audio id="audio-background" autoplay loop>
			<source id="audio-source" src="sounds/game-menu.mp3" type="audio/mpeg"/>
		</audio>
	
		<?php
			include('header.php');
			outputBannerNavigation("Menu");
		?>
			
			<div class="page-body">
				<div id="instructions-part">
					<div id="instructions-title">
						<span>Instructions</span>
					</div>
					
					<div id="instructions-panel">
					</div>
				</div>
				
				<div id="right-rankings">
					<div id="sample-rankings-title">
						<span>Rankings</span>
					</div>
					
					<div id="sample-rankings-results">
					</div>
				</div>
				
				<?php
					outputFooter();
				?>
			</div>
		</div>
	</body>
</html>