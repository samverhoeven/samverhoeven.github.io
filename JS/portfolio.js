function windowLoad() {
    //var aLinks = [];
    var eMenu = document.querySelectorAll("#menu ul li a");
    
    for (i = 0; i < eMenu.length; i++) {
        eMenu[i].addEventListener("click", function (e) {
            e.preventDefault();
            scrollTo(this);
            console.log(this);
        });
    }
}

function scrollTo(elem) {
    
    var sId = elem.id;
    sId = sId.replace("Link","");
    console.log(sId);
    var eContainer = document.getElementById(sId);
    console.log(eContainer);
    window.scroll(0,findPos(eContainer));
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

