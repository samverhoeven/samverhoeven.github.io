function windowLoad() {
    var eMenu = document.querySelectorAll(".csstransforms ul li a");
    var eTop = document.querySelectorAll(".csstransforms .top");
    var eIntro = document.querySelectorAll(".csstransforms .infoLink");

    if ($(window).width() > 750) {

        $.scrollify({ //scroll snap per section
            section: "section"
        });

        $("body").FancyIndex({ //fixed index met positieindicatie
            firstOnly: true,
            scrollToDuration: 500
        });
    }

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

    $("#contactform").submit(function (e) {
        e.preventDefault();
    });
    $("#contactform").validate({
        debug: true,
        rules: {
            name: "required",
            _replyto: {
                required: true,
                email: true
            },
            message: "required"
        },
        messages: {
            name: "Vul uw naam in",
            _replyto: {
                required: "Vul uw emailadres in",
                email: "Vul een geldig emailadres in"
            },
            message: "Zet iets in uw bericht"
        },
        submitHandler: function (form) {
            form.submit();
        }
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

function linkExpand(elem) {
    var eParent = elem.parentNode;
    var eSibling = elem.nextSibling;
    eSibling.style.opacity = 1;
    eSibling.style.marginTop = "25px";

}

function linkDeflate(elem) {
    var eParent = elem.parentNode;
    var eSibling = elem.nextSibling;
    eSibling.style.opacity = 0;
    eSibling.style.marginTop = "-35px";
}