<?php
	function outputBannerNavigation($pageName)
	{
		echo '<div class="container">';
		echo '<div class="webpage-head">';
		echo '<img class="game-logo" src="images/webdev-images/navigation-logo.png"/>';
		echo '<ul class="navigation-bar">';
		
		$linkNames = array("Start Game", "Menu", "View Rankings", "Options", "Log Out");
		$linkAddresses = array("game-start.php", "game-menu.php", "game-rankings.php", "game-options.php", "index.html");
		
		for($i = 0; $i < count($linkNames); $i++)
		{
			echo '<li><a ';
			
			if($linkNames[$i] == $pageName)
			{
				echo 'class="selected"';
			}
			
			if($linkNames[$i] == "Start Game")
			{
				echo 'id="start-game-tag"';
			}
			
			echo 'href="#" onclick="loadToNextPage(\'' .$linkAddresses[$i]. '\');">' .$linkNames[$i]. '</a>';
		}
		
		echo '</ul>';
		echo '</div>';				
	}
	
	function outputFooter()
	{
		echo '<div class="game-full-logo">';
		echo '<img class="shuffling-images" src="images/webdev-images/rasquare-logo.png"/>';
		echo '</div>';
	}
?>