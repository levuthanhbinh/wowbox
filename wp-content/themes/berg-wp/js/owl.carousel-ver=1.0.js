(function (e, t, n, r) {
    function u(t, n) {
        t.owlCarousel = {name: "Owl Carousel", author: "Bartosz Wojciechowski", version: "2.0.0-beta.2.1"};
        this.settings = null;
        this.options = e.extend({}, u.Defaults, n);
        this.$element = e(t);
        this.drag = e.extend({}, i);
        this.state = e.extend({}, s);
        this.e = e.extend({}, o);
        this._plugins = {};
        this._supress = {};
        this._current = null;
        this._speed = null;
        this._coordinates = [];
        this._breakpoint = null;
        this._width = null;
        this._items = [];
        this._clones = [];
        this._mergers = [];
        this._invalidated = {};
        this._pipe = [];
        e.each(u.Plugins, e.proxy(function (e, t) {
            this._plugins[e[0].toLowerCase() + e.slice(1)] = new t(this)
        }, this));
        e.each(u.Pipe, e.proxy(function (t, n) {
            this._pipe.push({filter: n.filter, run: e.proxy(n.run, this)})
        }, this));
        this.setup();
        this.initialize()
    }

    function a(e) {
        if (e.touches !== r) {
            return {x: e.touches[0].pageX, y: e.touches[0].pageY}
        }
        if (e.touches === r) {
            if (e.pageX !== r) {
                return {x: e.pageX, y: e.pageY}
            }
            if (e.pageX === r) {
                return {x: e.clientX, y: e.clientY}
            }
        }
    }

    function f(e) {
        var t, r, i = n.createElement("div"), s = e;
        for (t in s) {
            r = s[t];
            if (typeof i.style[r] !== "undefined") {
                i = null;
                return [r, t]
            }
        }
        return [false]
    }

    function l() {
        return f(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function c() {
        return f(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function h() {
        return f(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function p() {
        return "ontouchstart"in t || !!navigator.msMaxTouchPoints
    }

    function d() {
        return t.navigator.msPointerEnabled
    }

    var i, s, o;
    i = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    };
    s = {isTouch: false, isScrolling: false, isSwiping: false, direction: false, inMotion: false};
    o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    };
    u.Defaults = {
        items: 3,
        loop: false,
        center: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: t,
        responsiveClass: false,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    };
    u.Width = {Default: "default", Inner: "inner", Outer: "outer"};
    u.Plugins = {};
    u.Pipe = [{
        filter: ["width", "items", "settings"], run: function (e) {
            e.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var e, t, n = this._clones, r = this._items, i = this.settings.loop ? n.length - Math.max(this.settings.items * 2, 4) : 0;
            if (this.$stage.children(".cloned").length !== n.length || !this.settings.loop && n.length > 0) {
                this.$stage.children(".cloned").remove();
                this._clones = []
            }
            for (e = 0, t = Math.abs(i / 2); e < t; e++) {
                if (i > 0) {
                    this.$stage.children().eq(r.length + n.length - 1).remove();
                    n.pop();
                    this.$stage.children().eq(0).remove();
                    n.pop()
                } else {
                    n.push(n.length / 2);
                    this.$stage.append(r[n[n.length - 1]].clone().addClass("cloned"));
                    n.push(r.length - 1 - (n.length - 1) / 2);
                    this.$stage.prepend(r[n[n.length - 1]].clone().addClass("cloned"))
                }
            }
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var e = this.settings.rtl ? 1 : -1, t = (this.width() / this.settings.items).toFixed(3), n = 0, r, i, s;
            this._coordinates = [];
            for (i = 0, s = this._clones.length + this._items.length; i < s; i++) {
                r = this._mergers[this.relative(i)];
                r = this.settings.mergeFit && Math.min(r, this.settings.items) || r;
                n += (this.settings.autoWidth ? this._items[this.relative(i)].width() + this.settings.margin : t * r) * e;
                this._coordinates.push(n)
            }
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var t, n, r = (this.width() / this.settings.items).toFixed(3), i = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + this.settings.stagePadding * 2,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            this.$stage.css(i);
            i = {width: this.settings.autoWidth ? "auto" : r - this.settings.margin};
            i[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin;
            if (!this.settings.autoWidth && e.grep(this._mergers, function (e) {
                    return e > 1
                }).length > 0) {
                for (t = 0, n = this._coordinates.length; t < n; t++) {
                    i.width = Math.abs(this._coordinates[t]) - Math.abs(this._coordinates[t - 1] || 0) - this.settings.margin;
                    this.$stage.children().eq(t).css(i)
                }
            } else {
                this.$stage.children().css(i)
            }
        }
    }, {
        filter: ["width", "items", "settings"], run: function (e) {
            e.current && this.reset(this.$stage.children().index(e.current))
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var e = this.settings.rtl ? 1 : -1, t = this.settings.stagePadding * 2, n = this.coordinates(this.current()) + t, r = n + this.width() * e, i, s, o = [], u, a;
            for (u = 0, a = this._coordinates.length; u < a; u++) {
                i = this._coordinates[u - 1] || 0;
                s = Math.abs(this._coordinates[u]) + t * e;
                if (this.op(i, "<=", n) && this.op(i, ">", r) || this.op(s, "<", n) && this.op(s, ">", r)) {
                    o.push(u)
                }
            }
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass);
            this.$stage.children(":eq(" + o.join("), :eq(") + ")").addClass(this.settings.activeClass);
            if (this.settings.center) {
                this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass);
                this.$stage.children().eq(this.current()).addClass(this.settings.centerClass)
            }
        }
    }];
    u.prototype.initialize = function () {
        this.trigger("initialize");
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl);
        this.browserSupport();
        if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
            var t, n, i;
            t = this.$element.find("img");
            n = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : r;
            i = this.$element.children(n).width();
            if (t.length && i <= 0) {
                this.preloadAutoWidthImages(t);
                return false
            }
        }
        this.$element.addClass("owl-loading");
        this.$stage = e("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">');
        this.$element.append(this.$stage.parent());
        this.replace(this.$element.children().not(this.$stage.parent()));
        this._width = this.$element.width();
        this.refresh();
        this.$element.removeClass("owl-loading").addClass("owl-loaded");
        this.eventsCall();
        this.internalEvents();
        this.addTriggerableEvents();
        this.trigger("initialized")
    };
    u.prototype.setup = function () {
        var t = this.viewport(), n = this.options.responsive, r = -1, i = null;
        if (!n) {
            i = e.extend({}, this.options)
        } else {
            e.each(n, function (e) {
                if (e <= t && e > r) {
                    r = Number(e)
                }
            });
            i = e.extend({}, this.options, n[r]);
            delete i.responsive;
            if (i.responsiveClass) {
                this.$element.attr("class", function (e, t) {
                    return t.replace(/\b owl-responsive-\S+/g, "")
                }).addClass("owl-responsive-" + r)
            }
        }
        if (this.settings === null || this._breakpoint !== r) {
            this.trigger("change", {property: {name: "settings", value: i}});
            this._breakpoint = r;
            this.settings = i;
            this.invalidate("settings");
            this.trigger("changed", {property: {name: "settings", value: this.settings}})
        }
    };
    u.prototype.optionsLogic = function () {
        this.$element.toggleClass("owl-center", this.settings.center);
        if (this.settings.loop && this._items.length < this.settings.items) {
            this.settings.loop = false
        }
        if (this.settings.autoWidth) {
            this.settings.stagePadding = false;
            this.settings.merge = false
        }
    };
    u.prototype.prepare = function (t) {
        var n = this.trigger("prepare", {content: t});
        if (!n.data) {
            n.data = e("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(t)
        }
        this.trigger("prepared", {content: n.data});
        return n.data
    };
    u.prototype.update = function () {
        var t = 0, n = this._pipe.length, r = e.proxy(function (e) {
            return this[e]
        }, this._invalidated), i = {};
        while (t < n) {
            if (this._invalidated.all || e.grep(this._pipe[t].filter, r).length > 0) {
                this._pipe[t].run(i)
            }
            t++
        }
        this._invalidated = {}
    };
    u.prototype.width = function (e) {
        e = e || u.Width.Default;
        switch (e) {
            case u.Width.Inner:
            case u.Width.Outer:
                return this._width;
            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin
        }
    };
    u.prototype.refresh = function () {
        if (this._items.length === 0) {
            return false
        }
        var e = (new Date).getTime();
        this.trigger("refresh");
        this.setup();
        this.optionsLogic();
        this.$stage.addClass("owl-refresh");
        this.update();
        this.$stage.removeClass("owl-refresh");
        this.state.orientation = t.orientation;
        this.watchVisibility();
        this.trigger("refreshed")
    };
    u.prototype.eventsCall = function () {
        this.e._onDragStart = e.proxy(function (e) {
            this.onDragStart(e)
        }, this);
        this.e._onDragMove = e.proxy(function (e) {
            this.onDragMove(e)
        }, this);
        this.e._onDragEnd = e.proxy(function (e) {
            this.onDragEnd(e)
        }, this);
        this.e._onResize = e.proxy(function (e) {
            this.onResize(e)
        }, this);
        this.e._transitionEnd = e.proxy(function (e) {
            this.transitionEnd(e)
        }, this);
        this.e._preventClick = e.proxy(function (e) {
            this.preventClick(e)
        }, this)
    };
    u.prototype.onThrottledResize = function () {
        t.clearTimeout(this.resizeTimer);
        this.resizeTimer = t.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    };
    u.prototype.onResize = function () {
        if (!this._items.length) {
            return false
        }
        if (this._width === this.$element.width()) {
            return false
        }
        if (this.trigger("resize").isDefaultPrevented()) {
            return false
        }
        this._width = this.$element.width();
        this.invalidate("width");
        this.refresh();
        this.trigger("resized")
    };
    u.prototype.eventsRouter = function (e) {
        var t = e.type;
        if (t === "mousedown" || t === "touchstart") {
            this.onDragStart(e)
        } else if (t === "mousemove" || t === "touchmove") {
            this.onDragMove(e)
        } else if (t === "mouseup" || t === "touchend") {
            this.onDragEnd(e)
        } else if (t === "touchcancel") {
            this.onDragEnd(e)
        }
    };
    u.prototype.eventsRouter = function (e) {
        var t = e.type;
        if (t === "mousedown" || t === "touchstart") {
            this.onDragStart(e)
        } else if (t === "mousemove" || t === "touchmove") {
            this.onDragMove(e)
        } else if (t === "mouseup" || t === "touchend") {
            this.onDragEnd(e)
        } else if (t === "touchcancel") {
            this.onDragEnd(e)
        }
    };
    u.prototype.internalEvents = function () {
        var n = p(), r = d();
        if (this.settings.mouseDrag) {
            this.$stage.on("mousedown", e.proxy(function (e) {
                this.eventsRouter(e)
            }, this));
            this.$stage.on("dragstart", function () {
                return false
            });
            this.$stage.get(0).onselectstart = function () {
                return false
            }
        } else {
            this.$element.addClass("owl-text-select-on")
        }
        if (this.settings.touchDrag && !r) {
            this.$stage.on("touchstart touchcancel", e.proxy(function (e) {
                this.eventsRouter(e)
            }, this))
        }
        if (this.transitionEndVendor) {
            this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, false)
        }
        if (this.settings.responsive !== false) {
            this.on(t, "resize", e.proxy(this.onThrottledResize, this))
        }
    };
    u.prototype.onDragStart = function (r) {
        var i, s, o, u, f;
        i = r.originalEvent || r || t.event;
        if (i.which === 3 || this.state.isTouch) {
            return false
        }
        if (i.type === "mousedown") {
            this.$stage.addClass("owl-grab")
        }
        this.trigger("drag");
        this.drag.startTime = (new Date).getTime();
        this.speed(0);
        this.state.isTouch = true;
        this.state.isScrolling = false;
        this.state.isSwiping = false;
        this.drag.distance = 0;
        o = a(i).x;
        u = a(i).y;
        this.drag.offsetX = this.$stage.position().left;
        this.drag.offsetY = this.$stage.position().top;
        if (this.settings.rtl) {
            this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin
        }
        if (this.state.inMotion && this.support3d) {
            f = this.getTransformProperty();
            this.drag.offsetX = f;
            this.animate(f);
            this.state.inMotion = true
        } else if (this.state.inMotion && !this.support3d) {
            this.state.inMotion = false;
            return false
        }
        this.drag.startX = o - this.drag.offsetX;
        this.drag.startY = u - this.drag.offsetY;
        this.drag.start = o - this.drag.startX;
        this.drag.targetEl = i.target || i.srcElement;
        this.drag.updatedX = this.drag.start;
        if (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") {
            this.drag.targetEl.draggable = false
        }
        e(n).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", e.proxy(function (e) {
            this.eventsRouter(e)
        }, this))
    };
    u.prototype.onDragMove = function (e) {
        var n, i, s, o, u, f, l;
        if (!this.state.isTouch) {
            return
        }
        if (this.state.isScrolling) {
            return
        }
        n = e.originalEvent || e || t.event;
        s = a(n).x;
        o = a(n).y;
        this.drag.currentX = s - this.drag.startX;
        this.drag.currentY = o - this.drag.startY;
        this.drag.distance = this.drag.currentX - this.drag.offsetX;
        if (this.drag.distance < 0) {
            this.state.direction = this.settings.rtl ? "right" : "left"
        } else if (this.drag.distance > 0) {
            this.state.direction = this.settings.rtl ? "left" : "right"
        }
        if (this.settings.loop) {
            if (this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && this.state.direction === "right") {
                this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)
            } else if (this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && this.state.direction === "left") {
                this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)
            }
        } else {
            u = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
            f = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
            l = this.settings.pullDrag ? this.drag.distance / 5 : 0;
            this.drag.currentX = Math.max(Math.min(this.drag.currentX, u + l), f + l)
        }
        if (this.drag.distance > 8 || this.drag.distance < -8) {
            if (n.preventDefault !== r) {
                n.preventDefault()
            } else {
                n.returnValue = false
            }
            this.state.isSwiping = true
        }
        this.drag.updatedX = this.drag.currentX;
        if ((this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === false) {
            this.state.isScrolling = true;
            this.drag.updatedX = this.drag.start
        }
        this.animate(this.drag.updatedX)
    };
    u.prototype.onDragEnd = function (t) {
        var r, i, s;
        if (!this.state.isTouch) {
            return
        }
        if (t.type === "mouseup") {
            this.$stage.removeClass("owl-grab")
        }
        this.trigger("dragged");
        this.drag.targetEl.removeAttribute("draggable");
        this.state.isTouch = false;
        this.state.isScrolling = false;
        this.state.isSwiping = false;
        if (this.drag.distance === 0 && this.state.inMotion !== true) {
            this.state.inMotion = false;
            return false
        }
        this.drag.endTime = (new Date).getTime();
        r = this.drag.endTime - this.drag.startTime;
        i = Math.abs(this.drag.distance);
        if (i > 3 || r > 300) {
            this.removeClick(this.drag.targetEl)
        }
        s = this.closest(this.drag.updatedX);
        this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
        this.current(s);
        this.invalidate("position");
        this.update();
        if (!this.settings.pullDrag && this.drag.updatedX === this.coordinates(s)) {
            this.transitionEnd()
        }
        this.drag.distance = 0;
        e(n).off(".owl.dragEvents")
    };
    u.prototype.removeClick = function (n) {
        this.drag.targetEl = n;
        e(n).on("click.preventClick", this.e._preventClick);
        t.setTimeout(function () {
            e(n).off("click.preventClick")
        }, 300)
    };
    u.prototype.preventClick = function (t) {
        if (t.preventDefault) {
            t.preventDefault()
        } else {
            t.returnValue = false
        }
        if (t.stopPropagation) {
            t.stopPropagation()
        }
        e(t.target).off("click.preventClick")
    };
    u.prototype.getTransformProperty = function () {
        var e, n;
        e = t.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform");
        e = e.replace(/matrix(3d)?\(|\)/g, "").split(",");
        n = e.length === 16;
        return n !== true ? e[4] : e[12]
    };
    u.prototype.closest = function (t) {
        var n = -1, r = 30, i = this.width(), s = this.coordinates();
        if (!this.settings.freeDrag) {
            e.each(s, e.proxy(function (e, o) {
                if (t > o - r && t < o + r) {
                    n = e
                } else if (this.op(t, "<", o) && this.op(t, ">", s[e + 1] || o - i)) {
                    n = this.state.direction === "left" ? e + 1 : e
                }
                return n === -1
            }, this))
        }
        if (!this.settings.loop) {
            if (this.op(t, ">", s[this.minimum()])) {
                n = t = this.minimum()
            } else if (this.op(t, "<", s[this.maximum()])) {
                n = t = this.maximum()
            }
        }
        return n
    };
    u.prototype.animate = function (t) {
        this.trigger("translate");
        this.state.inMotion = this.speed() > 0;
        if (this.support3d) {
            this.$stage.css({transform: "translate3d(" + t + "px" + ",0px, 0px)", transition: this.speed() / 1e3 + "s"})
        } else if (this.state.isTouch) {
            this.$stage.css({left: t + "px"})
        } else {
            this.$stage.animate({left: t}, this.speed() / 1e3, this.settings.fallbackEasing, e.proxy(function () {
                if (this.state.inMotion) {
                    this.transitionEnd()
                }
            }, this))
        }
    };
    u.prototype.current = function (e) {
        if (e === r) {
            return this._current
        }
        if (this._items.length === 0) {
            return r
        }
        e = this.normalize(e);
        if (this._current !== e) {
            var t = this.trigger("change", {property: {name: "position", value: e}});
            if (t.data !== r) {
                e = this.normalize(t.data)
            }
            this._current = e;
            this.invalidate("position");
            this.trigger("changed", {property: {name: "position", value: this._current}})
        }
        return this._current
    };
    u.prototype.invalidate = function (e) {
        this._invalidated[e] = true
    };
    u.prototype.reset = function (e) {
        e = this.normalize(e);
        if (e === r) {
            return
        }
        this._speed = 0;
        this._current = e;
        this.suppress(["translate", "translated"]);
        this.animate(this.coordinates(e));
        this.release(["translate", "translated"])
    };
    u.prototype.normalize = function (t, n) {
        var i = n ? this._items.length : this._items.length + this._clones.length;
        if (!e.isNumeric(t) || i < 1) {
            return r
        }
        if (this._clones.length) {
            t = (t % i + i) % i
        } else {
            t = Math.max(this.minimum(n), Math.min(this.maximum(n), t))
        }
        return t
    };
    u.prototype.relative = function (e) {
        e = this.normalize(e);
        e = e - this._clones.length / 2;
        return this.normalize(e, true)
    };
    u.prototype.maximum = function (e) {
        var t, n, r = 0, i, s = this.settings;
        if (e) {
            return this._items.length - 1
        }
        if (!s.loop && s.center) {
            t = this._items.length - 1
        } else if (!s.loop && !s.center) {
            t = this._items.length - s.items
        } else if (s.loop || s.center) {
            t = this._items.length + s.items
        } else if (s.autoWidth || s.merge) {
            revert = s.rtl ? 1 : -1;
            n = this.$stage.width() - this.$element.width();
            while (i = this.coordinates(r)) {
                if (i * revert >= n) {
                    break
                }
                t = ++r
            }
        } else {
            throw"Can not detect maximum absolute position."
        }
        return t
    };
    u.prototype.minimum = function (e) {
        if (e) {
            return 0
        }
        return this._clones.length / 2
    };
    u.prototype.items = function (e) {
        if (e === r) {
            return this._items.slice()
        }
        e = this.normalize(e, true);
        return this._items[e]
    };
    u.prototype.mergers = function (e) {
        if (e === r) {
            return this._mergers.slice()
        }
        e = this.normalize(e, true);
        return this._mergers[e]
    };
    u.prototype.clones = function (t) {
        var n = this._clones.length / 2, i = n + this._items.length, s = function (e) {
            return e % 2 === 0 ? i + e / 2 : n - (e + 1) / 2
        };
        if (t === r) {
            return e.map(this._clones, function (e, t) {
                return s(t)
            })
        }
        return e.map(this._clones, function (e, n) {
            return e === t ? s(n) : null
        })
    };
    u.prototype.speed = function (e) {
        if (e !== r) {
            this._speed = e
        }
        return this._speed
    };
    u.prototype.coordinates = function (t) {
        var n = null;
        if (t === r) {
            return e.map(this._coordinates, e.proxy(function (e, t) {
                return this.coordinates(t)
            }, this))
        }
        if (this.settings.center) {
            n = this._coordinates[t];
            n += (this.width() - n + (this._coordinates[t - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)
        } else {
            n = this._coordinates[t - 1] || 0
        }
        return n
    };
    u.prototype.duration = function (e, t, n) {
        return Math.min(Math.max(Math.abs(t - e), 1), 6) * Math.abs(n || this.settings.smartSpeed)
    };
    u.prototype.to = function (n, r) {
        if (this.settings.loop) {
            var i = n - this.relative(this.current()), s = this.current(), o = this.current(), u = this.current() + i, a = o - u < 0 ? true : false, f = this._clones.length + this._items.length;
            if (u < this.settings.items && a === false) {
                s = o + this._items.length;
                this.reset(s)
            } else if (u >= f - this.settings.items && a === true) {
                s = o - this._items.length;
                this.reset(s)
            }
            t.clearTimeout(this.e._goToLoop);
            this.e._goToLoop = t.setTimeout(e.proxy(function () {
                this.speed(this.duration(this.current(), s + i, r));
                this.current(s + i);
                this.update()
            }, this), 30)
        } else {
            this.speed(this.duration(this.current(), n, r));
            this.current(n);
            this.update()
        }
    };
    u.prototype.next = function (e) {
        e = e || false;
        this.to(this.relative(this.current()) + 1, e)
    };
    u.prototype.prev = function (e) {
        e = e || false;
        this.to(this.relative(this.current()) - 1, e)
    };
    u.prototype.transitionEnd = function (e) {
        if (e !== r) {
            e.stopPropagation();
            if ((e.target || e.srcElement || e.originalTarget) !== this.$stage.get(0)) {
                return false
            }
        }
        this.state.inMotion = false;
        this.trigger("translated")
    };
    u.prototype.viewport = function () {
        var r;
        if (this.options.responsiveBaseElement !== t) {
            r = e(this.options.responsiveBaseElement).width()
        } else if (t.innerWidth) {
            r = t.innerWidth
        } else if (n.documentElement && n.documentElement.clientWidth) {
            r = n.documentElement.clientWidth
        } else {
            throw"Can not detect viewport width."
        }
        return r
    };
    u.prototype.replace = function (t) {
        this.$stage.empty();
        this._items = [];
        if (t) {
            t = t instanceof jQuery ? t : e(t)
        }
        if (this.settings.nestedItemSelector) {
            t = t.find("." + this.settings.nestedItemSelector)
        }
        t.each(e.proxy(function (e, t) {
            t = this.prepare(t);
            this.$stage.append(t);
            this._items.push(t);
            this._mergers.push(t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        }, this));
        this.reset(e.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate("items")
    };
    u.prototype.add = function (e, t) {
        t = t === r ? this._items.length : this.normalize(t, true);
        this.trigger("add", {content: e, position: t});
        if (this._items.length === 0 || t === this._items.length) {
            this.$stage.append(e);
            this._items.push(e);
            this._mergers.push(e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        } else {
            this._items[t].before(e);
            this._items.splice(t, 0, e);
            this._mergers.splice(t, 0, e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") * 1 || 1)
        }
        this.invalidate("items");
        this.trigger("added", {content: e, position: t})
    };
    u.prototype.remove = function (e) {
        e = this.normalize(e, true);
        if (e === r) {
            return
        }
        this.trigger("remove", {content: this._items[e], position: e});
        this._items[e].remove();
        this._items.splice(e, 1);
        this._mergers.splice(e, 1);
        this.invalidate("items");
        this.trigger("removed", {content: null, position: e})
    };
    u.prototype.addTriggerableEvents = function () {
        var t = e.proxy(function (t, n) {
            return e.proxy(function (e) {
                if (e.relatedTarget !== this) {
                    this.suppress([n]);
                    t.apply(this, [].slice.call(arguments, 1));
                    this.release([n])
                }
            }, this)
        }, this);
        e.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, e.proxy(function (e, n) {
            this.$element.on(e + ".owl.carousel", t(n, e + ".owl.carousel"))
        }, this))
    };
    u.prototype.watchVisibility = function () {
        function n(e) {
            return e.offsetWidth > 0 && e.offsetHeight > 0
        }

        function r() {
            if (n(this.$element.get(0))) {
                this.$element.removeClass("owl-hidden");
                this.refresh();
                t.clearInterval(this.e._checkVisibile)
            }
        }

        if (!n(this.$element.get(0))) {
            this.$element.addClass("owl-hidden");
            t.clearInterval(this.e._checkVisibile);
            this.e._checkVisibile = t.setInterval(e.proxy(r, this), 500)
        }
    };
    u.prototype.preloadAutoWidthImages = function (t) {
        var n, r, i, s;
        n = 0;
        r = this;
        t.each(function (o, u) {
            i = e(u);
            s = new Image;
            s.onload = function () {
                n++;
                i.attr("src", s.src);
                i.css("opacity", 1);
                if (n >= t.length) {
                    r.state.imagesLoaded = true;
                    r.initialize()
                }
            };
            s.src = i.attr("src") || i.attr("data-src") || i.attr("data-src-retina")
        })
    };
    u.prototype.destroy = function () {
        if (this.$element.hasClass(this.settings.themeClass)) {
            this.$element.removeClass(this.settings.themeClass)
        }
        if (this.settings.responsive !== false) {
            e(t).off("resize.owl.carousel")
        }
        if (this.transitionEndVendor) {
            this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd)
        }
        for (var r in this._plugins) {
            this._plugins[r].destroy()
        }
        if (this.settings.mouseDrag || this.settings.touchDrag) {
            this.$stage.off("mousedown touchstart touchcancel");
            e(n).off(".owl.dragEvents");
            this.$stage.get(0).onselectstart = function () {
            };
            this.$stage.off("dragstart", function () {
                return false
            })
        }
        this.$element.off(".owl");
        this.$stage.children(".cloned").remove();
        this.e = null;
        this.$element.removeData("owlCarousel");
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$stage.unwrap()
    };
    u.prototype.op = function (e, t, n) {
        var r = this.settings.rtl;
        switch (t) {
            case"<":
                return r ? e > n : e < n;
            case">":
                return r ? e < n : e > n;
            case">=":
                return r ? e <= n : e >= n;
            case"<=":
                return r ? e >= n : e <= n;
            default:
                break
        }
    };
    u.prototype.on = function (e, t, n, r) {
        if (e.addEventListener) {
            e.addEventListener(t, n, r)
        } else if (e.attachEvent) {
            e.attachEvent("on" + t, n)
        }
    };
    u.prototype.off = function (e, t, n, r) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, r)
        } else if (e.detachEvent) {
            e.detachEvent("on" + t, n)
        }
    };
    u.prototype.trigger = function (t, n, r) {
        var i = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }, s = e.camelCase(e.grep(["on", t, r], function (e) {
            return e
        }).join("-").toLowerCase()), o = e.Event([t, "owl", r || "carousel"].join(".").toLowerCase(), e.extend({relatedTarget: this}, i, n));
        if (!this._supress[t]) {
            e.each(this._plugins, function (e, t) {
                if (t.onTrigger) {
                    t.onTrigger(o)
                }
            });
            this.$element.trigger(o);
            if (this.settings && typeof this.settings[s] === "function") {
                this.settings[s].apply(this, o)
            }
        }
        return o
    };
    u.prototype.suppress = function (t) {
        e.each(t, e.proxy(function (e, t) {
            this._supress[t] = true
        }, this))
    };
    u.prototype.release = function (t) {
        e.each(t, e.proxy(function (e, t) {
            delete this._supress[t]
        }, this))
    };
    u.prototype.browserSupport = function () {
        this.support3d = h();
        if (this.support3d) {
            this.transformVendor = c();
            var e = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = e[l()];
            this.vendorName = this.transformVendor.replace(/Transform/i, "");
            this.vendorName = this.vendorName !== "" ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = t.orientation
    };
    e.fn.owlCarousel = function (t) {
        return this.each(function () {
            if (!e(this).data("owlCarousel")) {
                e(this).data("owlCarousel", new u(this, t))
            }
        })
    };
    e.fn.owlCarousel.Constructor = u
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    var i = function (t) {
        this._core = t;
        this._loaded = [];
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel": e.proxy(function (t) {
                if (!t.namespace) {
                    return
                }
                if (!this._core.settings || !this._core.settings.lazyLoad) {
                    return
                }
                if (t.property && t.property.name == "position" || t.type == "initialized") {
                    var n = this._core.settings, r = n.center && Math.ceil(n.items / 2) || n.items, i = n.center && r * -1 || 0, s = (t.property && t.property.value || this._core.current()) + i, o = this._core.clones().length, u = e.proxy(function (e, t) {
                        this.load(t)
                    }, this);
                    while (i++ < r) {
                        this.load(o / 2 + this._core.relative(s));
                        o && e.each(this._core.clones(this._core.relative(s++)), u)
                    }
                }
            }, this)
        };
        this._core.options = e.extend({}, i.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    i.Defaults = {lazyLoad: false};
    i.prototype.load = function (n) {
        var r = this._core.$stage.children().eq(n), i = r && r.find(".owl-lazy");
        if (!i || e.inArray(r.get(0), this._loaded) > -1) {
            return
        }
        i.each(e.proxy(function (n, r) {
            var i = e(r), s, o = t.devicePixelRatio > 1 && i.attr("data-src-retina") || i.attr("data-src");
            this._core.trigger("load", {element: i, url: o}, "lazy");
            if (i.is("img")) {
                i.one("load.owl.lazy", e.proxy(function () {
                    i.css("opacity", 1);
                    this._core.trigger("loaded", {element: i, url: o}, "lazy")
                }, this)).attr("src", o)
            } else {
                s = new Image;
                s.onload = e.proxy(function () {
                    i.css({"background-image": "url(" + o + ")", opacity: "1"});
                    this._core.trigger("loaded", {element: i, url: o}, "lazy")
                }, this);
                s.src = o
            }
        }, this));
        this._loaded.push(r.get(0))
    };
    i.prototype.destroy = function () {
        var e, t;
        for (e in this.handlers) {
            this._core.$element.off(e, this.handlers[e])
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Lazy = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    var i = function (t) {
        this._core = t;
        this._handlers = {
            "initialized.owl.carousel": e.proxy(function () {
                if (this._core.settings.autoHeight) {
                    this.update()
                }
            }, this), "changed.owl.carousel": e.proxy(function (e) {
                if (this._core.settings.autoHeight && e.property.name == "position") {
                    this.update()
                }
            }, this), "loaded.owl.lazy": e.proxy(function (e) {
                if (this._core.settings.autoHeight && e.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current())) {
                    this.update()
                }
            }, this)
        };
        this._core.options = e.extend({}, i.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    i.Defaults = {autoHeight: false, autoHeightClass: "owl-height"};
    i.prototype.update = function () {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    };
    i.prototype.destroy = function () {
        var e, t;
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e])
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.AutoHeight = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    var i = function (t) {
        this._core = t;
        this._videos = {};
        this._playing = null;
        this._fullscreen = false;
        this._handlers = {
            "resize.owl.carousel": e.proxy(function (e) {
                if (this._core.settings.video && !this.isInFullScreen()) {
                    e.preventDefault()
                }
            }, this), "refresh.owl.carousel changed.owl.carousel": e.proxy(function (e) {
                if (this._playing) {
                    this.stop()
                }
            }, this), "prepared.owl.carousel": e.proxy(function (t) {
                var n = e(t.content).find(".owl-video");
                if (n.length) {
                    n.css("display", "none");
                    this.fetch(n, e(t.content))
                }
            }, this)
        };
        this._core.options = e.extend({}, i.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", e.proxy(function (e) {
            this.play(e)
        }, this))
    };
    i.Defaults = {video: false, videoHeight: false, videoWidth: false};
    i.prototype.fetch = function (e, t) {
        var n = e.attr("data-vimeo-id") ? "vimeo" : "youtube", r = e.attr("data-vimeo-id") || e.attr("data-youtube-id"), i = e.attr("data-width") || this._core.settings.videoWidth, s = e.attr("data-height") || this._core.settings.videoHeight, o = e.attr("href");
        if (o) {
            r = o.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
            if (r[3].indexOf("youtu") > -1) {
                n = "youtube"
            } else if (r[3].indexOf("vimeo") > -1) {
                n = "vimeo"
            } else {
                throw new Error("Video URL not supported.")
            }
            r = r[6]
        } else {
            throw new Error("Missing video URL.")
        }
        this._videos[o] = {type: n, id: r, width: i, height: s};
        t.attr("data-video", o);
        this.thumbnail(e, this._videos[o])
    };
    i.prototype.thumbnail = function (t, n) {
        var r, i, s, o = n.width && n.height ? 'style="width:' + n.width + "px;height:" + n.height + 'px;"' : "", u = t.find("img"), a = "src", f = "", l = this._core.settings, c = function (e) {
            i = '<div class="owl-video-play-icon"></div>';
            if (l.lazyLoad) {
                r = '<div class="owl-video-tn ' + f + '" ' + a + '="' + e + '"></div>'
            } else {
                r = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + e + ')"></div>'
            }
            t.after(r);
            t.after(i)
        };
        t.wrap('<div class="owl-video-wrapper"' + o + "></div>");
        if (this._core.settings.lazyLoad) {
            a = "data-src";
            f = "owl-lazy"
        }
        if (u.length) {
            c(u.attr(a));
            u.remove();
            return false
        }
        if (n.type === "youtube") {
            s = "http://img.youtube.com/vi/" + n.id + "/hqdefault.jpg";
            c(s)
        } else if (n.type === "vimeo") {
            e.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + n.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (e) {
                    s = e[0].thumbnail_large;
                    c(s)
                }
            })
        }
    };
    i.prototype.stop = function () {
        this._core.trigger("stop", null, "video");
        this._playing.find(".owl-video-frame").remove();
        this._playing.removeClass("owl-video-playing");
        this._playing = null
    };
    i.prototype.play = function (t) {
        this._core.trigger("play", null, "video");
        if (this._playing) {
            this.stop()
        }
        var n = e(t.target || t.srcElement), r = n.closest("." + this._core.settings.itemClass), i = this._videos[r.attr("data-video")], s = i.width || "100%", o = i.height || this._core.$stage.height(), u, a;
        if (i.type === "youtube") {
            u = '<iframe width="' + s + '" height="' + o + '" src="http://www.youtube.com/embed/' + i.id + "?autoplay=1&v=" + i.id + '" frameborder="0" allowfullscreen></iframe>'
        } else if (i.type === "vimeo") {
            u = '<iframe src="http://player.vimeo.com/video/' + i.id + '?autoplay=1" width="' + s + '" height="' + o + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        }
        r.addClass("owl-video-playing");
        this._playing = r;
        a = e('<div style="height:' + o + "px; width:" + s + 'px" class="owl-video-frame">' + u + "</div>");
        n.after(a)
    };
    i.prototype.isInFullScreen = function () {
        var r = n.fullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement;
        if (r && e(r).parent().hasClass("owl-video-frame")) {
            this._core.speed(0);
            this._fullscreen = true
        }
        if (r && this._fullscreen && this._playing) {
            return false
        }
        if (this._fullscreen) {
            this._fullscreen = false;
            return false
        }
        if (this._playing) {
            if (this._core.state.orientation !== t.orientation) {
                this._core.state.orientation = t.orientation;
                return false
            }
        }
        return true
    };
    i.prototype.destroy = function () {
        var e, t;
        this._core.$element.off("click.owl.video");
        for (e in this._handlers) {
            this._core.$element.off(e, this._handlers[e])
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Video = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    var i = function (t) {
        this.core = t;
        this.core.options = e.extend({}, i.Defaults, this.core.options);
        this.swapping = true;
        this.previous = r;
        this.next = r;
        this.handlers = {
            "change.owl.carousel": e.proxy(function (e) {
                if (e.property.name == "position") {
                    this.previous = this.core.current();
                    this.next = e.property.value
                }
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": e.proxy(function (e) {
                this.swapping = e.type == "translated"
            }, this), "translate.owl.carousel": e.proxy(function (e) {
                if (this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
                    this.swap()
                }
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    i.Defaults = {animateOut: false, animateIn: false};
    i.prototype.swap = function () {
        if (this.core.settings.items !== 1 || !this.core.support3d) {
            return
        }
        this.core.speed(0);
        var t, n = e.proxy(this.clear, this), r = this.core.$stage.children().eq(this.previous), i = this.core.$stage.children().eq(this.next), s = this.core.settings.animateIn, o = this.core.settings.animateOut;
        if (this.core.current() === this.previous) {
            return
        }
        if (o) {
            t = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
            r.css({left: t + "px"}).addClass("animated owl-animated-out").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", n)
        }
        if (s) {
            i.addClass("animated owl-animated-in").addClass(s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", n)
        }
    };
    i.prototype.clear = function (t) {
        e(t.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
        this.core.transitionEnd()
    };
    i.prototype.destroy = function () {
        var e, t;
        for (e in this.handlers) {
            this.core.$element.off(e, this.handlers[e])
        }
        for (t in Object.getOwnPropertyNames(this)) {
            typeof this[t] != "function" && (this[t] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Animate = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    var i = function (t) {
        this.core = t;
        this.core.options = e.extend({}, i.Defaults, this.core.options);
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": e.proxy(function () {
                this.autoplay()
            }, this), "play.owl.autoplay": e.proxy(function (e, t, n) {
                this.play(t, n)
            }, this), "stop.owl.autoplay": e.proxy(function () {
                this.stop()
            }, this), "mouseover.owl.autoplay": e.proxy(function () {
                if (this.core.settings.autoplayHoverPause) {
                    this.pause()
                }
            }, this), "mouseleave.owl.autoplay": e.proxy(function () {
                if (this.core.settings.autoplayHoverPause) {
                    this.autoplay()
                }
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    i.Defaults = {autoplay: false, autoplayTimeout: 5e3, autoplayHoverPause: false, autoplaySpeed: false};
    i.prototype.autoplay = function () {
        if (this.core.settings.autoplay && !this.core.state.videoPlay) {
            t.clearInterval(this.interval);
            this.interval = t.setInterval(e.proxy(function () {
                this.play()
            }, this), this.core.settings.autoplayTimeout)
        } else {
            t.clearInterval(this.interval)
        }
    };
    i.prototype.play = function (e, r) {
        if (n.hidden === true) {
            return
        }
        if (this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion) {
            return
        }
        if (this.core.settings.autoplay === false) {
            t.clearInterval(this.interval);
            return
        }
        this.core.next(this.core.settings.autoplaySpeed)
    };
    i.prototype.stop = function () {
        t.clearInterval(this.interval)
    };
    i.prototype.pause = function () {
        t.clearInterval(this.interval)
    };
    i.prototype.destroy = function () {
        var e, n;
        t.clearInterval(this.interval);
        for (e in this.handlers) {
            this.core.$element.off(e, this.handlers[e])
        }
        for (n in Object.getOwnPropertyNames(this)) {
            typeof this[n] != "function" && (this[n] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.autoplay = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    "use strict";
    var i = function (t) {
        this._core = t;
        this._initialized = false;
        this._pages = [];
        this._controls = {};
        this._templates = [];
        this.$element = this._core.$element;
        this._overrides = {next: this._core.next, prev: this._core.prev, to: this._core.to};
        this._handlers = {
            "prepared.owl.carousel": e.proxy(function (t) {
                if (this._core.settings.dotsData) {
                    this._templates.push(e(t.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }
            }, this), "add.owl.carousel": e.proxy(function (t) {
                if (this._core.settings.dotsData) {
                    this._templates.splice(t.position, 0, e(t.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }
            }, this), "remove.owl.carousel prepared.owl.carousel": e.proxy(function (e) {
                if (this._core.settings.dotsData) {
                    this._templates.splice(e.position, 1)
                }
            }, this), "change.owl.carousel": e.proxy(function (e) {
                if (e.property.name == "position") {
                    if (!this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                        var t = this._core.current(), n = this._core.maximum(), r = this._core.minimum();
                        e.data = e.property.value > n ? t >= n ? r : n : e.property.value < r ? n : e.property.value
                    }
                }
            }, this), "changed.owl.carousel": e.proxy(function (e) {
                if (e.property.name == "position") {
                    this.draw()
                }
            }, this), "refreshed.owl.carousel": e.proxy(function () {
                if (!this._initialized) {
                    this.initialize();
                    this._initialized = true
                }
                this._core.trigger("refresh", null, "navigation");
                this.update();
                this.draw();
                this._core.trigger("refreshed", null, "navigation")
            }, this)
        };
        this._core.options = e.extend({}, i.Defaults, this._core.options);
        this.$element.on(this._handlers)
    };
    i.Defaults = {
        nav: false,
        navRewind: true,
        navText: ["prev", "next"],
        navSpeed: false,
        navElement: "div",
        navContainer: false,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: true,
        dotsEach: false,
        dotData: false,
        dotsSpeed: false,
        dotsContainer: false,
        controlsClass: "owl-controls"
    };
    i.prototype.initialize = function () {
        var t, n, r = this._core.settings;
        if (!r.dotsData) {
            this._templates = [e("<div>").addClass(r.dotClass).append(e("<span>")).prop("outerHTML")]
        }
        if (!r.navContainer || !r.dotsContainer) {
            this._controls.$container = e("<div>").addClass(r.controlsClass).appendTo(this.$element)
        }
        this._controls.$indicators = r.dotsContainer ? e(r.dotsContainer) : e("<div>").hide().addClass(r.dotsClass).appendTo(this._controls.$container);
        this._controls.$indicators.on("click", "div", e.proxy(function (t) {
            var n = e(t.target).parent().is(this._controls.$indicators) ? e(t.target).index() : e(t.target).parent().index();
            t.preventDefault();
            this.to(n, r.dotsSpeed)
        }, this));
        t = r.navContainer ? e(r.navContainer) : e("<div>").addClass(r.navContainerClass).prependTo(this._controls.$container);
        this._controls.$next = e("<" + r.navElement + ">");
        this._controls.$previous = this._controls.$next.clone();
        this._controls.$previous.addClass(r.navClass[0]).html(r.navText[0]).hide().prependTo(t).on("click", e.proxy(function (e) {
            this.prev(r.navSpeed)
        }, this));
        this._controls.$next.addClass(r.navClass[1]).html(r.navText[1]).hide().appendTo(t).on("click", e.proxy(function (e) {
            this.next(r.navSpeed)
        }, this));
        for (n in this._overrides) {
            this._core[n] = e.proxy(this[n], this)
        }
    };
    i.prototype.destroy = function () {
        var e, t, n, r;
        for (e in this._handlers) {
            this.$element.off(e, this._handlers[e])
        }
        for (t in this._controls) {
            this._controls[t].remove()
        }
        for (r in this.overides) {
            this._core[r] = this._overrides[r]
        }
        for (n in Object.getOwnPropertyNames(this)) {
            typeof this[n] != "function" && (this[n] = null)
        }
    };
    i.prototype.update = function () {
        var e, t, n, r = this._core.settings, i = this._core.clones().length / 2, s = i + this._core.items().length, o = r.center || r.autoWidth || r.dotData ? 1 : r.dotsEach || r.items;
        if (r.slideBy !== "page") {
            r.slideBy = Math.min(r.slideBy, r.items)
        }
        if (r.dots) {
            this._pages = [];
            for (e = i, t = 0, n = 0; e < s; e++) {
                if (t >= o || t === 0) {
                    this._pages.push({start: e - i, end: e - i + o - 1});
                    t = 0, ++n
                }
                t += this._core.mergers(this._core.relative(e))
            }
        }
    };
    i.prototype.draw = function () {
        var t, n, r = "", i = this._core.settings, s = this._core.$stage.children(), o = this._core.relative(this._core.current());
        if (i.nav && !i.loop && !i.navRewind) {
            this._controls.$previous.toggleClass("disabled", o <= 0);
            this._controls.$next.toggleClass("disabled", o >= this._core.maximum())
        }
        this._controls.$previous.toggle(i.nav);
        this._controls.$next.toggle(i.nav);
        if (i.dots) {
            t = this._pages.length - this._controls.$indicators.children().length;
            if (i.dotData && t !== 0) {
                for (n = 0; n < this._controls.$indicators.children().length; n++) {
                    r += this._templates[this._core.relative(n)]
                }
                this._controls.$indicators.html(r)
            } else if (t > 0) {
                r = (new Array(t + 1)).join(this._templates[0]);
                this._controls.$indicators.append(r)
            } else if (t < 0) {
                this._controls.$indicators.children().slice(t).remove()
            }
            this._controls.$indicators.find(".active").removeClass("active");
            this._controls.$indicators.children().eq(e.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(i.dots)
    };
    i.prototype.onTrigger = function (t) {
        var n = this._core.settings;
        t.page = {
            index: e.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: n && (n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items)
        }
    };
    i.prototype.current = function () {
        var t = this._core.relative(this._core.current());
        return e.grep(this._pages, function (e) {
            return e.start <= t && e.end >= t
        }).pop()
    };
    i.prototype.getPosition = function (t) {
        var n, r, i = this._core.settings;
        if (i.slideBy == "page") {
            n = e.inArray(this.current(), this._pages);
            r = this._pages.length;
            t ? ++n : --n;
            n = this._pages[(n % r + r) % r].start
        } else {
            n = this._core.relative(this._core.current());
            r = this._core.items().length;
            t ? n += i.slideBy : n -= i.slideBy
        }
        return n
    };
    i.prototype.next = function (t) {
        e.proxy(this._overrides.to, this._core)(this.getPosition(true), t)
    };
    i.prototype.prev = function (t) {
        console.log(this.getPosition(false));
        e.proxy(this._overrides.to, this._core)(this.getPosition(false), t)
    };
    i.prototype.to = function (t, n, r) {
        var i;
        if (!r) {
            i = this._pages.length;
            e.proxy(this._overrides.to, this._core)(this._pages[(t % i + i) % i].start, n)
        } else {
            e.proxy(this._overrides.to, this._core)(t, n)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Navigation = i
})(window.Zepto || window.jQuery, window, document);
(function (e, t, n, r) {
    "use strict";
    var i = function (n) {
        this._core = n;
        this._hashes = {};
        this.$element = this._core.$element;
        this._handlers = {
            "initialized.owl.carousel": e.proxy(function () {
                if (this._core.settings.startPosition == "URLHash") {
                    e(t).trigger("hashchange.owl.navigation")
                }
            }, this), "prepared.owl.carousel": e.proxy(function (t) {
                var n = e(t.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[n] = t.content
            }, this)
        };
        this._core.options = e.extend({}, i.Defaults, this._core.options);
        this.$element.on(this._handlers);
        e(t).on("hashchange.owl.navigation", e.proxy(function () {
            var e = t.location.hash.substring(1), n = this._core.$stage.children(), r = this._hashes[e] && n.index(this._hashes[e]) || 0;
            if (!e) {
                return false
            }
            this._core.to(r, false, true)
        }, this))
    };
    i.Defaults = {URLhashListener: false};
    i.prototype.destroy = function () {
        var n, r;
        e(t).off("hashchange.owl.navigation");
        for (n in this._handlers) {
            this._core.$element.off(n, this._handlers[n])
        }
        for (r in Object.getOwnPropertyNames(this)) {
            typeof this[r] != "function" && (this[r] = null)
        }
    };
    e.fn.owlCarousel.Constructor.Plugins.Hash = i
})(window.Zepto || window.jQuery, window, document)