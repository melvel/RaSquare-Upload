<DOCTYPE! html>
	<head>
		<title>
			RaSquare - Rankings
		</title>
	
		<link rel="stylesheet" type="text/css" href="css/pages-style/style.css"/>
		<link rel="stylesheet" type="text/css" href="css/pages-style/game-rankings-style.css"/>
		<script  type="text/javascript" src="javascript/accountLogOut.js"></script>
		<script  type="text/javascript" src="javascript/scriptRankings.js"></script>

		<script type="text/javascript" src="javascript/JQuery.js"></script>

	</head>
	
	<body onload="getRankingsData();">
		<?php
			include('header.php');
			outputBannerNavigation("View Rankings");
		?>
		
		<audio id="audio-background" autoplay loop>
			<source id="audio-source" src="sounds/game-rankings.mp3" type="audio/mpeg"/>
		</audio>
			
			<div class="page-body">
				<div id="rankings-section">
					<div id="rankings-header">
						<div class="rankings-title">
							<span>Player Name</span>
						</div>
						
						<div class="rankings-title">
							<span>Games Won</span>
						</div>
						
						<div class="rankings-title">
							<span>Games Lost</span>
						</div>
						
						<div class="rankings-title">
							<span>High Score</span>
						</div>
					</div>
					
					<div id="table-scroll">
						<table id="rankings-result" border="1">
						</table>
					</div>
				</div>
				
				<?php
					outputFooter();
				?>
				
				<div id="current-player-name">
					<span>Player Name</span>
				</div>
				
				<div id="current-wins-lost">
					<span>29/8</span>
				</div>
				
				<div id="current-high-score">
					<span>/954</span>
				</div>
			</div>
		</div>
	</body>
</html>