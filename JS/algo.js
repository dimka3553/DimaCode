/*For future reference, time for students is stored in minutes since midnight*/


//vars for storing unmapped values
var house;
var form;
var order;
var arrivaltime;
var side;
var mealtype;

//vars used for mapping
var maphouses = ["Churchill's", "EDH", "Grove", "Ingram's", "MSH", "Moser's", "Oldham's", "Port Hill", "Radbrook", "Ridgemount", "Rigg's", "School House", "Severn Hill"];
var mapmealTypes=["Breakfast", "Lunch", "Supper", "Brunch"];
var mapforms=["3rd Form", "4th Form", "5th Form", "L6th Form", "U6 Form"];
var mapSides=["Chances", "Kingsland House"];

//vars for storing dates

var today = new Date();
var totmin = getMinsfrombegofday();  //minutes since beginning of the day
var dow = today.getDay();
var begofTime = new Date(0);
var daysfromBeg = daysdifference(begofTime, today);

//used for storing beginning time of next or ongoing meal

var mealTime;

//arrays for storing orders for each house

var initorder=[0,1,2,3,4,5,6,7,8,9,10,11,12]; //where each position represents each house
var houseorder
var queuePosofAllHouses=[0,1,2,3,4,5,6,7,8,9,10,11,12];
var queuePosofAllhouseNames=[0,0,0,0,0,0,0,0,0,0,0,0,0];

//arrays used for storing time

var formTimes; //for storing times of selected year group
var timetoAdd; //for storing how long the queue will last
var AllFormTimes=[0,0,0,0,0,0,0,0,0,0,0,0,0]

//              Sunday        Monday        Tuesday        Wednesday      Thursday        Friday        Saturday
var tFtimes=[[-1,675,1050],[435,740,1080],[435,740,1080],[420,715,1080],[420,715,1080],[435,740,1080],[435,740,1085]];
var fFtimes=[[-1,675,1050],[435,740,1080],[435,740,1080],[420,715,1080],[420,715,1080],[495,740,1080],[435,740,1095]];
var fiFtimes=[[-1,705,1080],[465,770,1110],[465,770,1110],[450,805,1110],[450,805,1110],[465,770,1110],[465,770,1105]];
var lsFtimes=[[-1,640,1085],[495,785,1115],[495,785,1115],[480,765,1115],[480,765,1115],[495,785,1115],[495,785,1115]];
var usFtimes=[[-1,640,1115],[495,815,1145],[495,815,1145],[480,755,1145],[480,755,1145],[495,815,1145],[495,815,1115]];
//ALGO BEGIN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function to get inputs and basic info

function getStudentValues(){
	role=$("#role").val();

	if(role==1){
		form = $("#ygroup").val()-1;
		house = $("#house").val()-1;
	}
	if(role == 2){
		form = $("#loc").val()-1;
		house=1;
	}

	today = new Date();
	totmin = getMinsfrombegofday();  //minutes since beginning of the day
	dow = today.getDay();
	begofTime = new Date(0);
	daysfromBeg = daysdifference(begofTime, today);

	//get the side
	if(form==0 || form==2 || form==4){
		side=0;
	}
	else{
		side=1;
	}

	//get time to add

	if(form==3 || form==4){
		timetoAdd=30;
	}
	else{
		timetoAdd=20;
	}
	houseorder=initorder[house];

	formTimes=determineFormTimes();
	determineNextMeal();
	detrmineOrder();
	mapOrdertoHouse();
	determineActualTime();
	mapVarsForDisplay();
	
}

//function to determine the what the next meal and time for given year group is

function determineNextMeal(){
	if(totmin>(formTimes[dow][2]+timetoAdd)){
		if(dow==6){
			mealtype=3;
			mealTime=formTimes[0][1];
		}
		else{
			mealtype=0;
			mealTime=formTimes[dow+1][0]
		}
	}
	if(totmin>(formTimes[dow][1]+timetoAdd)&&totmin<=(formTimes[dow][2]+timetoAdd)){
		mealtype=2;
		mealTime=formTimes[dow][2];
	}
	if(totmin>(formTimes[dow][0]+timetoAdd)&&totmin<=(formTimes[dow][1]+timetoAdd)){
		if(dow==0){
			mealtype=3;
		}
		else{
			mealtype=1;
		}
		mealTime=formTimes[dow][1];
	}
	if(totmin<(formTimes[dow][0]+timetoAdd)){
		mealtype=0;
		mealTime=formTimes[dow][0];
	}
}

function detrmineOrder(){
	queuePosofAllHouses=[0,1,2,3,4,5,6,7,8,9,10,11,12];
	var seed=100000-getSeed();

	for(var i=0; i<13; i++){
		queuePosofAllHouses[i]=(queuePosofAllHouses[i]+seed);

		if(form<3){
			if(mealtype==0 && totmin<600){
				queuePosofAllHouses[i]=queuePosofAllHouses[i]+2;
			}
			if(mealtype==1){
				queuePosofAllHouses[i] = queuePosofAllHouses[i]+1;
			}
			if(mealtype==2){
				queuePosofAllHouses[i] = queuePosofAllHouses[i];
			}
			if(mealtype == 3 && totmin<750){
				queuePosofAllHouses[i] = queuePosofAllHouses[i]+1;
			}
			if(mealtype==0 && totmin>700){
				queuePosofAllHouses[i]=queuePosofAllHouses[i]-1;
			}
			if(mealtype==3 && totmin>800){
				queuePosofAllHouses[i]=queuePosofAllHouses[i];
			}
		}
		else{
			if(mealtype==0 && totmin<600){
				queuePosofAllHouses[i]=queuePosofAllHouses[i]+2;
			}
			if(mealtype==1){
				queuePosofAllHouses[i] = queuePosofAllHouses[i]+1;
			}
			if(mealtype==2){
				queuePosofAllHouses[i] = queuePosofAllHouses[i];
			}
			if(mealtype == 3 && totmin<750){
				queuePosofAllHouses[i] = queuePosofAllHouses[i]+1;
			}
			if(mealtype==0 && totmin>700){
				queuePosofAllHouses[i]=queuePosofAllHouses[i]-1;
			}
			if(mealtype==3 && totmin>800){
				queuePosofAllHouses[i]=queuePosofAllHouses[i];
			}
		}
		queuePosofAllHouses[i] = queuePosofAllHouses[i] % 13;
	}
	houseorder = queuePosofAllHouses[house]
}

//function that puts houses in order

function mapOrdertoHouse(){
	for(b=0; b<13; b++){
		for(i=0; i<13; i++){
			if(queuePosofAllHouses[i]==b){
				queuePosofAllhouseNames[b]=b+1 +". " +maphouses[i]
			}
		}
	}
}


//function to determine the actual time

function determineActualTime(){
	if(form<3){
		AllFormTimes[0]=mealTime;
		var adder=2;
		for(var i=0; i<12;i++){
			mealTime=mealTime+adder;
			AllFormTimes[i+1]=mealTime;
			adder++
			if(adder>2){
				adder=1;
			}
		}
	}
	else{
		AllFormTimes[0]=mealTime;
		var adder=2;
		for(var i=0; i<12;i++){
			mealTime=mealTime+adder;
			AllFormTimes[i+1]=mealTime;
			adder++
			if(adder>3){
				adder=2;
			}
		}
	}
	mealTime=AllFormTimes[houseorder];
	console.log(AllFormTimes)
	console.log(mealTime)
}

//function for mapping variable to their displayed state

function mapVarsForDisplay(){
	if(role==1){
		var dismeal = mapmealTypes[mealtype];
		var dishouse = maphouses[house];
		var disform = mapforms[form];
		var disside = mapSides[side];
		var disorder = houseorder+1;
		var distime;
		
		distime = timeFormat(mealTime);

		
		$("#dismeal").html(dismeal);
		$("#dishouse").html(dishouse);
		$("#disform").html(disform);
		$("#disside").html(disside);
		
		

		$(".bigdate").html('KH Virtual Queue');
		$("#disAllOrder").html("")
		document.getElementById('disAllOrder').innerHTML +='<h3 class="fs-18 fw-500 m-b-8">The queue order for '+dismeal+' is:</h3>';
		for(var i=0; i<12;i++){
			document.getElementById('disAllOrder').innerHTML += '<div class="rowh pos-r"><span class="ab-l-m m-l-10 fs-16">'+ queuePosofAllhouseNames[i] +'</span><span class="ab-r-m m-r-10 fs-14 t-g">'+timeFormat(AllFormTimes[i])+'</span></div>'
		}
		document.getElementById('disAllOrder').innerHTML += '<div class="rowh b pos-r"><span class="ab-l-m m-l-10 fs-16">'+ queuePosofAllhouseNames[12] +'</span><span class="ab-r-m m-r-10 fs-14 t-g">'+timeFormat(AllFormTimes[12])+'</span></div>'
		if(form==3 && mealtype==0){
			var timebr
			var timebr2
			if(dow==0 || totmin>800){
				timebr=timeFormat(lsFtimes[dow+1][0]);
				timebr2=timeFormat(lsFtimes[dow+1][0]+15);
			}
			else{
				timebr=timeFormat(lsFtimes[dow][0]);
				timebr2=timeFormat(lsFtimes[dow][0]+15);
			}
			distime = timebr+" to "+timebr2;
			disorder = "Any"
			$("#disAllOrder").html("<span class='fs-16 lh-1-3'>There is no queue for Breakfast, arrive whenever you want.</span>");
			if(dow==5&&totmin<800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Today is Friday, this means that it could be Chapel day so breakfast could start at 7:15 and on Chances side.")
			}
			if(dow==4&&totmin>800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Tomorrow is Friday, this means that it could be Chapel day so breakfast could start at 7:15 and on Chances side.")
			}
		}
		if(form==4 && mealtype==0){
			var timebr
			var timebr2
			if(dow==0 || totmin>800){
				timebr=timeFormat(usFtimes[dow+1][0]);
				timebr2=timeFormat(usFtimes[dow+1][0]+15);
			}
			else{
				timebr=timeFormat(usFtimes[dow][0]);
				timebr2=timeFormat(usFtimes[dow][0]+15);
			}
			distime = timebr+" to "+timebr2;
			disorder = "Any"
			$("#disAllOrder").html("<span class='fs-16 lh-1-3'>There is no queue for Breakfast, arrive whenever you want.</span>");
			if(dow==5&&totmin<800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Today is Friday, this means that it could be Chapel day so breakfast could start at 7:15 and on Kingsland House side.");
			}
			if(dow==4&&totmin>800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Tomorrow is Friday, this means that it could be Chapel day so breakfast could start at 7:15 and on Kingsland House side.");
			}
		}
		if(dow==6 && mealtype==2){
			var timebr
			var timebr2
			$(".alerts").html("<div class='cont'><span class='fs-16'>On Saturday evening you can order takeaways, this means that you don't have to go to supper");
			disorder = "Any";
			$("#disAllOrder").html("<span class='fs-16 lh-1-3'>There is no queue on Saturday supper, you can arrive whenever you feel like it.</span>");
			if(form==0){
				timebr=timeFormat(tFtimes[dow][2]);
				timebr2=timeFormat(tFtimes[dow][2]+15);
			}
			if(form==1){
				timebr=timeFormat(fFtimes[dow][2]);
				timebr2=timeFormat(fFtimes[dow][2]+15);
			}
			if(form==2){
				timebr=timeFormat(fiFtimes[dow][2]);
				timebr2=timeFormat(fiFtimes[dow][2]+15);
			}
			if(form==3){
				timebr=timeFormat(lsFtimes[dow][2]);
				timebr2=timeFormat(lsFtimes[dow][2]+15);
			}
			if(form==4){
				timebr=timeFormat(usFtimes[dow][2]);
				timebr2=timeFormat(usFtimes[dow][2]+15);
			}
			distime = timebr+" to "+timebr2;
		}
		$("#disorder").html(disorder);
		$("#distime").html(distime);
	}
	else{
		var dismeal = mapmealTypes[mealtype];
		var disform = mapforms[form];
		var disside = mapSides[side];

		$("#supTitle").html(disside + ", " + disform + " - " +dismeal);

		$("#disAllOrderSup").html("")
		document.getElementById('disAllOrderSup').innerHTML +='<h3 class="fs-18 fw-500 m-b-8">The queue order for '+dismeal+' is:</h3>';
		for(var i=0; i<12;i++){
			document.getElementById('disAllOrderSup').innerHTML += '<div class="rowh sup pos-r ripple of-hidden" onclick="addTick(this);"><span class="ab-l-m m-l-10 fs-16 trans-0-2">'+ queuePosofAllhouseNames[i] +'</span><span class="ab-r-m m-r-10 fs-14 t-g trans-0-2">'+timeFormat(AllFormTimes[i])+'</span><svg class="ab-r-m m-r-11 trans-0-2" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="trans-0-2" d="M1 10L6.5 19L14.5 1" stroke="transparent" stroke-width="2"/></svg></div>'
		}
		document.getElementById('disAllOrderSup').innerHTML += '<div class="rowh b sup pos-r ripple of-hidden" onclick="addTick(this);"><span class="ab-l-m m-l-10 fs-16 trans-0-2">'+ queuePosofAllhouseNames[12] +'</span><span class="ab-r-m m-r-10 fs-14 t-g trans-0-2">'+timeFormat(AllFormTimes[12])+'</span><svg class="ab-r-m m-r-11 trans-0-2" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="trans-0-2" d="M1 10L6.5 19L14.5 1" stroke="transparent" stroke-width="2"/></svg></div>'
		if(form==3 && mealtype==0){
			var timebr=timeFormat(lsFtimes[dow][0]);
			var timebr2=timeFormat(lsFtimes[dow][0]+15);
			distime = timebr+" to "+timebr2;
			disorder = "Any"
			$("#disAllOrderSup").html("<span class='fs-16 lh-1-3'>6th Form don't have to queue for breakfast, they can come in at any time within the designated time period</span>");
			if(dow==5&&totmin<800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Today 6th Form could be on the opposite side as every second Friday is Chapel day")
			}
			if(dow==4&&totmin>800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Tomorrow 6th Form could be on the opposite side as every second Friday is Chapel day")
			}
		}
		if(form==4 && mealtype==0){
			var timebr=timeFormat(usFtimes[dow][0]);
			var timebr2=timeFormat(usFtimes[dow][0]+15);
			distime = timebr+" to "+timebr2;
			disorder = "Any"
			$("#disAllOrderSup").html("<span class='fs-16 lh-1-3'>6th Form don't have to queue for breakfast, they can come in at any time within the designated time period</span>");
			if(dow==5&&totmin<800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Today 6th Form could be on the opposite side as every second Friday is Chapel day")
			}
			if(dow==4&&totmin>800){
				$(".alerts").html("<div class='cont'><span class='fs-16'>Tomorrow 6th Form could be on the opposite side as every second Friday is Chapel day")
			}
		}
		if(dow==6 && mealtype==2){
			var timebr
			var timebr2
			$(".alerts").html("<div class='cont'><span class='fs-16'>On Saturday evening students can order takeaways, this means that they don't have to go to dinner");
			disorder = "Any";
			
			if(form==0){
				timebr=timeFormat(tFtimes[dow][2]);
				timebr2=timeFormat(tFtimes[dow][2]+20);
			}
			if(form==1){
				timebr=timeFormat(fFtimes[dow][2]);
				timebr2=timeFormat(fFtimes[dow][2]+20);
			}
			if(form==2){
				timebr=timeFormat(fiFtimes[dow][2]);
				timebr2=timeFormat(fiFtimes[dow][2]+20);
			}
			if(form==3){
				timebr=timeFormat(lsFtimes[dow][2]);
				timebr2=timeFormat(lsFtimes[dow][2]+20);
			}
			if(form==4){
				timebr=timeFormat(usFtimes[dow][2]);
				timebr2=timeFormat(usFtimes[dow][2]+20);
			}
			var distime = timebr+" and "+timebr2;
			$("#disAllOrderSup").html('<span class="fs-16 lh-1-3">There are no queue postions on Saturday supper, thay will arrive between '+distime+'</span>');
		}
	}
}

//function to determine difference between 2 days

function daysdifference(firstDate, secondDate){
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
   
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / (1000 * 3600 * 24);
   
    return Math.floor(Math.abs(days));
}

//function to convert hours and minutes into minutes
function getMinsfrombegofday(){
	var h = today.getHours();
	var m = today.getMinutes();
	return((h*60)+m);
}

//function to determine times for selected form group
function determineFormTimes(){
	var t=[];
	if(form==0){
		t=tFtimes;
	}
	if(form==1){
		t=fFtimes;
	}
	if(form==2){
		t=fiFtimes;
	}
	if(form==3){
		t=lsFtimes;
	}
	if(form==4){
		t=usFtimes;
	}
	return(t);
}

//function to get the seed for lower years
function getSeed(){
   var tempTime = today.setHours(23,0,0,0);
   var totalSundays = 0;
   var notSundays = 0;
   var totalSaturdays = 0;
   var seed=0;
   for (var i = begofTime; i < today; i.setDate(i.getDate()+1)){
       if (i.getDay() == 0) totalSundays++;
       if (i.getDay() == 6) totalSaturdays++;
       else notSundays++;
   }
   if(form<3){
	   seed = (totalSundays*2)+(notSundays*3)+(totalSaturdays*2);
	}
	else{
		seed=(totalSundays*2)+(totalSaturdays*1)+(notSundays*2);
	}
	console.log("Sundays: "+totalSundays);
	console.log("Other days: "+notSundays);
	console.log("Saturdays: "+totalSaturdays);
	console.log(seed)
   return seed;
}
function checkTime(i) {
	return (i < 10) ? "0" + i : i;
}
function timeFormat(i){
	var h = checkTime(Math.floor(i/60));
	var m = checkTime(i-(h*60));
	var time = h +":" +m;
	return(time);
}

function addTick(i){
	$(i).toggleClass("active");
}