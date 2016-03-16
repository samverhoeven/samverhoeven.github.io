$(window).load(function () {
//$("#inhoud").rss("https://queryfeed.net/tw?q=%40sam_verhoeven").show();
    var access_token_fb = "438252053041957|IHjpcd9zGhWesX5EuwO2_77pOH8";
    var access_token_ig = "352219268.5ff0997.f0b46231d61849009717f1495bef453f";
    var fields = "message,created_time,picture";
    var since = "2016-03-01";

    $.when(getJSONResult("https://graph.facebook.com/cocacolabelgium/feed?fields=" + fields + "&since=" + since + "&access_token=" + access_token_fb),
            getJSONResult("https://graph.facebook.com/lipton/feed?fields=" + fields + "&since=" + since + "&access_token=" + access_token_fb),
            getJSONResult("https://graph.facebook.com/mcdonalds/feed?fields=" + fields + "&since=" + since + "&access_token=" + access_token_fb))
            .done(function (json1, json2, json3) {
                json1 = json1[0].data;
                json2 = json2[0].data;
                json3 = json3[0].data;
                var json = json1.concat(json2).concat(json3);
                json.sort(custom_sort);
                $.each(json, function (i, value) {
                    var time = value.created_time;
                    var inhoud = "";
                    inhoud += "<div class='post'><div class='datum'>" + i + 1 + ": " + value.created_time + "</div><div class='bericht'>";

                    if (value.picture != null) {
                        inhoud += "<img src=" + value.picture + " />";
                    }
                    if (value.message != null) {
                        inhoud += value.message + "</div>";
                    } else {
                        inhoud += "no message</div>";
                    }

                    inhoud += "</div>";
                    $("#inhoud").append(inhoud);
                });
            });
}); //einde window load

function getJSONResult(url) {
    return $.ajax({
        url: url,
        type: 'get',
        dataType: 'jsonp',
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Problem with call to get list of articles\n', errorThrown);
        },
        success: function (json) {
            console.log('call success, data is\n', json);
        }
    });
}
;
function custom_sort(a, b) {
    return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
}
;