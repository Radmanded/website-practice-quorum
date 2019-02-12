var shiftDown = false;

function setDate($) {
    //console.log('Retrieving updated time');
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'],
    d = new Date(),
    currentDate = days[d.getDay()] + ' | ' + d.getDate() + '&nbsp;' + months[d.getMonth()],
    mins = (d.getMinutes() > 9) ? d.getMinutes() : '0' + d.getMinutes(),
    currentTime = d.getHours() + ':' + mins,
    previousTime = $('.timeArea .time .timeInner').html();
    if (currentTime != previousTime) {
        $('.timeArea .time .timeInner').html(currentTime);
        $('#date').html(currentDate);
        $('#datemobile').html(currentDate);
    };
    var hours = new Date().getHours();
    var hours = (hours + 24) % 24;
    var mid = ' AM';
    if (hours == 0) { //At 00 hours show 12 am
        hours = 12;
    } else if (hours > 12) {
        hours = hours % 12;
        mid = ' PM';
    }
    $('#minutes').text(mins);
    $('#ampm').text(mid);
};

setDate($);

var toggle = true;

function setTime24() {
    var d = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
    });
    var parts = d.split(":");
    $('#hours').text(parts[0]);
    $('#minutes').text(parts[1]);
    $("#colon").css({
        visibility: toggle ? "visible" : "hidden"
    });
    $('#ampm').addClass('hidden');
    toggle = !toggle;
};

function setTime12() {
    var d = new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    });
    var parts = d.split(":");
    $('#hours').text(parts[0]);
    $("#colon").css({
        visibility: toggle ? "visible" : "hidden"
    });
    $('#ampm').removeClass('hidden');
    toggle = !toggle;
    setDate($);
};

var myVar12, myVar24;

$('#time').click(function (e) {
    e.preventDefault();
    var that = $(this);
    switch (that.data('switch')) {
        case 'a':
            console.log('Set Time to 24h');
            myVar24 = setInterval(setTime24, 500);
            clearInterval(myVar12);
            that.data('switch', 'b');
            break;
        case 'b':
            console.log('Set Time to 12h');
            //setTime12()
            myVar12 = setInterval(setTime12, 500);
            clearInterval(myVar24);
            that.data('switch', 'a');
            break;
    };
});

function search(query, engine) {
    query = query.replace(/ /g, '+', query);
    switch (engine) {
        case 'google':
        default:
            var url = 'https://google.com/search?q=' + query;
            break;
        case 'youtube':
            var url = 'https://www.youtube.com/results?search_query=' + query;
            break;
        case 'wiki':
            var url = 'https://en.wikipedia.org/w/index.php?search=' + query;
            break;
        case 'imdb':
            var url = 'https://www.imdb.com/find?q=' + query + '&s=tt';
            break;
    }

    if (!shiftDown) {
        window.location.replace(url);
    } else {
        $('<a>').attr('href', url).attr('target', '_blank')[0].click();
    }
}

$(function () {

    $('.flexbox input, .flexbox select').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var x;
            x = document.getElementById("flexbox-input").value;
            if (x == "") {
                $('#inputlabel').removeClass('t-md-hidden t-top-hidden');
                document.getElementById("flexbox-input").focus();
                return false;
            };
            var query = $('.flexbox input').val();
            var engine = $('.flexbox select option:selected').val();
            search(query, engine);
        }
    });

    $('#searchsubmit').click(function (e) {
        e.preventDefault();
        var x;
        x = document.getElementById("flexbox-input").value;
        if (x == "") {
            $('#inputlabel').removeClass('t-md-hidden t-top-hidden');
            document.getElementById("flexbox-input").focus();
            return false;
        };
        var query = $('.flexbox input').val();
        var engine = $('.flexbox select option:selected').val();
        search(query, engine);
    });

    $('.flexbox input').keypress(function (e) {
        $('#searchsubmit').removeClass('hidden');
        $('#searchclear').removeClass('hidden');
        //$('#background').addClass('darkfilter');
        $('#background').addClass('js-blur');
        $('#searchbutton').addClass('lightfilter');
        $('#info').addClass('darkfilter');
        $('#fw-container').addClass('darkfilter');
        $('#footer').addClass('darkfilter');
        $('#inputlabel').addClass('t-md-hidden t-top-hidden');
        $('#suggestions-container').removeClass('hidden');
    });

    $("#searchclear").click(function () {
        $("#flexbox-input").val('');
        $('#searchclear').addClass('hidden');
        $('#searchsubmit').addClass('hidden');
        $('#suggestions-container').addClass('hidden');
        $('#inputlabel').addClass('t-md-hidden t-top-hidden');
        document.getElementById("flexbox-input").focus();
    });

    $('#background').click(function (e) {
        //$('#background').removeClass('darkfilter');
        $('#background').removeClass('js-blur');
        $('#info').removeClass('darkfilter');
        $('#fw-container').removeClass('darkfilter');
        $('#footer').removeClass('darkfilter');
        $('#searchbutton').removeClass('lightfilter');
        $('#suggestions-container').addClass('hidden');
        $('#inputlabel').addClass('t-md-hidden t-top-hidden');
    });

    $('body').click(function (e) {
        $('#help').addClass('hidden');
    });

    $('body').keydown(function (e) {
        if (e.keyCode == 191 && e.shiftKey) {
            $('#help').removeClass('hidden');
        }
    });

    $('#helpclear').click(function (e) {
        $('#help').addClass('hidden');
    });

});
