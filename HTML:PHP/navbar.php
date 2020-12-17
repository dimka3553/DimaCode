<!DOCTYPE html>
<html class="noselect">
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name='viewport' content='initial-scale=1, viewport-fit=cover'>
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<!-- Bootstrap CSS links-->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<!--Bootstrap glyphicons links--> 
		<link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Saira+Extra+Condensed:wght@600;700&display=swap" rel="stylesheet">
		<!--CSS file link-->
		<link rel="stylesheet" type="text/css" href="styles/styles.css">
		<link rel="stylesheet" type="text/css" href="styles/util.css">
		<link rel="stylesheet" type="text/css" href="styles/nav.css">
		<link rel="stylesheet" type="text/css" href="styles/anim.css">
	</head>

	<body>
		<div class="nav noselect <?php echo isset($_SESSION['id'])? '' : 'un' ?>loggedin">
			<div class="icon-btn ab-l-m m-l-10 ripple hamb-menu noselect" onclick="sideExpand()">
				<svg class="hamburger-svg noselect" width="30" height="30" viewBox="0 0 100 100">
					<path class="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
					<path class="hamburger-line hamburger-line2" d="M 20,50 H 80" />
					<path class="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
				</svg>
			</div>
			<a class="logo t-d-none ab-l-m m-l-60 noselect" href="/">
				Solvem
			</a>
			<?php if(isset($_SESSION['id'])): ?>
				<img class="nav-pr-pic ab-r-m m-r-15 noselect" src="images/profile-pics/1.png" onclick="profileExpand()">
				<div class="icon-btn followingbtn ab-r-m m-r-97 ripple noselect" onclick="followExpand()">
				    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					    <rect x="1" y="1" width="14" height="14" rx="2" stroke="#666666" stroke-width="2"/>
					    <rect x="5" y="5" width="14" height="14" rx="2" fill="white" stroke="#666666" stroke-width="2"/>
					    <line x1="12" y1="8" x2="12" y2="16" stroke="#666666" stroke-width="2"/>
					    <line x1="8" y1="12" x2="16" y2="12" stroke="#666666" stroke-width="2"/>
				    </svg>
			    </div>
				<div class="icon-btn followingbtn ab-r-m m-r-97 ripple noselect" onclick="followExpand()">
				    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					    <rect x="1" y="1" width="14" height="14" rx="2" stroke="#666666" stroke-width="2"/>
					    <rect x="5" y="5" width="14" height="14" rx="2" fill="white" stroke="#666666" stroke-width="2"/>
					    <line x1="12" y1="8" x2="12" y2="16" stroke="#666666" stroke-width="2"/>
					    <line x1="8" y1="12" x2="16" y2="12" stroke="#666666" stroke-width="2"/>
				    </svg>
			    </div>
			<?php else: ?>
				<a href="javascript:void(0)" class="navlogintext t-d-none ab-r-m m-r-110" onclick="loginExpand()">Log in</a>
				<a href="signup" class="ab-r-m m-r-15 signup-btn-a of-hidden">
					<button class="signup-btn ripple p-l-12 p-r-12 p-t-3 p-b-3 of-hidden">Sign up</button>
				</a>
			<?php endif; ?>
			<div class="icon-btn search-ic ab-r-m m-r-58 ripple noselect" onclick="searchExpand()">
				<svg class="icon" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="7.57172" cy="7.57172" r="6.57172" stroke="#666666" stroke-width="2"/>
					<line x1="10.94" y1="13.5447" x2="15.0125" y2="19.4311" stroke="#666666" stroke-width="2"/>
				</svg>
			</div>
		</div>

		<?php require_once __DIR__."/elements/sidebarNav.php" ?>
		<?php require_once __DIR__."/elements/searchbarNav.php" ?>

		<?php if(isset($_SESSION['id'])){
			require_once __DIR__."/elements/followingNav.php";
			require_once __DIR__."/elements/accountNav.php";
			require_once __DIR__."/elements/settingsNav.php";
		}
		else{
			require_once __DIR__."/elements/loginNav.php";
		} ?>
		<script src="scripts/anim.js"></script>
		<script src="scripts/errorcontroller.js"></script>