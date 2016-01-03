/*!
 * pickadate.js v3.5.0, 2014/04/13
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
!function (a) {
    "function" == typeof define && define.amd ? define("picker", ["jquery"], a) : this.Picker = a(jQuery)
}(function (a) {
    function b(f, g, i, j) {
        function k() {
            return b._.node("div", b._.node("div", b._.node("div", b._.node("div", v.component.nodes(q.open), s.box), s.wrap), s.frame), s.holder)
        }

        function l() {
            t.data(g, v).addClass(s.input).val(t.data("value") ? v.get("select", r.format) : f.value).on("focus." + q.id + " click." + q.id, o), r.editable || t.on("keydown." + q.id, function (a) {
                var b = a.keyCode, c = /^(8|46)$/.test(b);
                return 27 == b ? (v.close(), !1) : void((32 == b || c || !q.open && v.component.key[b]) && (a.preventDefault(), a.stopPropagation(), c ? v.clear().close() : v.open()))
            }), e(f, {
                haspopup: !0,
                expanded: !1,
                readonly: !1,
                owns: f.id + "_root" + (v._hidden ? " " + v._hidden.id : "")
            })
        }

        function m() {
            v.$root.on({
                focusin: function (a) {
                    v.$root.removeClass(s.focused), a.stopPropagation()
                }, "mousedown click": function (b) {
                    var c = b.target;
                    c != v.$root.children()[0] && (b.stopPropagation(), "mousedown" != b.type || a(c).is(":input") || "OPTION" == c.nodeName || (b.preventDefault(), f.focus()))
                }
            }).on("click", "[data-pick], [data-nav], [data-clear]", function () {
                var c = a(this), d = c.data(), e = c.hasClass(s.navDisabled) || c.hasClass(s.disabled), g = document.activeElement;
                g = g && (g.type || g.href) && g, (e || g && !a.contains(v.$root[0], g)) && f.focus(), d.nav && !e ? v.set("highlight", v.component.item.highlight, {nav: d.nav}) : b._.isInteger(d.pick) && !e ? v.set("select", d.pick).close(!0) : d.clear && v.clear().close(!0)
            }), e(v.$root[0], "hidden", !0)
        }

        function n() {
            var b, c;
            r.hiddenName === !0 ? (b = f.name + "_hidden", c = f.name, f.name = "") : (c = ["string" == typeof r.hiddenPrefix ? r.hiddenPrefix : "", "string" == typeof r.hiddenSuffix ? r.hiddenSuffix : "_submit"], c = b = c[0] + f.name + c[1]), v._hidden = a('<input type=hidden name="' + c + '"id="' + b + '"' + (t.data("value") || f.value ? ' value="' + v.get("select", r.formatSubmit) + '"' : "") + ">")[0], t.on("change." + q.id, function () {
                v._hidden.value = f.value ? v.get("select", r.formatSubmit) : ""
            }).after(v._hidden)
        }

        function o(a) {
            a.stopPropagation(), "focus" == a.type && v.$root.addClass(s.focused), v.open()
        }

        if (!f)return b;
        var p = !1, q = {id: f.id || "P" + Math.abs(~~(Math.random() * new Date))}, r = i ? a.extend(!0, {}, i.defaults, j) : j || {}, s = a.extend({}, b.klasses(), r.klass), t = a(f), u = function () {
            return this.start()
        }, v = u.prototype = {
            constructor: u, $node: t, start: function () {
                return q && q.start ? v : (q.methods = {}, q.start = !0, q.open = !1, q.type = f.type, f.autofocus = f == document.activeElement, f.type = "text", f.readOnly = !r.editable, f.id = f.id || q.id, v.component = new i(v, r), v.$root = a(b._.node("div", k(), s.picker, 'id="' + f.id + '_root"')), m(), r.formatSubmit && n(), l(), r.container ? a(r.container).append(v.$root) : t.after(v.$root), v.on({
                    start: v.component.onStart,
                    render: v.component.onRender,
                    stop: v.component.onStop,
                    open: v.component.onOpen,
                    close: v.component.onClose,
                    set: v.component.onSet
                }).on({
                    start: r.onStart,
                    render: r.onRender,
                    stop: r.onStop,
                    open: r.onOpen,
                    close: r.onClose,
                    set: r.onSet
                }), p = c(v.$root.children()[0]), f.autofocus && v.open(), v.trigger("start").trigger("render"))
            }, render: function (a) {
                return a ? v.$root.html(k()) : v.$root.find("." + s.box).html(v.component.nodes(q.open)), v.trigger("render")
            }, stop: function () {
                return q.start ? (v.close(), v._hidden && v._hidden.parentNode.removeChild(v._hidden), v.$root.remove(), t.removeClass(s.input).removeData(g), setTimeout(function () {
                    t.off("." + q.id)
                }, 0), f.type = q.type, f.readOnly = !1, v.trigger("stop"), q.methods = {}, q.start = !1, v) : v
            }, open: function (c) {
                return q.open ? v : (t.addClass(s.active), e(f, "expanded", !0), setTimeout(function () {
                    v.$root.addClass(s.opened), e(v.$root[0], "hidden", !1)
                }, 0), c !== !1 && (q.open = !0, p && a("html").css("overflow", "hidden").css("padding-right", "+=" + d()), t.trigger("focus"), h.on("click." + q.id + " focusin." + q.id, function (a) {
                    var b = a.target;
                    b != f && b != document && 3 != a.which && v.close(b === v.$root.children()[0])
                }).on("keydown." + q.id, function (c) {
                    var d = c.keyCode, e = v.component.key[d], g = c.target;
                    27 == d ? v.close(!0) : g != f || !e && 13 != d ? a.contains(v.$root[0], g) && 13 == d && (c.preventDefault(), g.click()) : (c.preventDefault(), e ? b._.trigger(v.component.key.go, v, [b._.trigger(e)]) : v.$root.find("." + s.highlighted).hasClass(s.disabled) || v.set("select", v.component.item.highlight).close())
                })), v.trigger("open"))
            }, close: function (b) {
                return b && (t.off("focus." + q.id).trigger("focus"), setTimeout(function () {
                    t.on("focus." + q.id, o)
                }, 0)), t.removeClass(s.active), e(f, "expanded", !1), setTimeout(function () {
                    v.$root.removeClass(s.opened + " " + s.focused), e(v.$root[0], "hidden", !0)
                }, 0), q.open ? (q.open = !1, p && a("html").css("overflow", "").css("padding-right", "-=" + d()), h.off("." + q.id), v.trigger("close")) : v
            }, clear: function () {
                return v.set("clear")
            }, set: function (b, c, d) {
                var e, f, g = a.isPlainObject(b), h = g ? b : {};
                if (d = g && a.isPlainObject(c) ? c : d || {}, b) {
                    g || (h[b] = c);
                    for (e in h)f = h[e], e in v.component.item && (void 0 === f && (f = null), v.component.set(e, f, d)), ("select" == e || "clear" == e) && t.val("clear" == e ? "" : v.get(e, r.format)).trigger("change");
                    v.render()
                }
                return d.muted ? v : v.trigger("set", h)
            }, get: function (a, c) {
                return a = a || "value", null != q[a] ? q[a] : "value" == a ? f.value : a in v.component.item ? "string" == typeof c ? b._.trigger(v.component.formats.toString, v.component, [c, v.component.get(a)]) : v.component.get(a) : void 0
            }, on: function (b, c) {
                var d, e, f = a.isPlainObject(b), g = f ? b : {};
                if (b) {
                    f || (g[b] = c);
                    for (d in g)e = g[d], q.methods[d] = q.methods[d] || [], q.methods[d].push(e)
                }
                return v
            }, off: function () {
                var a, b, c = arguments;
                for (a = 0, namesCount = c.length; namesCount > a; a += 1)b = c[a], b in q.methods && delete q.methods[b];
                return v
            }, trigger: function (a, c) {
                var d = q.methods[a];
                return d && d.map(function (a) {
                    b._.trigger(a, v, [c])
                }), v
            }
        };
        return new u
    }

    function c(a) {
        var b, c = "position";
        return a.currentStyle ? b = a.currentStyle[c] : window.getComputedStyle && (b = getComputedStyle(a)[c]), "fixed" == b
    }

    function d() {
        var b = a('<div style="visibility:hidden;width:100px" />').appendTo("body"), c = b[0].offsetWidth;
        b.css("overflow", "scroll");
        var d = a('<div style="width:100%" />').appendTo(b), e = d[0].offsetWidth;
        return b.remove(), c - e
    }

    function e(b, c, d) {
        if (a.isPlainObject(c))for (var e in c)f(b, e, c[e]); else f(b, c, d)
    }

    function f(a, b, c) {
        a.setAttribute(("role" == b ? "" : "aria-") + b, c)
    }

    function g(b, c) {
        a.isPlainObject(b) || (b = {attribute: c}), c = "";
        for (var d in b) {
            var e = ("role" == d ? "" : "aria-") + d, f = b[d];
            c += null == f ? "" : e + '="' + b[d] + '"'
        }
        return c
    }

    var h = a(document);
    return b.klasses = function (a) {
        return a = a || "picker", {
            picker: a,
            opened: a + "--opened",
            focused: a + "--focused",
            input: a + "__input",
            active: a + "__input--active",
            holder: a + "__holder",
            frame: a + "__frame",
            wrap: a + "__wrap",
            box: a + "__box"
        }
    }, b._ = {
        group: function (a) {
            for (var c, d = "", e = b._.trigger(a.min, a); e <= b._.trigger(a.max, a, [e]); e += a.i)c = b._.trigger(a.item, a, [e]), d += b._.node(a.node, c[0], c[1], c[2]);
            return d
        }, node: function (b, c, d, e) {
            return c ? (c = a.isArray(c) ? c.join("") : c, d = d ? ' class="' + d + '"' : "", e = e ? " " + e : "", "<" + b + d + e + ">" + c + "</" + b + ">") : ""
        }, lead: function (a) {
            return (10 > a ? "0" : "") + a
        }, trigger: function (a, b, c) {
            return "function" == typeof a ? a.apply(b, c || []) : a
        }, digits: function (a) {
            return /\d/.test(a[1]) ? 2 : 1
        }, isDate: function (a) {
            return {}.toString.call(a).indexOf("Date") > -1 && this.isInteger(a.getDate())
        }, isInteger: function (a) {
            return {}.toString.call(a).indexOf("Number") > -1 && a % 1 === 0
        }, ariaAttr: g
    }, b.extend = function (c, d) {
        a.fn[c] = function (e, f) {
            var g = this.data(c);
            return "picker" == e ? g : g && "string" == typeof e ? b._.trigger(g[e], g, [f]) : this.each(function () {
                var f = a(this);
                f.data(c) || new b(this, c, d, e)
            })
        }, a.fn[c].defaults = d.defaults
    }, b
});