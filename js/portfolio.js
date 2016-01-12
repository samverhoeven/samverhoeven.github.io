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
        /*$.scrollify({//scroll snap per section
         section: "section"
         });*/
        /*var scrollorama = $.scrollorama({//animatie per scrollblock
         blocks: "section",
         enablePin: false
         });
         
         //#info scrollanimaties
         scrollorama.animate("#info .heading2", {duration: 500, delay: 100, property: "left", start: -300, end: 0, easing: "easeInOutCubic"});
         scrollorama.animate("#info .heading2", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         //scrollorama.animate("#info .tekst", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         scrollorama.animate("#info .tekst", {duration: 500, delay: 100, property: "top", start: 300, end: 0, easing: "easeInOutCubic"});
         
         //#skills scrollanimaties
         scrollorama.animate("#skills .heading2", {duration: 500, delay: 100, property: "right", start: -300, end: 0, easing: "easeInOutCubic"});
         scrollorama.animate("#skills .heading2", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         
         //#projecten scrollanimaties
         scrollorama.animate("#projecten .heading2", {duration: 500, delay: 100, property: "left", start: -300, end: 0, easing: "easeInOutCubic"});
         scrollorama.animate("#projecten .heading2", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         scrollorama.animate("#projecten .tekst", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         scrollorama.animate("#projecten .tekst", {duration: 500, delay: 100, property: "left", start: 500, end: 0, easing: "easeInOutCubic"});
         
         //#contact scrollanimaties
         //scrollorama.animate("#contact .h2", {duration: 500, delay: 100, property: "opacity", start: 0, end: 1, easing: "easeInOutCubic"});
         scrollorama.animate("#contact .heading2", {duration: 500, delay: 100, property: "left", start: -300, end: 0, easing: "easeInOutCubic"});
         scrollorama.animate("#contact form", {duration: 500, delay: 100, property: "opacity", start: 0.5, end: 1, easing: "easeInOutCubic"});
         scrollorama.animate("#contact form", {duration: 500, delay: 100, property: "top", start: 200, end: 0, easing: "easeInOutCubic"});*/

        new ScrollFlow();

        $(window).on("scroll", function () {
            var opacitystr = $("#skills .heading2").css("webkitFilter");
            var regExp = /\(([^)]+)\)/;
            var modopacitystr = regExp.exec(opacitystr);
            modopacitystr = modopacitystr[0].substring(1).slice(0, -1);
            console.log(modopacitystr);

            if (modopacitystr >= 0.95) {
                console.log("test skills heading opacity");
                $("#skillbar1").animate({width: "95%"}, 1000);
                $("#skillbar2").animate({width: "95%"}, 1000);
                $("#skillbar3").animate({width: "90%"}, 1000);
                $("#skillbar4").animate({width: "90%"}, 1000);
                $("#skillbar5").animate({width: "80%"}, 1000);
                $("#skillbar6").animate({width: "70%"}, 1000);
                $("#skillbar7").animate({width: "70%"}, 1000);
                $("#skillbar8").animate({width: "60%"}, 1000);
                $("#skillbar9").animate({width: "50%"}, 1000);
            } else {
                $(".skillbar").animate({width: "0%"}, 500);
            }
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