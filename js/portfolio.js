function windowLoad() {
    var eTop = document.querySelectorAll(".csstransforms .top");
    var eIntro = document.querySelectorAll(".csstransforms .topinfoLink");

    if (window.addEventListener) {

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

    if ($(window).width() > 749) {
        $("body").FancyIndex({//fancy index met positieindicatie
            scrollToDuration: 500
        });
    }

    if ($("html").hasClass("no-touchevents")) { //checkt op touchevent class van Modernizr

        new ScrollFlow();

        skillbarAnimate(1000, 500);
        $(window).on("scroll", function (e) {
            e.stopPropagation();
            skillbarAnimate(1000, 500);
        });

    } else {
        $("#esKju-fancyIndex li").addClass("active");
    }

    if ($(window).width() < 750) {
        //bootstrap aanpassing aan knoppen contactform enkel voor kleine schermen
        $("#frmknoppen").html("<div class='row'>" +
                "<input type='hidden' name='_next' value='#contact' />" +
                "<div class='col-xs-6'>" +
                "<input class='btn btn-default col-xs-12' type='submit' name='Verzenden' value='verzenden'>" +
                "</div>" +
                "<div class='col-xs-6'>" +
                "<input class='btn btn-default col-xs-12' type='reset' value='verwijderen'>" +
                "</div>" +
                "</div>");

        var bg = $("#intro_back");

        bg.css("background-attachment", "scroll");

        jQuery(window).resize("resizeBackground");
        function resizeBackground() {
            bg.height(jQuery(window).height() + 60);
        }
        resizeBackground();
    }



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

function skillbarAnimate(scrolldownTime, scrollupTime) {
    var windowTop = $(window).scrollTop();
    var windowHalf = windowTop + ($(window).height() / 4) * 3;
    var skillTop = $("#skills").offset().top;
    animationDone = false;
    if (windowHalf >= skillTop) {
        
        $("#skillbar1").animate({width: "95%"}, scrolldownTime);
        $("#skillbar2").animate({width: "95%"}, scrolldownTime);
        $("#skillbar3").animate({width: "90%"}, scrolldownTime);
        $("#skillbar4").animate({width: "90%"}, scrolldownTime);
        $("#skillbar5").animate({width: "80%"}, scrolldownTime);
        $("#skillbar6").animate({width: "70%"}, scrolldownTime);
        $("#skillbar7").animate({width: "70%"}, scrolldownTime);
        $("#skillbar8").animate({width: "60%"}, scrolldownTime);
        $("#skillbar9").animate({width: "50%"}, scrolldownTime);
    } else {
        $(".skillbar").stop(true, false);
        $(".skillbar").css("width", "0%");
    }
}