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
    eIntro.addEventListener("mouseover",function(e){
        e.preventDefault();
        linkExpand(this);
    });
    eIntro.addEventListener("mouseout",function(e){
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

function linkExpand(elem){
    var eParent = elem.parentNode;
    eParent.style.background = "#4863A0";
    var eSibling = elem.nextSibling;
    eSibling.style.display = "block";
}

function linkDeflate(elem){
    var eParent = elem.parentNode;
    eParent.style.background = "black";
    var eSibling = elem.nextSibling;
    eSibling.style.display = "none";
}

