/*!
 * Variations Plugin
 */
!function (a, b, c, d) {
    a.fn.wc_variation_form = function () {
        return a.fn.wc_variation_form.find_matching_variations = function (b, c) {
            for (var d = [], e = 0; e < b.length; e++) {
                {
                    var f = b[e];
                    f.variation_id
                }
                a.fn.wc_variation_form.variations_match(f.attributes, c) && d.push(f)
            }
            return d
        }, a.fn.wc_variation_form.variations_match = function (a, b) {
            var c = !0;
            for (var e in a)if (a.hasOwnProperty(e)) {
                var f = a[e], g = b[e];
                f !== d && g !== d && 0 !== f.length && 0 !== g.length && f !== g && (c = !1)
            }
            return c
        }, this.unbind("check_variations update_variation_values found_variation"), this.find(".reset_variations").unbind("click"), this.find(".variations select").unbind("change focusin"), $form = this.on("click", ".reset_variations", function () {
            a(this).closest(".variations_form").find(".variations select").val("").change();
            var b = a(this).closest(".product").find(".sku"), c = a(this).closest(".product").find(".product_weight"), d = a(this).closest(".product").find(".product_dimensions");
            return b.attr("data-o_sku") && b.text(b.attr("data-o_sku")), c.attr("data-o_weight") && c.text(c.attr("data-o_weight")), d.attr("data-o_dimensions") && d.text(d.attr("data-o_dimensions")), !1
        }).on("change", ".variations select", function () {
            $variation_form = a(this).closest(".variations_form"), $variation_form.find("input[name=variation_id]").val("").change(), $variation_form.trigger("woocommerce_variation_select_change").trigger("check_variations", ["", !1]), a(this).blur(), a().uniform && a.isFunction(a.uniform.update) && a.uniform.update()
        }).on("focusin touchstart", ".variations select", function () {
            $variation_form = a(this).closest(".variations_form"), $variation_form.trigger("woocommerce_variation_select_focusin").trigger("check_variations", [a(this).attr("name"), !0])
        }).on("check_variations", function (c, d, e) {
            var f = !0, g = !1, h = {}, i = a(this), j = i.find(".reset_variations");
            i.find(".variations select").each(function () {
                0 === a(this).val().length ? f = !1 : g = !0, d && a(this).attr("name") === d ? (f = !1, h[a(this).attr("name")] = "") : (value = a(this).val(), h[a(this).attr("name")] = value)
            });
            var k = parseInt(i.data("product_id")), l = i.data("product_variations");
            l || (l = b.product_variations.product_id), l || (l = b.product_variations), l || (l = b["product_variations_" + k]);
            var m = a.fn.wc_variation_form.find_matching_variations(l, h);
            if (f) {
                var n = m.shift();
                n ? (i.find("input[name=variation_id]").val(n.variation_id).change(), i.trigger("found_variation", [n])) : (i.find(".variations select").val(""), e || i.trigger("reset_image"), alert(wc_add_to_cart_variation_params.i18n_no_matching_variations_text))
            } else i.trigger("update_variation_values", [m]), e || i.trigger("reset_image"), d || i.find(".single_variation_wrap").slideUp(200);
            g ? "hidden" === j.css("visibility") && j.css("visibility", "visible").hide().fadeIn() : j.css("visibility", "hidden")
        }).on("reset_image", function () {
            var b = a(this).closest(".product"), c = b.find("div.images img:eq(0)"), e = b.find("div.images a.zoom:eq(0)"), f = c.attr("data-o_src"), g = c.attr("data-o_title"), h = c.attr("data-o_alt"), i = e.attr("data-o_href");
            f !== d && c.attr("src", f), i !== d && e.attr("href", i), g !== d && (c.attr("title", g), e.attr("title", g)), h !== d && c.attr("alt", h)
        }).on("update_variation_values", function (b, c) {
            $variation_form = a(this).closest(".variations_form"), $variation_form.find(".variations select").each(function (b, d) {
                current_attr_select = a(d), current_attr_select.data("attribute_options") || current_attr_select.data("attribute_options", current_attr_select.find("option:gt(0)").get()), current_attr_select.find("option:gt(0)").remove(), current_attr_select.append(current_attr_select.data("attribute_options")), current_attr_select.find("option:gt(0)").removeClass("active");
                var e = current_attr_select.attr("name");
                for (var f in c)if ("undefined" != typeof c[f]) {
                    var g = c[f].attributes;
                    for (var h in g)if (g.hasOwnProperty(h)) {
                        var i = g[h];
                        h == e && (i ? (i = a("<div/>").html(i).text(), i = i.replace(/'/g, "\\'"), i = i.replace(/"/g, '\\"'), current_attr_select.find('option[value="' + i + '"]').addClass("active")) : current_attr_select.find("option:gt(0)").addClass("active"))
                    }
                }
                current_attr_select.find("option:gt(0):not(.active)").remove()
            }), $variation_form.trigger("woocommerce_update_variation_values")
        }).on("found_variation", function (b, c) {
            var e = a(this), f = a(this).closest(".product"), g = f.find("div.images img:eq(0)"), h = f.find("div.images a.zoom:eq(0)"), i = g.attr("data-o_src"), j = g.attr("data-o_title"), k = g.attr("data-o_alt"), l = h.attr("data-o_href"), m = c.image_src, n = c.image_link, o = c.image_title, p = c.image_alt;
            e.find(".variations_button").show(), e.find(".single_variation").html(c.price_html + c.availability_html), i === d && (i = g.attr("src") ? g.attr("src") : "", g.attr("data-o_src", i)), l === d && (l = h.attr("href") ? h.attr("href") : "", h.attr("data-o_href", l)), j === d && (j = g.attr("title") ? g.attr("title") : "", g.attr("data-o_title", j)), k === d && (k = g.attr("alt") ? g.attr("alt") : "", g.attr("data-o_alt", k)), m && m.length > 1 ? (g.attr("src", m).attr("alt", p).attr("title", o), h.attr("href", n).attr("title", o)) : (g.attr("src", i).attr("alt", k).attr("title", j), h.attr("href", l).attr("title", j));
            var q = e.find(".single_variation_wrap"), r = f.find(".product_meta").find(".sku"), s = f.find(".product_weight"), t = f.find(".product_dimensions");
            r.attr("data-o_sku") || r.attr("data-o_sku", r.text()), s.attr("data-o_weight") || s.attr("data-o_weight", s.text()), t.attr("data-o_dimensions") || t.attr("data-o_dimensions", t.text()), r.text(c.sku ? c.sku : r.attr("data-o_sku")), s.text(c.weight ? c.weight : s.attr("data-o_weight")), t.text(c.dimensions ? c.dimensions : t.attr("data-o_dimensions")), q.find(".quantity").show(), c.is_purchasable && c.is_in_stock && c.variation_is_visible || e.find(".variations_button").hide(), c.variation_is_visible || e.find(".single_variation").html("<p>" + wc_add_to_cart_variation_params.i18n_unavailable_text + "</p>"), c.min_qty ? q.find("input[name=quantity]").attr("min", c.min_qty).val(c.min_qty) : q.find("input[name=quantity]").removeAttr("min"), c.max_qty ? q.find("input[name=quantity]").attr("max", c.max_qty) : q.find("input[name=quantity]").removeAttr("max"), "yes" === c.is_sold_individually && (q.find("input[name=quantity]").val("1"), q.find(".quantity").hide()), q.slideDown(200).trigger("show_variation", [c])
        }), $form.trigger("wc_variation_form"), $form
    }, a(function () {
        return "undefined" == typeof wc_add_to_cart_variation_params ? !1 : (a(".variations_form").wc_variation_form(), void a(".variations_form .variations select").change())
    })
}(jQuery, window, document);