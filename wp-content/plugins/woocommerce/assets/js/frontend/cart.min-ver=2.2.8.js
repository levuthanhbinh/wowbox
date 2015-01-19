jQuery(function (a) {
    return "undefined" == typeof wc_cart_params ? !1 : (a(document).on("click", ".shipping-calculator-button", function () {
        return a(".shipping-calculator-form").slideToggle("slow"), !1
    }).on("change", "select.shipping_method, input[name^=shipping_method]", function () {
        var b = [];
        a("select.shipping_method, input[name^=shipping_method][type=radio]:checked, input[name^=shipping_method][type=hidden]").each(function () {
            b[a(this).data("index")] = a(this).val()
        }), a("div.cart_totals").block({
            message: null,
            overlayCSS: {
                background: "#fff url(" + wc_cart_params.ajax_loader_url + ") no-repeat center",
                backgroundSize: "16px 16px",
                opacity: .6
            }
        });
        var c = {
            action: "woocommerce_update_shipping_method",
            security: wc_cart_params.update_shipping_method_nonce,
            shipping_method: b
        };
        a.post(wc_cart_params.ajax_url, c, function (b) {
            a("div.cart_totals").replaceWith(b), a("body").trigger("updated_shipping_method")
        })
    }), void a(".shipping-calculator-form").hide())
});