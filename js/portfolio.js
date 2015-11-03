function windowLoad() {
    var eMenu = document.querySelectorAll(".csstransforms ul li a");
    var eTop = document.querySelectorAll(".csstransforms .top");
    var eIntro = document.querySelectorAll(".csstransforms .menuLink");

    if (window.addEventListener) {
        for (i = 0; i < eMenu.length; i++) {
            eMenu[i].addEventListener("click", function (e) {
                e.preventDefault();
                scrollTo(this);
            });
        }

        for (i = 0; i < eTop.length; i++) {
            eTop[i].addEventListener("click", function (e) {
                e.preventDefault();
                scrollTo(this);
            });
        }

        eIntro[0].addEventListener("click", function (e) {
            e.preventDefault();
            scrollTo(this);
        });
        eIntro[0].addEventListener("mouseover", function (e) {
            e.preventDefault();
            linkExpand(this);
        });
        eIntro[0].addEventListener("mouseout", function (e) {
            e.preventDefault();
            linkDeflate(this);
        });
    }

    $(function () { //bootstrap dropdown toggle fade
        $('.dropdown-toggle').click(function () {
            $(this).next('.dropdown-menu').fadeToggle(500);
        });
    });
}

function scrollTo(elem) {
    if (elem.className === "top") {
        //window.scroll(0, 0); //instant scroll met js
        $('html, body').animate({scrollTop: $("body").offset().top}, 500); //scrollen met jQuery
    } else {
        var sClass = elem.className;
        sClass = sClass.replace("Link", "");
        var eContainer = document.getElementById(sClass);
        //window.scroll(0, findPos(eContainer)); //instant scroll met js
        $('html, body').animate({scrollTop: $(eContainer).offset().top}, 500); //scrollen met jQuery
    }
}

/*function findPos(elem) { //positie van element vinden om naar te scrollen met js
 var curtop = 0;
 if (elem.offsetParent) {
 do {
 curtop += elem.offsetTop;
 } while (elem = elem.offsetParent);
 return [curtop];
 }
 }*/

function linkExpand(elem) {
    var eParent = elem.parentNode;
    //eParent.style.background = "#4863A0";
    var eSibling = elem.nextSibling;
    eSibling.style.opacity = 1;
    eSibling.style.marginTop = "25px";


    //transitie via class verandering
    /*var sClass = eSibling.className;
     sClass = sClass.replace("fadeout","");
     sClass += " fadein";
     eSibling.className = sClass;*/
}

function linkDeflate(elem) {
    var eParent = elem.parentNode;
    //eParent.style.background = "rgba(255,0,0,0)";
    var eSibling = elem.nextSibling;
    eSibling.style.opacity = 0;
    eSibling.style.marginTop = "-35px";

    //transitie via class verandering
    /*var sClass = eSibling.className; 
     sClass = sClass.replace("fadein","");
     sClass += " fadeout";
     eSibling.className = sClass;*/
}