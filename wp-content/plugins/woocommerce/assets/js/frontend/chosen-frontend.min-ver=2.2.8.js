jQuery(function (a) {
    a("select.country_select, select.state_select").chosen({search_contains: !0}), a("body").bind("country_to_state_changed", function () {
        a("select.state_select").chosen().trigger("chosen:updated")
    })
});