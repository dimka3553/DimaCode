let current;

document.onpointerdown = function (event) {
    if (current) {
        const remove = current;
        current = null;
        setTimeout(function () {
            if (remove.parentNode) remove.parentNode.removeChild(remove);
        }, 800);
    }

    let target = event.target;
    while (target && target.classList && !target.classList.contains("ripple")) target = target.parentNode;
    if (!target || !target.classList || !target.classList.contains("ripple")) return;

    const x = event.x - target.getBoundingClientRect().left;
    const y = event.y - target.getBoundingClientRect().top;
    const maxW = Math.max(x, target.offsetWidth - x);
    const maxH = Math.max(y, target.offsetHeight - y);
    const size = Math.sqrt(maxW * maxW + maxH * maxH);

    const parent = document.createElement("div");
    parent.style.position = "absolute";
    parent.style.top = "0";
    parent.style.right = "0";
    parent.style.bottom = "0";
    parent.style.left = "0";
    parent.style.overflow = "hidden";
    parent.style.borderRadius = "inherit";
    parent.style.transform = "perspective(0)";
    target.appendChild(parent);

    const effect = document.createElement("div");
    effect.style.position = "absolute";
    effect.style.top = (y - size) + "px";
    effect.style.left = (x - size) + "px";
    effect.style.height = size * 2 + "px";
    effect.style.width = size * 2 + "px";
    effect.style.background = "rgba(0, 0, 0, 0.08)";
    effect.style.borderRadius = "50%";
    effect.style.transform = "scale(0)";
    effect.style.transition = "opacity 300ms, transform 300ms";
    parent.appendChild(effect);

    current = parent;

    const timeout = setTimeout(function () {
        effect.style.transform = "scale(1)";
    }, 16);

    document.onpointerup = document.onpointercancel = function () {
        document.onpointerup = document.onpointercancel = document.onpointermove = null;
        current.firstChild.style.opacity = "0";
    };

    document.onpointermove = function (move) {
        if (event.x - move.x > 4 || event.x - move.x < -4 || event.y - move.y > 4 || event.y - move.y < -4) {
            clearTimeout(timeout);
            document.onpointercancel();
        }
    };
};


function sideExpand(){
	$(".hamburger-svg").toggleClass("opened");
	$(".sidebar").toggleClass("retracted");
	$(".overlayside").toggleClass("inactive");
	$("body").toggleClass("of-hidden");
	$("html").toggleClass("of-hidden")
}

function searchExpand(){
	$(".nav").toggleClass("search");
	$(".search-tab").toggleClass("inactive");
	$(".searchbar").val("");
	$(".searchbar").focus();
	$("body").toggleClass("of-hidden");
	$("html").toggleClass("of-hidden")
}
function searchRetract(){
	$(".nav").toggleClass("search");
	$(".search-tab").toggleClass("inactive");
	$(".searchbar").val("");
	$("body").toggleClass("of-hidden");
	$("html").toggleClass("of-hidden")
}

function followExpand(){
	$(".overlayfollow").toggleClass("inactive");
	$(".following").toggleClass("retracted");
	$("body").toggleClass("of-hidden");
	$("html").toggleClass("of-hidden")
}

function profileExpand(){
	$(".overlayprofile").toggleClass("inactive");
	$(".profile").toggleClass("retracted");
	$("body").toggleClass("of-hidden");
	$("html").toggleClass("of-hidden")
}

function loginExpand(){
    $(".overlaylogin").toggleClass("inactive");
    $(".login").toggleClass("retracted");
    $("body").toggleClass("of-hidden");
    $("html").toggleClass("of-hidden");
    $("#uninp").focus();
}

function loginRetract(of){
    $(".overlaylogin").addClass("inactive");
    $(".login").addClass("retracted");
    if(of == 1){
        $("body").addClass("of-hidden");
        $("html").addClass("of-hidden");
    }
    else{
        $("body").removeClass("of-hidden");
        $("html").removeClass("of-hidden");
    }
}
function verifExpand(){
    var of = 1;
    $(".overlayverif").removeClass("inactive");
    $(".unverified").removeClass("retracted");
    $("body").addClass("of-hidden");
    $("html").addClass("of-hidden");
   loginRetract(of);
}
function verifRetract(){
    $(".overlayverif").addClass("inactive");
    $(".unverified").addClass("retracted");
    $("body").removeClass("of-hidden");
    $("html").removeClass("of-hidden");
    loginRetract();
}
function verifemailToggle(){
    $(".ver-title").toggleClass("m-l-60 m-l-neg");
    $(".ver-icon").toggleClass("m-l-10 m-l-neg");
    $(".ver-menu").toggleClass("m-l-neg");
}
function resetpassToggle(){
    $(".log-title").toggleClass("m-l-60 m-l-neg");
    $(".log-icon").toggleClass("m-l-10 m-l-neg");
    $(".log-menu").toggleClass("m-l-neg");
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$("#uninp").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        $("#uninp").blur();
        sendLogin();
    }
    email = $("#uninp").val();
    if (validateEmail(email)) {
        $("#resPassEm").val(email);
    } else{
        $("#resPassEm").val("");
    }
});
$("#pwdinp").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        $("#pwdinp").blur();
        sendLogin();
    }
});
