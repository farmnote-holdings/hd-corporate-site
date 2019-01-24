$(document).foundation();
$(function() {
    var map = $('iframe');
    map.css('pointer-events', 'none');
    $('#access').click(function() {
        map.css('pointer-events', 'auto');
    });
    map.mouseout(function() {
        map.css('pointer-events', 'none');
    })
})