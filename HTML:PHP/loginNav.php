<div class="overlaylogin overlay inactive" onclick="loginRetract()"></div>
<div class="login r-tab popup retracted">
	<div class="topbar">
		<div class="icon-btn log-icon ab-l-m m-l-10 ripple hamb-menu noselect" onclick="loginRetract()">
			<svg class="hamburger-svg opened noselect" width="30" height="30" viewBox="0 0 100 100">
				<path class="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
				<path class="hamburger-line hamburger-line2" d="M 20,50 H 80" />
				<path class="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
			</svg>
		</div>
		<div class="title log-title ab-l-m fs-22 t-g m-l-60 trans-0-2 f-rob noselect">
			Log in
		</div>
		<div class="icon-btn log-icon trans-0-2 ab-l-m m-l-neg ripple hamb-menu hidden noselect" onclick="resetpassToggle()">
			<svg class="ab-c-m" width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M8.99495 0.680703C9.24973 0.984339 9.23689 1.42347 8.98151 1.71137L8.89764 1.79291L3.65936 6.18802H19.9569C20.3566 6.18802 20.6869 6.48502 20.7391 6.87036L20.7463 6.97748C20.7463 7.41348 20.3929 7.76694 19.9569 7.76694H3.62883L8.92089 12.207C9.25489 12.4872 9.29846 12.9852 9.0182 13.3192C8.73794 13.6532 8.23999 13.6968 7.90599 13.4165L1.05206 7.66538C0.892071 7.53113 0.798722 7.34693 0.775686 7.15472C0.704584 6.90142 0.763432 6.62142 0.943999 6.41714L1.02881 6.33452L7.88274 0.583398C8.21674 0.303139 8.71469 0.346705 8.99495 0.680703Z" fill="#666666"/>
			</svg>
		</div>
		<div class="title log-title ab-l-m fs-22 t-g m-l-neg trans-0-2 f-rob noselect">
			Reset password
		</div>
	</div>
	<div class="menu log-menu p-t-20 p-l-20 p-r-20 trans-0-2 pos-a">
		<input class="login-inp" placeholder="Username/Email" type="email" name="uname" id="uninp">
		<input class="login-inp" placeholder="Password" type="password" name="pass" id="pwdinp">
		<div class="bottomlog">
			<a class="navlogintext ab-l-m" href="javascript:void(0)" onclick="resetpassToggle()">Forgot password?</a>
			<button onclick="sendLogin()" class="signup-btn p-l-20 p-r-20 p-t-2 ripple p-b-2 ab-r-m" type="button">Log in</button>
		</div>
	</div>
	<div class="menu log-menu p-t-20 p-l-20 p-r-20 m-l-neg trans-0-2 pos-a">
		<input class="login-inp" placeholder="Your email" type="email" name="uname" id="resPassEm">
		<div class="bottomlog">
			<button id="btnResetPwd"class="signup-btn p-l-20 p-r-20 p-t-2 ripple p-b-2 ab-r-m" type="button" onclick="resetPass()">Reset password</button>
		</div>
	</div>
</div>
<script type="text/javascript">
	$("#resPassEm").on('keyup', function (e) {
	    if (e.key === 'Enter' || e.keyCode === 13) {
	        $("#resPassEm").blur();
	        resetPass()
	    }
	});

	function sendLogin(){
		var autoHideErrorTimeout;
		$.ajax({
			url:"controllers/loginController.php",
			method:"POST",
			data:{
				username:$('#uninp').val(),
				password:$('#pwdinp').val()
			},
			dataType:"JSON",
			beforeSend: function(){
				try{
					autoHideErrorTimeout.clearTimeout();
				}catch{}
				displayLoadAlert("Attempting to log in");
			},
			success: function(data){
				var successCode = data[0];
				if (successCode == 0) { //Login successful
					displayError(data);
					setTimeout(() => { reloadPage() }, 10);
					function reloadPage(){
						location.reload();
					}
				} else if(successCode == 2){ //Verify needed
					hideErrors();
					displayError(data);
				}else{//Error
					displayError(data);
				}
			}
		});
	}
	function resetPass(){
		var autoHideErrorTimeout;
		$.ajax({
			url:"controllers/forgotPasswordController.php",
			method:"POST",
			data:{
				email:$('#resPassEm').val()
			},
			dataType:"JSON",
			beforeSend: function(){
				try{
					autoHideErrorTimeout.clearTimeout();
				}catch{}
				displayLoadAlert("Sending email");
			},
			success: function(data){
				displayError(data);
			}
		});
	}
</script>
