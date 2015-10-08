function windowLoad() {
    var eMenu = document.querySelectorAll("#menu ul li a");
    var eTop = document.querySelectorAll(".top");
    var eIntro = document.getElementById("menuLink");
    
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
            console.log(this);
        });
    }
    
    eIntro.addEventListener("click", function (e) {
        e.preventDefault();
        scrollTo(this);
        console.log(this);
    });
    eIntro.addEventListener("mouseover", function (e) {
        e.preventDefault();
        linkExpand(this);
    });
    eIntro.addEventListener("mouseout", function (e) {
        e.preventDefault();
        linkDeflate(this);
    });
}

function scrollTo(elem) {
    if (elem.className === "top") {
        console.log(elem.className);
        window.scroll(0, 0);
    } else {
        var sId = elem.id;
        sId = sId.replace("Link", "");
        var eContainer = document.getElementById(sId);
        window.scroll(0, findPos(eContainer));
    }
}

function findPos(elem) {
    var curtop = 0;
    if (elem.offsetParent) {
        do {
            curtop += elem.offsetTop;
        } while (elem = elem.offsetParent);
        return [curtop];
    }
}

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