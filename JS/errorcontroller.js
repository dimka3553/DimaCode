function displayLoadAlert(p){
	hideErrors();
	appendAlert();
	//setTimeout(() => { appendAlert(); }, 205); This should only be done if there are errors
	function appendAlert(){
		var str = '<div class="alert g"><span class="p-txt ab-l-m m-l-15 t-w f-rob fs-16 ">'+p+'</span><div class="al-img ab-r-m"><img class="ab-c-m al-im" src="/images/gifs/spinner.gif"></div></div></div>';
		$("#alerts").append(str);
		setTimeout(() => { showAlert(); }, 10);
		function showAlert(){
			var temp = $("#alerts").children();
			$(temp[0]).addClass("active-1");
		}
	}
}
function displayError(data){
	hideErrors();
	setTimeout(() => { appendError(); }, 200);
	function appendError(){
		console.log(data);
		var counter = 0;
		for(var i = 0; i<data.length;i++){
			if(data[i] == 0){ //Green
				$("#alerts").append(`<div class="alert gr">
						<span class="p-txt ab-l-m m-l-15 t-w f-rob fs-16 ">`+data[i+1]+`</span>
						<div class="al-img ab-r-m">
							<svg class="ab-c-m al-im"width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="10" cy="10" r="10" fill="white"/>
								<path d="M5 11.5L9 15.5L15 5" stroke="#6CBB6B"/>
							</svg>
						</div>
					</div>`);
			}
			else if(data[i] == 1){ //Red
				$("#alerts").append(`<div class="alert r">
					<span class="p-txt ab-l-m m-l-15 t-w f-rob fs-16 al-txt ">`+data[i+1]+`</span>
					<div class="al-img ab-r-m">
						<svg class="ab-c-m al-im" fill="white" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
						</path></svg>
					</div>
				</div>`);
			}
			else if(data[i] == 2){ //Verif
				$('.overlayverif').remove();
				$('.unverified').remove();
				$('body').append(data[1]);
				setTimeout(() => { verifExpand(); }, 10);
				function verifExpand(){
					$(".unverified.retracted").removeClass("retracted");
				}
			}
			else{
				console.error(data[i+1] + " " + data[i]);
			}
			i++;
			
	}
		setTimeout(() => { showError(); }, 10);
		function showError(){
			var temp = $("#alerts").children();
			for(var i = 0; i<temp.length;i++){
				$(temp[i]).addClass("active-"+(i+1));
				counter++;
			}
			autoHideErrorTimeout = setTimeout(() => {  hideErrors(); }, counter*1500);
		}			
	}
}
function hideErrors(){
	var temp = $("#alerts").children();
	for(var i = 0; i<temp.length;i++){
		$(temp[i]).removeClass("active-"+(i+1));
	}
	if(temp.length != 0){
		setTimeout(() => { emptyAlerts(); }, 200);
	}else{
		emptyAlerts();
	}
	function emptyAlerts(){
		$("#alerts").empty();
	}
}