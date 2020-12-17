var d = new Date();
var changeTime = 1000;
var prevSel = "s";
var interval = 1000;
$(document).ready(function(){
    $("#timeInp").on("input", function(){
        var num = $(this).val();
        determineChange();
    });
    $("#timeSelect").change(function(){
    	var inpu = $('#timeInp').val();
        var ts = $(this).children("option:selected").val();

        if (prevSel == "s" && ts == "m"){
        	$("#timeInp").val(inpu/60);
        }
        if (prevSel == "m" && ts == "s"){
        	$("#timeInp").val(inpu*60);
        }
        if (prevSel == "s" && ts == "h"){
        	$("#timeInp").val(inpu/3600);
        }
        if (prevSel == "h" && ts == "s"){
        	$("#timeInp").val(inpu*3600);
        }
        if (prevSel == "s" && ts == "d"){
        	$("#timeInp").val(inpu/86400);
        }
        if (prevSel == "d" && ts == "s"){
        	$("#timeInp").val(inpu*86400);
        }
        if (prevSel == "m" && ts == "h"){
        	$("#timeInp").val(inpu/60);
        }
        if (prevSel == "h" && ts == "m"){
        	$("#timeInp").val(inpu*60);
        }
        if (prevSel == "m" && ts == "d"){
        	$("#timeInp").val(inpu/1440);
        }
        if (prevSel == "d" && ts == "m"){
        	$("#timeInp").val(inpu*1440);
        }
        if (prevSel == "h" && ts == "d"){
        	$("#timeInp").val(inpu/24);
        }
        if (prevSel == "d" && ts == "h"){
        	$("#timeInp").val(inpu*24);
        }
        prevSel = ts;
        determineChange();
    });
});
function determineChange(){
	var inp = $('#timeInp').val();
	var sel =  $("#timeSelect").val();

	if(sel == "s"){
		changeTime = inp*1000;
	}
	if(sel == "m"){
		changeTime = inp*60000;
	}
	if(sel == "h"){
		changeTime = inp*3600000;
	}
	if(sel == "d"){
		changeTime = inp*86400000;
	}
}


(function () {
    function newTime() {
    	if (changeTime == 0){
    		interval = 10;
    	}
    	if (changeTime < 100000 && changeTime > 0){
    		interval = (1000/(changeTime/1000))
    	}
    	else{
    		interval = 10;
    	}

    	var msD = Date.parse(d);
    	if (changeTime == 0){
    		d = d;
    	}
    	if (changeTime < 100000 && changeTime > 0){
    		d = new Date(msD + ((changeTime)/(changeTime/1000)));
    	}
    	else{
    		d = new Date(msD + (changeTime/100));
    	}
        
        t = setTimeout(function () {
            newTime();
            startTime();
        }, interval);
    }
    newTime();
})();

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}


function startTime() {
	h = checkTime(d.getHours()),
	m = checkTime(d.getMinutes()),
	s = checkTime(d.getSeconds());
	var y = d.getFullYear();
	var mon = d.getMonth();
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var lmonth = months[mon];
	var day = d.getDate();
	var date = (day + " " + lmonth + " " + y)
	if(h>9)
	document.getElementById("date").innerHTML = date;
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
}

(function (){
	function setInitialVars(){
		var days = DJ.length;
		var price = 30;
		var ran = 0;
		var change = 0;
		var prices = [];
		var dayCount = [];

		for (i = 0; i < days; i++) {
			ran = Math.floor(Math.random() * days);
			change = 1 + DJ[ran];
			price = price * change;
			prices.push(price);
			dayCount.push(i);
		}
	}
	setInitialVars();
})();
