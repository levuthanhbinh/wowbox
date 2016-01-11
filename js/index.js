jQuery(document).ready(function () {
    $('#section-location-map').click(function () {
        $('#section-location-map').css("pointer-events", "auto");
    });

    $('#section-location-map').mouseleave(function() {
        $('#section-location-map').css("pointer-events", "none");
    });
});
