jQuery(function (a) {
    if ("undefined" == typeof wc_country_select_params)return !1;
    var b = wc_country_select_params.countries.replace(/&quot;/g, '"'), c = a.parseJSON(b);
    a("select.country_to_state, input.country_to_state").change(function () {
        var b = a(this).val(), d = a(this).closest("div").find("#billing_state, #shipping_state, #calc_shipping_state"), e = d.parent(), f = d.attr("name"), g = d.attr("id"), h = d.val(), i = d.attr("placeholder");
        if (c[b])if (0 === c[b].length)d.parent().hide().find(".chosen-container").remove(), d.replaceWith('<input type="hidden" class="hidden" name="' + f + '" id="' + g + '" value="" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")]); else {
            var j = "", k = c[b];
            for (var l in k)k.hasOwnProperty(l) && (j = j + '<option value="' + l + '">' + k[l] + "</option>");
            d.parent().show(), d.is("input") && (d.replaceWith('<select name="' + f + '" id="' + g + '" class="state_select" placeholder="' + i + '"></select>'), d = a(this).closest("div").find("#billing_state, #shipping_state, #calc_shipping_state")), d.html('<option value="">' + wc_country_select_params.i18n_select_state_text + "</option>" + j), d.val(h), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")])
        } else d.is("select") ? (e.show().find(".chosen-container").remove(), d.replaceWith('<input type="text" class="input-text" name="' + f + '" id="' + g + '" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")])) : d.is(".hidden") && (e.show().find(".chosen-container").remove(), d.replaceWith('<input type="text" class="input-text" name="' + f + '" id="' + g + '" placeholder="' + i + '" />'), a("body").trigger("country_to_state_changed", [b, a(this).closest("div")]));
        a("body").trigger("country_to_state_changing", [b, a(this).closest("div")])
    }).change()
});