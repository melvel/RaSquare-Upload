<DOCTYPE! html>
	<head>
		<title>
			RaSquare - Game
		</title>
	
		<link rel="stylesheet" type="text/css" href="css/pages-style/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages-style/game-start-style.css"/>
		<script  type="text/javascript" src="javascript/accountLogOut.js"></script>
		<script  type="text/javascript" src="javascript/scriptGame.js"></script>
		
		<script type="text/javascript" src="javascript/JQuery.js"></script>
	</head>
	
	<body onload="setSessionStorage(); buildTrack(); startMovementReading();">
		<?php
			include('header.php');
			outputBannerNavigation("Start Game");
		?>
		
			<audio id="audio-background">
				<source id="audio-source">
			</audio>
			
			<div class="page-body">
				<div id="game-panel">
					<div id="racing-square">
					</div>
				</div>
				
				<div id="ranks-panel">
					<div class="rank-set">
						<div class="rank-title">
							<span>Time:</span>
						</div>
						
						<div class="rank-result">
							<span id="rank-time">01:26</span>
						</div>
					</div>
					
					<div class="rank-set">
						<div class="rank-title">
							<span>Points:</span>
						</div>
						
						<div class="rank-result">
							<span id="rank-points">3</span>
						</div>
					</div>
					
					<div class="rank-set">
						<div class="rank-title">
							<span>Level:</span>
						</div>
						
						<div class="rank-result">
							<span id="rank-level">1</span>
						</div>
					</div>
				</div>
				
				<?php
					outputFooter();
				?>
			</div>
		</div>
	</body>
</html>