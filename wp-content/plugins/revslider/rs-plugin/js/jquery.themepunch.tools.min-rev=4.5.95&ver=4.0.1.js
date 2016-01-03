/********************************************
 -    THEMEPUNCH TOOLS Ver. 1.0     -
 Last Update of Tools 16.04.2014
 *********************************************/

/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

if (window.disablehammer != true)
    (function (t, e) {
        "use strict";
        function n() {
            if (!i.READY) {
                i.event.determineEventTypes();
                for (var t in i.gestures)i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
                i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0
            }
        }

        var i = function (t, e) {
            return new i.Instance(t, e || {})
        };
        i.defaults = {
            stop_browser_behavior: {
                userSelect: "none",
                touchAction: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        }, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = "ontouchstart"in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT = "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN = "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END = "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function (t, e) {
            var r = this;
            return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function (t) {
                r.enabled && i.detection.startDetect(r, t)
            }), this
        }, i.Instance.prototype = {
            on: function (t, e) {
                for (var n = t.split(" "), i = 0; n.length > i; i++)this.element.addEventListener(n[i], e, !1);
                return this
            }, off: function (t, e) {
                for (var n = t.split(" "), i = 0; n.length > i; i++)this.element.removeEventListener(n[i], e, !1);
                return this
            }, trigger: function (t, e) {
                var n = i.DOCUMENT.createEvent("Event");
                n.initEvent(t, !0, !0), n.gesture = e;
                var r = this.element;
                return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this
            }, enable: function (t) {
                return this.enabled = t, this
            }
        };
        var r = null, o = !1, s = !1;
        i.event = {
            bindDom: function (t, e, n) {
                for (var i = e.split(" "), r = 0; i.length > r; r++)t.addEventListener(i[r], n, !1)
            }, onTouch: function (t, e, n) {
                var a = this;
                this.bindDom(t, i.EVENT_TYPES[e], function (c) {
                    var u = c.type.toLowerCase();
                    if (!u.match(/mouse/) || !s) {
                        (u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
                        var h = 0;
                        o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset())
                    }
                })
            }, determineEventTypes: function () {
                var t;
                t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2]
            }, getTouchList: function (t) {
                return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{
                    identifier: 1,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    target: t.target
                }]
            }, collectEventData: function (t, e, n) {
                var r = this.getTouchList(n, e), o = i.POINTER_TOUCH;
                return (n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
                    center: i.utils.getCenter(r),
                    timeStamp: (new Date).getTime(),
                    target: n.target,
                    touches: r,
                    eventType: e,
                    pointerType: o,
                    srcEvent: n,
                    preventDefault: function () {
                        this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                    },
                    stopPropagation: function () {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function () {
                        return i.detection.stopDetect()
                    }
                }
            }
        }, i.PointerEvent = {
            pointers: {}, getTouchList: function () {
                var t = this, e = [];
                return Object.keys(t.pointers).sort().forEach(function (n) {
                    e.push(t.pointers[n])
                }), e
            }, updatePointer: function (t, e) {
                return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
            }, matchType: function (t, e) {
                if (!e.pointerType)return !1;
                var n = {};
                return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t]
            }, getEvents: function () {
                return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
            }, reset: function () {
                this.pointers = {}
            }
        }, i.utils = {
            extend: function (t, n, i) {
                for (var r in n)t[r] !== e && i || (t[r] = n[r]);
                return t
            }, hasParent: function (t, e) {
                for (; t;) {
                    if (t == e)return !0;
                    t = t.parentNode
                }
                return !1
            }, getCenter: function (t) {
                for (var e = [], n = [], i = 0, r = t.length; r > i; i++)e.push(t[i].pageX), n.push(t[i].pageY);
                return {
                    pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
                    pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
                }
            }, getVelocity: function (t, e, n) {
                return {x: Math.abs(e / t) || 0, y: Math.abs(n / t) || 0}
            }, getAngle: function (t, e) {
                var n = e.pageY - t.pageY, i = e.pageX - t.pageX;
                return 180 * Math.atan2(n, i) / Math.PI
            }, getDirection: function (t, e) {
                var n = Math.abs(t.pageX - e.pageX), r = Math.abs(t.pageY - e.pageY);
                return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN
            }, getDistance: function (t, e) {
                var n = e.pageX - t.pageX, i = e.pageY - t.pageY;
                return Math.sqrt(n * n + i * i)
            }, getScale: function (t, e) {
                return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
            }, getRotation: function (t, e) {
                return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
            }, isVertical: function (t) {
                return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
            }, stopDefaultBrowserBehavior: function (t, e) {
                var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
                if (e && t.style) {
                    for (var r = 0; i.length > r; r++)for (var o in e)e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                    "none" == e.userSelect && (t.onselectstart = function () {
                        return !1
                    })
                }
            }
        }, i.detection = {
            gestures: [], current: null, previous: null, stopped: !1, startDetect: function (t, e) {
                this.current || (this.stopped = !1, this.current = {
                    inst: t,
                    startEvent: i.utils.extend({}, e),
                    lastEvent: !1,
                    name: ""
                }, this.detect(e))
            }, detect: function (t) {
                if (this.current && !this.stopped) {
                    t = this.extendEventData(t);
                    for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
                        var o = this.gestures[n];
                        if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                            this.stopDetect();
                            break
                        }
                    }
                    return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
                }
            }, stopDetect: function () {
                this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0
            }, extendEventData: function (t) {
                var e = this.current.startEvent;
                if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                    e.touches = [];
                    for (var n = 0, r = t.touches.length; r > n; n++)e.touches.push(i.utils.extend({}, t.touches[n]))
                }
                var o = t.timeStamp - e.timeStamp, s = t.center.pageX - e.center.pageX, a = t.center.pageY - e.center.pageY, c = i.utils.getVelocity(o, s, a);
                return i.utils.extend(t, {
                    deltaTime: o,
                    deltaX: s,
                    deltaY: a,
                    velocityX: c.x,
                    velocityY: c.y,
                    distance: i.utils.getDistance(e.center, t.center),
                    angle: i.utils.getAngle(e.center, t.center),
                    direction: i.utils.getDirection(e.center, t.center),
                    scale: i.utils.getScale(e.touches, t.touches),
                    rotation: i.utils.getRotation(e.touches, t.touches),
                    startEvent: e
                }), t
            }, register: function (t) {
                var n = t.defaults || {};
                return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function (t, e) {
                    return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
                }), this.gestures
            }
        }, i.gestures = i.gestures || {}, i.gestures.Hold = {
            name: "hold",
            index: 10,
            defaults: {hold_timeout: 500, hold_threshold: 1},
            timer: null,
            handler: function (t, e) {
                switch (t.eventType) {
                    case i.EVENT_START:
                        clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function () {
                            "hold" == i.detection.current.name && e.trigger("hold", t)
                        }, e.options.hold_timeout);
                        break;
                    case i.EVENT_MOVE:
                        t.distance > e.options.hold_threshold && clearTimeout(this.timer);
                        break;
                    case i.EVENT_END:
                        clearTimeout(this.timer)
                }
            }
        }, i.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: !0,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            handler: function (t, e) {
                if (t.eventType == i.EVENT_END) {
                    var n = i.detection.previous, r = !1;
                    if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance)return;
                    n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
                }
            }
        }, i.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {swipe_max_touches: 1, swipe_velocity: .7},
            handler: function (t, e) {
                if (t.eventType == i.EVENT_END) {
                    if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches)return;
                    (t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
                }
            }
        }, i.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                drag_max_touches: 1,
                drag_block_horizontal: !1,
                drag_block_vertical: !1,
                drag_lock_to_axis: !1,
                drag_lock_min_distance: 25
            },
            triggered: !1,
            handler: function (t, n) {
                if (i.detection.current.name != this.name && this.triggered)return n.trigger(this.name + "end", t), this.triggered = !1, e;
                if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches))switch (t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        if (t.distance < n.options.drag_min_distance && i.detection.current.name != this.name)return;
                        i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                        var r = i.detection.current.lastEvent.direction;
                        t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? 0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN : 0 > t.deltaX ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && i.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                }
            }
        }, i.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {transform_min_scale: .01, transform_min_rotation: 1, transform_always_block: !1},
            triggered: !1,
            handler: function (t, n) {
                if (i.detection.current.name != this.name && this.triggered)return n.trigger(this.name + "end", t), this.triggered = !1, e;
                if (!(2 > t.touches.length))switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        var r = Math.abs(1 - t.scale), o = Math.abs(t.rotation);
                        if (n.options.transform_min_scale > r && n.options.transform_min_rotation > o)return;
                        i.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger("rotate", t), r > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (1 > t.scale ? "in" : "out"), t));
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
                }
            }
        }, i.gestures.Touch = {
            name: "touch",
            index: -1 / 0,
            defaults: {prevent_default: !1, prevent_mouseevents: !1},
            handler: function (t, n) {
                return n.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default && t.preventDefault(), t.eventType == i.EVENT_START && n.trigger(this.name, t), e)
            }
        }, i.gestures.Release = {
            name: "release", index: 1 / 0, handler: function (t, e) {
                t.eventType == i.EVENT_END && e.trigger(this.name, t)
            }
        }, "object" == typeof module && "object" == typeof module.exports ? module.exports = i : (t.Hammer = i, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function () {
            return i
        }))
    })(this), function (t, e) {
        "use strict";
        t !== e && (Hammer.event.bindDom = function (n, i, r) {
            t(n).on(i, function (t) {
                var n = t.originalEvent || t;
                n.pageX === e && (n.pageX = t.pageX, n.pageY = t.pageY), n.target || (n.target = t.target), n.which === e && (n.which = n.button), n.preventDefault || (n.preventDefault = t.preventDefault), n.stopPropagation || (n.stopPropagation = t.stopPropagation), r.call(this, n)
            })
        }, Hammer.Instance.prototype.on = function (e, n) {
            return t(this.element).on(e, n)
        }, Hammer.Instance.prototype.off = function (e, n) {
            return t(this.element).off(e, n)
        }, Hammer.Instance.prototype.trigger = function (e, n) {
            var i = t(this.element);
            return i.has(n.target).length && (i = t(n.target)), i.trigger({type: e, gesture: n})
        }, t.fn.hammer = function (e) {
            return this.each(function () {
                var n = t(this), i = n.data("hammer");
                i ? i && e && Hammer.utils.extend(i.options, e) : n.data("hammer", new Hammer(this, e || {}))
            })
        })
    }(window.jQuery || window.Zepto);


if (typeof(console) === 'undefined') {
    var console = {}
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () {
    };
}


console.groupCollapsed("ThemePunch GreenSocks Logs");


var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = window.GreenSockGlobals = {};

console.info("Build GreenSock SandBox for ThemePunch Plugins");
console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");


/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t) {
    "use strict";
    var e = t.GreenSockGlobals || t;
    if (!e.TweenLite) {
        var i, s, n, r, a, o = function (t) {
            var i, s = t.split("."), n = e;
            for (i = 0; s.length > i; i++)n[s[i]] = n = n[s[i]] || {};
            return n
        }, l = o("com.greensock"), h = 1e-10, _ = [].slice, u = function () {
        }, m = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
            }
        }(), f = {}, p = function (i, s, n, r) {
            this.sc = f[i] ? f[i].sc : [], f[i] = this, this.gsClass = null, this.func = n;
            var a = [];
            this.check = function (l) {
                for (var h, _, u, m, c = s.length, d = c; --c > -1;)(h = f[s[c]] || new p(s[c], [])).gsClass ? (a[c] = h.gsClass, d--) : l && h.sc.push(this);
                if (0 === d && n)for (_ = ("com.greensock." + i).split("."), u = _.pop(), m = o(_.join("."))[u] = this.gsClass = n.apply(n, a), r && (e[u] = m, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function () {
                    return m
                }) : "undefined" != typeof module && module.exports && (module.exports = m)), c = 0; this.sc.length > c; c++)this.sc[c].check()
            }, this.check(!0)
        }, c = t._gsDefine = function (t, e, i, s) {
            return new p(t, e, i, s)
        }, d = l._class = function (t, e, i) {
            return e = e || function () {
            }, c(t, [], function () {
                return e
            }, i), e
        };
        c.globals = e;
        var v = [0, 0, 1, 1], g = [], T = d("easing.Ease", function (t, e, i, s) {
            this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? v.concat(e) : v
        }, !0), y = T.map = {}, w = T.register = function (t, e, i, s) {
            for (var n, r, a, o, h = e.split(","), _ = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)for (r = h[_], n = s ? d("easing." + r, null, !0) : l.easing[r] || {}, a = u.length; --a > -1;)o = u[a], y[r + "." + o] = y[o + r] = n[o] = t.getRatio ? t : t[o] || new t
        };
        for (n = T.prototype, n._calcEnd = !1, n.getRatio = function (t) {
            if (this._func)return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
        }, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = i.length; --s > -1;)n = i[s] + ",Power" + s, w(new T(null, null, 1, s), n, "easeOut", !0), w(new T(null, null, 2, s), n, "easeIn" + (0 === s ? ",easeNone" : "")), w(new T(null, null, 3, s), n, "easeInOut");
        y.linear = l.easing.Linear.easeIn, y.swing = l.easing.Quad.easeInOut;
        var P = d("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        n = P.prototype, n.addEventListener = function (t, e, i, s, n) {
            n = n || 0;
            var o, l, h = this._listeners[t], _ = 0;
            for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;)o = h[l], o.c === e && o.s === i ? h.splice(l, 1) : 0 === _ && n > o.pr && (_ = l + 1);
            h.splice(_, 0, {c: e, s: i, up: s, pr: n}), this !== r || a || r.wake()
        }, n.removeEventListener = function (t, e) {
            var i, s = this._listeners[t];
            if (s)for (i = s.length; --i > -1;)if (s[i].c === e)return s.splice(i, 1), void 0
        }, n.dispatchEvent = function (t) {
            var e, i, s, n = this._listeners[t];
            if (n)for (e = n.length, i = this._eventTarget; --e > -1;)s = n[e], s.up ? s.c.call(s.s || i, {
                type: t,
                target: i
            }) : s.c.call(s.s || i)
        };
        var k = t.requestAnimationFrame, b = t.cancelAnimationFrame, A = Date.now || function () {
                return (new Date).getTime()
            }, S = A();
        for (i = ["ms", "moz", "webkit", "o"], s = i.length; --s > -1 && !k;)k = t[i[s] + "RequestAnimationFrame"], b = t[i[s] + "CancelAnimationFrame"] || t[i[s] + "CancelRequestAnimationFrame"];
        d("Ticker", function (t, e) {
            var i, s, n, o, l, _ = this, m = A(), f = e !== !1 && k, p = 500, c = 33, d = function (t) {
                var e, r, a = A() - S;
                a > p && (m += a - c), S += a, _.time = (S - m) / 1e3, e = _.time - l, (!i || e > 0 || t === !0) && (_.frame++, l += e + (e >= o ? .004 : o - e), r = !0), t !== !0 && (n = s(d)), r && _.dispatchEvent("tick")
            };
            P.call(_), _.time = _.frame = 0, _.tick = function () {
                d(!0)
            }, _.lagSmoothing = function (t, e) {
                p = t || 1 / h, c = Math.min(e, p, 0)
            }, _.sleep = function () {
                null != n && (f && b ? b(n) : clearTimeout(n), s = u, n = null, _ === r && (a = !1))
            }, _.wake = function () {
                null !== n ? _.sleep() : _.frame > 10 && (S = A() - p + 5), s = 0 === i ? u : f && k ? k : function (t) {
                    return setTimeout(t, 0 | 1e3 * (l - _.time) + 1)
                }, _ === r && (a = !0), d(2)
            }, _.fps = function (t) {
                return arguments.length ? (i = t, o = 1 / (i || 60), l = this.time + o, _.wake(), void 0) : i
            }, _.useRAF = function (t) {
                return arguments.length ? (_.sleep(), f = t, _.fps(i), void 0) : f
            }, _.fps(t), setTimeout(function () {
                f && (!n || 5 > _.frame) && _.useRAF(!1)
            }, 1500)
        }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
        var x = d("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                a || r.wake();
                var i = this.vars.useFrames ? Q : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        r = x.ticker = new l.Ticker, n = x.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
        var C = function () {
            a && A() - S > 2e3 && r.wake(), setTimeout(C, 2e3)
        };
        C(), n.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, n.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, n.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, n.seek = function (t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, n.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, n.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, n.render = function () {
        }, n.invalidate = function () {
            return this
        }, n.isActive = function () {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        }, n._enabled = function (t, e) {
            return a || r.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, n._kill = function () {
            return this._enabled(!1, !1)
        }, n.kill = function (t, e) {
            return this._kill(t, e), this
        }, n._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;)e._dirty = !0, e = e.timeline;
            return this
        }, n._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
            return i
        }, n.eventCallback = function (t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length)return n[t];
                null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, n.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, n.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, n.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, n.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, n.totalTime = function (t, e, i) {
            if (a || r.wake(), !arguments.length)return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration, n = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)for (; n._timeline;)n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), z.length && q())
            }
            return this
        }, n.progress = n.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        }, n.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, n.timeScale = function (t) {
            if (!arguments.length)return this._timeScale;
            if (t = t || h, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, n.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, n.paused = function (t) {
            if (!arguments.length)return this._paused;
            if (t != this._paused && this._timeline) {
                a || t || r.wake();
                var e = this._timeline, i = e.rawTime(), s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var R = d("core.SimpleTimeline", function (t) {
            x.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        n = R.prototype = new x, n.constructor = R, n.kill()._gc = !1, n._first = n._last = null, n._sortChildren = !1, n.add = n.insert = function (t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)for (s = t._startTime; i && i._startTime > s;)i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, n._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
        }, n.render = function (t, e, i) {
            var s, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;)s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s
        }, n.rawTime = function () {
            return a || r.wake(), this._totalTime
        };
        var D = d("TweenLite", function (e, i, s) {
            if (x.call(this, i, s), this.render = D.prototype.render, null == e)throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var n, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? G[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])for (this._targets = a = _.call(e, 0), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++)r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(_.call(r, 0))) : (this._siblings[n] = M(r, this, !1), 1 === l && this._siblings[n].length > 1 && $(r, this, null, 1, this._siblings[n])) : (r = a[n--] = D.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1); else this._propLookup = {}, this._siblings = M(e, this, !1), 1 === l && this._siblings.length > 1 && $(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h, this.render(-this._delay))
        }, !0), I = function (e) {
            return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, E = function (t, e) {
            var i, s = {};
            for (i in t)j[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!L[i] || L[i] && L[i]._autoCSS) || (s[i] = t[i], delete t[i]);
            t.css = s
        };
        n = D.prototype = new x, n.constructor = D, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, D.version = "1.12.1", D.defaultEase = n._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = r, D.autoSleep = !0, D.lagSmoothing = function (t, e) {
            r.lagSmoothing(t, e)
        }, D.selector = t.$ || t.jQuery || function (e) {
            return t.$ ? (D.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
        };
        var z = [], O = {}, N = D._internals = {
            isArray: m,
            isSelector: I,
            lazyTweens: z
        }, L = D._plugins = {}, U = N.tweenLookup = {}, F = 0, j = N.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1
        }, G = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }, Q = x._rootFramesTimeline = new R, B = x._rootTimeline = new R, q = function () {
            var t = z.length;
            for (O = {}; --t > -1;)i = z[t], i && i._lazy !== !1 && (i.render(i._lazy, !1, !0), i._lazy = !1);
            z.length = 0
        };
        B._startTime = r.time, Q._startTime = r.frame, B._active = Q._active = !0, setTimeout(q, 1), x._updateRoot = D.render = function () {
            var t, e, i;
            if (z.length && q(), B.render((r.time - B._startTime) * B._timeScale, !1, !1), Q.render((r.frame - Q._startTime) * Q._timeScale, !1, !1), z.length && q(), !(r.frame % 120)) {
                for (i in U) {
                    for (e = U[i].tweens, t = e.length; --t > -1;)e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete U[i]
                }
                if (i = B._first, (!i || i._paused) && D.autoSleep && !Q._first && 1 === r._listeners.tick.length) {
                    for (; i && i._paused;)i = i._next;
                    i || r.sleep()
                }
            }
        }, r.addEventListener("tick", x._updateRoot);
        var M = function (t, e, i) {
            var s, n, r = t._gsTweenID;
            if (U[r || (t._gsTweenID = r = "t" + F++)] || (U[r] = {
                    target: t,
                    tweens: []
                }), e && (s = U[r].tweens, s[n = s.length] = e, i))for (; --n > -1;)s[n] === e && s.splice(n, 1);
            return U[r].tweens
        }, $ = function (t, e, i, s, n) {
            var r, a, o, l;
            if (1 === s || s >= 4) {
                for (l = n.length, r = 0; l > r; r++)if ((o = n[r]) !== e)o._gc || o._enabled(!1, !1) && (a = !0); else if (5 === s)break;
                return a
            }
            var _, u = e._startTime + h, m = [], f = 0, p = 0 === e._duration;
            for (r = n.length; --r > -1;)(o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (_ = _ || K(e, 0, p), 0 === K(o, _, p) && (m[f++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (m[f++] = o)));
            for (r = f; --r > -1;)o = m[r], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
            return a
        }, K = function (t, e, i) {
            for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
                if (r += s._startTime, n *= s._timeScale, s._paused)return -100;
                s = s._timeline
            }
            return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * h > r - e ? h : (r += t.totalDuration() / t._timeScale / n) > e + h ? 0 : r - e - h
        };
        n._init = function () {
            var t, e, i, s, n, r = this.vars, a = this._overwrittenProps, o = this._duration, l = !!r.immediateRender, h = r.ease;
            if (r.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                for (s in r.startAt)n[s] = r.startAt[s];
                if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = D.to(this.target, 0, n), l)if (this._time > 0)this._startAt = null; else if (0 !== o)return
            } else if (r.runBackwards && 0 !== o)if (this._startAt)this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                i = {};
                for (s in r)j[s] && "autoCSS" !== s || (i[s] = r[s]);
                if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = D.to(this.target, 0, i), l) {
                    if (0 === this._time)return
                } else this._startAt._init(), this._startAt._enabled(!1)
            }
            if (this._ease = h ? h instanceof T ? r.easeParams instanceof Array ? h.config.apply(h, r.easeParams) : h : "function" == typeof h ? new T(h, r.easeParams) : y[h] || D.defaultEase : D.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (t = this._targets.length; --t > -1;)this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)for (i = this._firstPT; i;)i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = r.onUpdate, this._initted = !0
        }, n._initProps = function (e, i, s, n) {
            var r, a, o, l, h, _;
            if (null == e)return !1;
            O[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && L.css && this.vars.autoCSS !== !1 && E(this.vars, e);
            for (r in this.vars) {
                if (_ = this.vars[r], j[r])_ && (_ instanceof Array || _.push && m(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this)); else if (L[r] && (l = new L[r])._onInitTween(e, this.vars[r], this)) {
                    for (this._firstPT = h = {
                        _next: this._firstPT,
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: r,
                        pg: !0,
                        pr: l._priority
                    }, a = l._overwriteProps.length; --a > -1;)i[l._overwriteProps[a]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[r] = h = {
                    _next: this._firstPT,
                    t: e,
                    p: r,
                    f: "function" == typeof e[r],
                    n: r,
                    pg: !1,
                    pr: 0
                }, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;
                h && h._next && (h._next._prev = h)
            }
            return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && $(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (O[e._gsTweenID] = !0), o)
        }, n.render = function (t, e, i) {
            var s, n, r, a, o = this._time, l = this._duration, _ = this._rawPrevTime;
            if (t >= l)this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > _ || _ === h) && _ !== t && (i = !0, _ > h && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || _ === t ? t : h); else if (1e-7 > t)this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && _ > 0 && _ !== h) && (n = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (_ >= 0 && (i = !0), this._rawPrevTime = a = !e || t || _ === t ? t : h)) : this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / l, m = this._easeType, f = this._easePower;
                (1 === m || 3 === m && u >= .5) && (u = 1 - u), 3 === m && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === m ? 1 - u : 2 === m ? u : .5 > t / l ? u / 2 : 1 - u / 2
            } else this.ratio = this._ease.getRatio(t / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))return this._time = this._totalTime = o, this._rawPrevTime = _, z.push(this), this._lazy = t, void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || g))), r = this._firstPT; r;)r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || g)), n && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || g), 0 === l && this._rawPrevTime === h && a !== h && (this._rawPrevTime = 0)))
            }
        }, n._kill = function (t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
            var i, s, n, r, a, o, l, h;
            if ((m(e) || I(e)) && "number" != typeof e[0])for (i = e.length; --i > -1;)this._kill(t, e[i]) && (o = !0); else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)if (e === this._targets[i]) {
                        a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target)return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    l = t || a, h = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
                    for (n in l)(r = a[n]) && (r.pg && r.t._kill(l) && (o = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete a[n]), h && (s[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return o
        }, n.invalidate = function () {
            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this
        }, n._enabled = function (t, e) {
            if (a || r.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)for (i = s.length; --i > -1;)this._siblings[i] = M(s[i], this, !0); else this._siblings = M(this.target, this, !0)
            }
            return x.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, D.to = function (t, e, i) {
            return new D(t, e, i)
        }, D.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
        }, D.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s)
        }, D.delayedCall = function (t, e, i, s, n) {
            return new D(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        }, D.set = function (t, e) {
            return new D(t, 0, e)
        }, D.getTweensOf = function (t, e) {
            if (null == t)return [];
            t = "string" != typeof t ? t : D.selector(t) || t;
            var i, s, n, r;
            if ((m(t) || I(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;)s = s.concat(D.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;)for (r = s[i], n = i; --n > -1;)r === s[n] && s.splice(i, 1)
            } else for (s = M(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = D.getTweensOf(t, e), n = s.length; --n > -1;)s[n]._kill(i, t)
        };
        var H = d("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = H.prototype
        }, !0);
        if (n = H.prototype, H.version = "1.10.1", H.API = 2, n._firstPT = null, n._addTween = function (t, e, i, s, n, r) {
                var a, o;
                return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: a,
                    f: "function" == typeof t[e],
                    n: n || e,
                    r: r
                }, o._next && (o._next._prev = o), o) : void 0
            }, n.setRatio = function (t) {
                for (var e, i = this._firstPT, s = 1e-6; i;)e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, n._kill = function (t) {
                var e, i = this._overwriteProps, s = this._firstPT;
                if (null != t[this._propName])this._overwriteProps = []; else for (e = i.length; --e > -1;)null != t[i[e]] && i.splice(e, 1);
                for (; s;)null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, n._roundProps = function (t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, D._onPluginEvent = function (t, e) {
                var i, s, n, r, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = n; s && s.pr > o.pr;)s = s._next;
                        (o._prev = s ? s._prev : r) ? o._prev._next = o : n = o, (o._next = s) ? s._prev = o : r = o, o = a
                    }
                    o = e._firstPT = n
                }
                for (; o;)o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, H.activate = function (t) {
                for (var e = t.length; --e > -1;)t[e].API === H.API && (L[(new t[e])._propName] = t[e]);
                return !0
            }, c.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API))throw"illegal plugin definition.";
                var e, i = t.propName, s = t.priority || 0, n = t.overwriteProps, r = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, a = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                    H.call(this, i, s), this._overwriteProps = n || []
                }, t.global === !0), o = a.prototype = new H(i);
                o.constructor = a, a.API = t.API;
                for (e in r)"function" == typeof t[e] && (o[r[e]] = t[e]);
                return a.version = t.version, H.activate([a]), a
            }, i = t._gsQueue) {
            for (s = 0; i.length > s; s++)i[s]();
            for (n in f)f[n].func || t.console.log("GSAP encountered missing dependency: com.greensock." + n)
        }
        a = !1
    }
})(window);


/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
            e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var i, s, r = this.vars;
            for (s in r)i = r[s], a(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
            a(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }, r = 1e-10, n = i._internals.isSelector, a = i._internals.isArray, o = [], h = window._gsDefine.globals, l = function (t) {
            var e, i = {};
            for (e in t)i[e] = t[e];
            return i
        }, _ = function (t, e, i, s) {
            t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || o)
        }, u = o.slice, f = s.prototype = new e;
        return s.version = "1.12.1", f.constructor = s, f.kill()._gc = !1, f.to = function (t, e, s, r) {
            var n = s.repeat && h.TweenMax || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
        }, f.from = function (t, e, s, r) {
            return this.add((s.repeat && h.TweenMax || i).from(t, e, s), r)
        }, f.fromTo = function (t, e, s, r, n) {
            var a = r.repeat && h.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }, f.staggerTo = function (t, e, r, a, o, h, _, f) {
            var p, c = new s({
                onComplete: h,
                onCompleteParams: _,
                onCompleteScope: f,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = u.call(t, 0)), a = a || 0, p = 0; t.length > p; p++)r.startAt && (r.startAt = l(r.startAt)), c.to(t[p], e, l(r), p * a);
            return this.add(c, o)
        }, f.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
        }, f.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
        }, f.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }, f.set = function (t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
        }, s.exportRoot = function (t, e) {
            t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
            return o.add(a, 0), a
        }, f.add = function (r, n, o, h) {
            var l, _, u, f, p, c;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && a(r)) {
                    for (o = o || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++)a(f = r[u]) && (f = new s({tweens: f})), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === o ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), l += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)return this.addLabel(r, n);
                if ("function" != typeof r)throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())for (p = this, c = p.rawTime() > r._startTime; p._timeline;)c && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
            return this
        }, f.remove = function (e) {
            if (e instanceof t)return this._remove(e, !1);
            if (e instanceof Array || e && e.push && a(e)) {
                for (var i = e.length; --i > -1;)this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, f._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, f.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, f.insert = f.insertMultiple = function (t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }, f.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }, f.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, f.addPause = function (t, e, i, s) {
            return this.call(_, ["{self}", e, i, s], this, t)
        }, f.removeLabel = function (t) {
            return delete this._labels[t], this
        }, f.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, f._parseTimeOrLabel = function (e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this)this.remove(r); else if (r && (r instanceof Array || r.push && a(r)))for (n = r.length; --n > -1;)r[n]instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i)return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])null == e && (e = this.duration()); else {
                if (n = e.indexOf("="), -1 === n)return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
            }
            return Number(e) + i
        }, f.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }, f.stop = function () {
            return this.paused(!0)
        }, f.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, f.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, f.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration, u = this._time, f = this._startTime, p = this._timeScale, c = this._paused;
            if (t >= _ ? (this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = _ + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (h = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= u)for (s = this._first; s && (a = s._next, !this._paused || c);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, !this._paused || c);)(s._active || u >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), h && (this._gc || (f === this._startTime || p !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || o)))
            }
        }, f._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof s && t._hasPausedChild())return !0;
                t = t._next
            }
            return !1
        }, f.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a;)r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
            return n
        }, f.getTweensOf = function (t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a
        }, f._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this)return !0;
                e = e.timeline
            }
            return !1
        }, f.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r;)r._startTime >= i && (r._startTime += t), r = r._next;
            if (e)for (s in n)n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }, f._kill = function (t, e) {
            if (!t && !e)return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)i[s]._kill(t, e) && (r = !0);
            return r
        }, f.clear = function (t) {
            var e = this.getChildren(!1, !0, !0), i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;)e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0)
        }, f.invalidate = function () {
            for (var t = this._first; t;)t.invalidate(), t = t._next;
            return this
        }, f._enabled = function (t, i) {
            if (t === this._gc)for (var s = this._first; s;)s._enabled(t, !0), s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }, f.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, f.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r;)e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                    this._duration = this._totalDuration = s, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
        }, f.usesFrames = function () {
            for (var e = this._timeline; e._timeline;)e = e._timeline;
            return e === t._rootFramesTimeline
        }, f.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, s
    }, !0)
}), window._gsDefine && window._gsQueue.pop()();


/*!
 * VERSION: beta 1.9.3
 * DATE: 2013-04-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, i, s, r = window.GreenSockGlobals || window, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, h = n._class, l = function (e, i) {
            var s = h("easing." + e, function () {
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, s
        }, _ = t.register || function () {
            }, u = function (t, e, i, s) {
            var r = h("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new s}, !0);
            return _(r, t), r
        }, c = function (t, e, i) {
            this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
        }, f = function (e, i) {
            var s = h("easing." + e, function (t) {
                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, r.config = function (t) {
                return new s(t)
            }, s
        }, p = u("Back", f("BackOut", function (t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), f("BackIn", function (t) {
            return t * t * ((this._p1 + 1) * t - this._p1)
        }), f("BackInOut", function (t) {
            return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })), m = h("easing.SlowMo", function (t, e, i) {
            e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
        }, !0), d = m.prototype = new t;
        return d.constructor = m, d.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
            return new m(t, e, i)
        }, e = h("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, d.config = e.config = function (t) {
            return new e(t)
        }, i = h("easing.RoughEase", function (e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;)i = p ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), p ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                x: i,
                y: s
            };
            for (l.sort(function (t, e) {
                return t.x - e.x
            }), o = new c(1, 1, null), f = u; --f > -1;)a = l[f], o = new c(a.x, a.y, o);
            this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
        }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;)e = e.next;
                e = e.prev
            } else for (; e.prev && e.t >= t;)e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, d.config = function (t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), s = function (e, i, s) {
            var r = h("easing." + e, function (t, e) {
                this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
            }, !0), n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
                return new r(t, e)
            }, r
        }, u("Elastic", s("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .3), s("ElasticIn", function (t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
        }, .3), s("ElasticInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .45)), u("Expo", l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function (t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function (t) {
            return Math.sin(t * o)
        }), l("SineIn", function (t) {
            return -Math.cos(t * o) + 1
        }), l("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), h("easing.EaseLookup", {
            find: function (e) {
                return t.map[e]
            }
        }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), p
    }, !0)
}), window._gsDefine && window._gsQueue.pop()();

/*!
 * VERSION: 1.12.1
 * DATE: 2014-06-26
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
        var i, r, s, n, a = function () {
            t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
        }, o = {}, l = a.prototype = new t("css");
        l.constructor = a, a.version = "1.12.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", l = "px", a.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l,
            lineHeight: ""
        };
        var h, u, f, _, p, c, d = /(?:\d|\-\d|\.\d|\-\.\d)+/g, m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /[^\d\-\.]/g, y = /(?:\d|\-|\+|=|#|\.)*/g, T = /opacity *= *([^)]*)/i, w = /opacity:([^;]*)/i, x = /alpha\(opacity *=.+?\)/i, b = /^(rgb|hsl)/, P = /([A-Z])/g, S = /-([a-z])/gi, C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, R = function (t, e) {
            return e.toUpperCase()
        }, k = /(?:Left|Right|Width)/i, A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, D = /,(?=[^\)]*(?:\(|$))/gi, M = Math.PI / 180, L = 180 / Math.PI, N = {}, X = document, z = X.createElement("div"), I = X.createElement("img"), E = a._internals = {_specialProps: o}, F = navigator.userAgent, Y = function () {
            var t, e = F.indexOf("Android"), i = X.createElement("div");
            return f = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === e || Number(F.substr(e + 8, 1)) > 3), p = f && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), _ = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F) && (c = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
        }(), B = function (t) {
            return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, U = function (t) {
            window.console && console.log(t)
        }, W = "", j = "", V = function (t, e) {
            e = e || z;
            var i, r, s = e.style;
            if (void 0 !== s[t])return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === s[i[r] + t];);
            return r >= 0 ? (j = 3 === r ? "ms" : i[r], W = "-" + j.toLowerCase() + "-", j + t) : null
        }, H = X.defaultView ? X.defaultView.getComputedStyle : function () {
        }, q = a.getStyle = function (t, e, i, r, s) {
            var n;
            return Y || "opacity" !== e ? (!r && t.style[e] ? n = t.style[e] : (i = i || H(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : B(t)
        }, Q = E.convertToPixels = function (t, i, r, s, n) {
            if ("px" === s || !s)return r;
            if ("auto" === s || !r)return 0;
            var o, l, h, u = k.test(i), f = t, _ = z.style, p = 0 > r;
            if (p && (r = -r), "%" === s && -1 !== i.indexOf("border"))o = r / 100 * (u ? t.clientWidth : t.clientHeight); else {
                if (_.cssText = "border:0 solid red;position:" + q(t, "position") + ";line-height:0;", "%" !== s && f.appendChild)_[u ? "borderLeftWidth" : "borderTopWidth"] = r + s; else {
                    if (f = t.parentNode || X.body, l = f._gsCache, h = e.ticker.frame, l && u && l.time === h)return l.width * r / 100;
                    _[u ? "width" : "height"] = r + s
                }
                f.appendChild(z), o = parseFloat(z[u ? "offsetWidth" : "offsetHeight"]), f.removeChild(z), u && "%" === s && a.cacheWidths !== !1 && (l = f._gsCache = f._gsCache || {}, l.time = h, l.width = 100 * (o / r)), 0 !== o || n || (o = Q(t, i, r, s, !0))
            }
            return p ? -o : o
        }, Z = E.calculateOffset = function (t, e, i) {
            if ("absolute" !== q(t, "position", i))return 0;
            var r = "left" === e ? "Left" : "Top", s = q(t, "margin" + r, i);
            return t["offset" + r] - (Q(t, e, parseFloat(s), s.replace(y, "")) || 0)
        }, $ = function (t, e) {
            var i, r, s = {};
            if (e = e || H(t, null))if (i = e.length)for (; --i > -1;)s[e[i].replace(S, R)] = e.getPropertyValue(e[i]); else for (i in e)s[i] = e[i]; else if (e = t.currentStyle || t.style)for (i in e)"string" == typeof i && void 0 === s[i] && (s[i.replace(S, R)] = e[i]);
            return Y || (s.opacity = B(t)), r = Pe(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, xe && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
        }, G = function (t, e, i, r, s) {
            var n, a, o, l = {}, h = t.style;
            for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Z(t, a), void 0 !== h[a] && (o = new fe(h, a, h[a], o)));
            if (r)for (a in r)"className" !== a && (l[a] = r[a]);
            return {difs: l, firstMPT: o}
        }, K = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, J = ["marginLeft", "marginRight", "marginTop", "marginBottom"], te = function (t, e, i) {
            var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), s = K[e], n = s.length;
            for (i = i || H(t, null); --n > -1;)r -= parseFloat(q(t, "padding" + s[n], i, !0)) || 0, r -= parseFloat(q(t, "border" + s[n] + "Width", i, !0)) || 0;
            return r
        }, ee = function (t, e) {
            (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
            var i = t.split(" "), r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0], s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
            return null == s ? s = "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(v, "")), e.oy = parseFloat(s.replace(v, ""))), r + " " + s + (i.length > 2 ? " " + i[2] : "")
        }, ie = function (t, e) {
            return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
        }, re = function (t, e) {
            return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
        }, se = function (t, e, i, r) {
            var s, n, a, o, l = 1e-6;
            return null == t ? o = e : "number" == typeof t ? o = t : (s = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : L) - ("=" === t.charAt(1) ? 0 : e), n.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= s, a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * s) % s - (0 | a / s) * s : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * s) % s - (0 | a / s) * s)), o = e + a), l > o && o > -l && (o = 0), o
        }, ne = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, ae = function (t, e, i) {
            return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
        }, oe = function (t) {
            var e, i, r, s, n, a;
            return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(d), s = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(s + 1 / 3, e, i), t[1] = ae(s, e, i), t[2] = ae(s - 1 / 3, e, i), t) : (t = t.match(d) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
        }, le = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (l in ne)le += "|" + l + "\\b";
        le = RegExp(le + ")", "gi");
        var he = function (t, e, i, r) {
            if (null == t)return function (t) {
                return t
            };
            var s, n = e ? (t.match(le) || [""])[0] : "", a = t.split(n).join("").match(g) || [], o = t.substr(0, t.indexOf(a[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "", h = -1 !== t.indexOf(" ") ? " " : ",", u = a.length, f = u > 0 ? a[0].replace(d, "") : "";
            return u ? s = e ? function (t) {
                var e, _, p, c;
                if ("number" == typeof t)t += f; else if (r && D.test(t)) {
                    for (c = t.replace(D, "|").split("|"), p = 0; c.length > p; p++)c[p] = s(c[p]);
                    return c.join(",")
                }
                if (e = (t.match(le) || [n])[0], _ = t.split(e).join("").match(g) || [], p = _.length, u > p--)for (; u > ++p;)_[p] = i ? _[0 | (p - 1) / 2] : a[p];
                return o + _.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
            } : function (t) {
                var e, n, _;
                if ("number" == typeof t)t += f; else if (r && D.test(t)) {
                    for (n = t.replace(D, "|").split("|"), _ = 0; n.length > _; _++)n[_] = s(n[_]);
                    return n.join(",")
                }
                if (e = t.match(g) || [], _ = e.length, u > _--)for (; u > ++_;)e[_] = i ? e[0 | (_ - 1) / 2] : a[_];
                return o + e.join(h) + l
            } : function (t) {
                return t
            }
        }, ue = function (t) {
            return t = t.split(","), function (e, i, r, s, n, a, o) {
                var l, h = (i + "").split(" ");
                for (o = {}, l = 0; 4 > l; l++)o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return s.parse(e, o, n, a)
            }
        }, fe = (E._setPluginRatio = function (t) {
            this.plugin.setRatio(t);
            for (var e, i, r, s, n = this.data, a = n.proxy, o = n.firstMPT, l = 1e-6; o;)e = a[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
            if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)for (o = n.firstMPT; o;) {
                if (i = o.t, i.type) {
                    if (1 === i.type) {
                        for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++)s += i["xn" + r] + i["xs" + (r + 1)];
                        i.e = s
                    }
                } else i.e = i.s + i.xs0;
                o = o._next
            }
        }, function (t, e, i, r, s) {
            this.t = t, this.p = e, this.v = i, this.r = s, r && (r._prev = this, this._next = r)
        }), _e = (E._parseToProxy = function (t, e, i, r, s, n) {
            var a, o, l, h, u, f = r, _ = {}, p = {}, c = i._transform, d = N;
            for (i._transform = null, N = e, r = u = i.parse(t, e, r, s), N = d, n && (i._transform = c, f && (f._prev = null, f._prev && (f._prev._next = null))); r && r !== f;) {
                if (1 >= r.type && (o = r.p, p[o] = r.s + r.c, _[o] = r.s, n || (h = new fe(r, "s", o, h, r.r), r.c = 0), 1 === r.type))for (a = r.l; --a > 0;)l = "xn" + a, o = r.p + "_" + l, p[o] = r.data[l], _[o] = r[l], n || (h = new fe(r, l, o, h, r.rxp[l]));
                r = r._next
            }
            return {proxy: _, end: p, firstMPT: h, pt: u}
        }, E.CSSPropTween = function (t, e, r, s, a, o, l, h, u, f, _) {
            this.t = t, this.p = e, this.s = r, this.c = s, this.n = l || e, t instanceof _e || n.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === f ? r : f, this.e = void 0 === _ ? r + s : _, a && (this._next = a, a._prev = this)
        }), pe = a.parseComplex = function (t, e, i, r, s, n, a, o, l, u) {
            i = i || n || "", a = new _e(t, e, 0, 0, a, u ? 2 : 1, null, !1, o, i, r), r += "";
            var f, _, p, c, g, v, y, T, w, x, P, S, C = i.split(", ").join(",").split(" "), R = r.split(", ").join(",").split(" "), k = C.length, A = h !== !1;
            for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (C = C.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), k = C.length), k !== R.length && (C = (n || "").split(" "), k = C.length), a.plugin = l, a.setRatio = u, f = 0; k > f; f++)if (c = C[f], g = R[f], T = parseFloat(c), T || 0 === T)a.appendXtra("", T, ie(g, T), g.replace(m, ""), A && -1 !== g.indexOf("px"), !0); else if (s && ("#" === c.charAt(0) || ne[c] || b.test(c)))S = "," === g.charAt(g.length - 1) ? ")," : ")", c = oe(c), g = oe(g), w = c.length + g.length > 6, w && !Y && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[f]).join("transparent")) : (Y || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], w ? "," : S, !0), w && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, S, !1))); else if (v = c.match(d)) {
                if (y = g.match(m), !y || y.length !== v.length)return a;
                for (p = 0, _ = 0; v.length > _; _++)P = v[_], x = c.indexOf(P, p), a.appendXtra(c.substr(p, x - p), Number(P), ie(y[_], P), "", A && "px" === c.substr(x + P.length, 2), 0 === _), p = x + P.length;
                a["xs" + a.l] += c.substr(p)
            } else a["xs" + a.l] += a.l ? " " + c : c;
            if (-1 !== r.indexOf("=") && a.data) {
                for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++)S += a["xs" + f] + a.data["xn" + f];
                a.e = S + a["xs" + f]
            }
            return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
        }, ce = 9;
        for (l = _e.prototype, l.l = l.pr = 0; --ce > 0;)l["xn" + ce] = 0, l["xs" + ce] = "";
        l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (t, e, i, r, s, n) {
            var a = this, o = a.l;
            return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new _e(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {s: e + i}, a.rxp = {}, a.s = e, a.c = i, a.r = s, a)) : (a["xs" + o] += e + (r || ""), a)
        };
        var de = function (t, e) {
            e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || he(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        }, me = E._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = {parser: i});
            var r, s, n = t.split(","), a = e.defaultValue;
            for (i = i || [a], r = 0; n.length > r; r++)e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || a, s = new de(n[r], e)
        }, ge = function (t) {
            if (!o[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                me(t, {
                    parser: function (t, i, r, s, n, a, l) {
                        var h = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                        return h ? (h._cssRegister(), o[r].parse(t, i, r, s, n, a, l)) : (U("Error: " + e + " js file not loaded."), n)
                    }
                })
            }
        };
        l = de.prototype, l.parseComplex = function (t, e, i, r, s, n) {
            var a, o, l, h, u, f, _ = this.keyword;
            if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : _ && (o = [e], l = [i])), l) {
                for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++)e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, _ && (u = e.indexOf(_), f = i.indexOf(_), u !== f && (i = -1 === f ? l : o, i[a] += " " + _));
                e = o.join(", "), i = l.join(", ")
            }
            return pe(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n)
        }, l.parse = function (t, e, i, r, n, a) {
            return this.parseComplex(t.style, this.format(q(t, this.p, s, !1, this.dflt)), this.format(e), n, a)
        }, a.registerSpecialProp = function (t, e, i) {
            me(t, {
                parser: function (t, r, s, n, a, o) {
                    var l = new _e(t, s, 0, 0, a, 2, s, !1, i);
                    return l.plugin = o, l.setRatio = e(t, r, n._tween, s), l
                }, priority: i
            })
        };
        var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(","), ye = V("transform"), Te = W + "transform", we = V("transformOrigin"), xe = null !== V("perspective"), be = E.Transform = function () {
            this.skewY = 0
        }, Pe = E.getTransform = function (t, e, i, r) {
            if (t._gsTransform && i && !r)return t._gsTransform;
            var s, n, o, l, h, u, f, _, p, c, d, m, g, v = i ? t._gsTransform || new be : new be, y = 0 > v.scaleX, T = 2e-5, w = 1e5, x = 179.99, b = x * M, P = xe ? parseFloat(q(t, we, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
            for (ye ? s = q(t, Te, e, !0) : t.currentStyle && (s = t.currentStyle.filter.match(A), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), n = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;)l = Number(n[o]), n[o] = (h = l - (l |= 0)) ? (0 | h * w + (0 > h ? -.5 : .5)) / w + l : l;
            if (16 === n.length) {
                var S = n[8], C = n[9], R = n[10], k = n[12], O = n[13], D = n[14];
                if (v.zOrigin && (D = -v.zOrigin, k = S * D - n[12], O = C * D - n[13], D = R * D + v.zOrigin - n[14]), !i || r || null == v.rotationX) {
                    var N, X, z, I, E, F, Y, B = n[0], U = n[1], W = n[2], j = n[3], V = n[4], H = n[5], Q = n[6], Z = n[7], $ = n[11], G = Math.atan2(Q, R), K = -b > G || G > b;
                    v.rotationX = G * L, G && (I = Math.cos(-G), E = Math.sin(-G), N = V * I + S * E, X = H * I + C * E, z = Q * I + R * E, S = V * -E + S * I, C = H * -E + C * I, R = Q * -E + R * I, $ = Z * -E + $ * I, V = N, H = X, Q = z), G = Math.atan2(S, B), v.rotationY = G * L, G && (F = -b > G || G > b, I = Math.cos(-G), E = Math.sin(-G), N = B * I - S * E, X = U * I - C * E, z = W * I - R * E, C = U * E + C * I, R = W * E + R * I, $ = j * E + $ * I, B = N, U = X, W = z), G = Math.atan2(U, H), v.rotation = G * L, G && (Y = -b > G || G > b, I = Math.cos(-G), E = Math.sin(-G), B = B * I + V * E, X = U * I + H * E, H = U * -E + H * I, Q = W * -E + Q * I, U = X), Y && K ? v.rotation = v.rotationX = 0 : Y && F ? v.rotation = v.rotationY = 0 : F && K && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(B * B + U * U) * w + .5) / w, v.scaleY = (0 | Math.sqrt(H * H + C * C) * w + .5) / w, v.scaleZ = (0 | Math.sqrt(Q * Q + R * R) * w + .5) / w, v.skewX = 0, v.perspective = $ ? 1 / (0 > $ ? -$ : $) : 0, v.x = k, v.y = O, v.z = D
                }
            } else if (!(xe && !r && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === q(t, "display", e))) {
                var J = n.length >= 6, te = J ? n[0] : 1, ee = n[1] || 0, ie = n[2] || 0, re = J ? n[3] : 1;
                v.x = n[4] || 0, v.y = n[5] || 0, u = Math.sqrt(te * te + ee * ee), f = Math.sqrt(re * re + ie * ie), _ = te || ee ? Math.atan2(ee, te) * L : v.rotation || 0, p = ie || re ? Math.atan2(ie, re) * L + _ : v.skewX || 0, c = u - Math.abs(v.scaleX || 0), d = f - Math.abs(v.scaleY || 0), Math.abs(p) > 90 && 270 > Math.abs(p) && (y ? (u *= -1, p += 0 >= _ ? 180 : -180, _ += 0 >= _ ? 180 : -180) : (f *= -1, p += 0 >= p ? 180 : -180)), m = (_ - v.rotation) % 180, g = (p - v.skewX) % 180, (void 0 === v.skewX || c > T || -T > c || d > T || -T > d || m > -x && x > m && false | m * w || g > -x && x > g && false | g * w) && (v.scaleX = u, v.scaleY = f, v.rotation = _, v.skewX = p), xe && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1)
            }
            v.zOrigin = P;
            for (o in v)T > v[o] && v[o] > -T && (v[o] = 0);
            return i && (t._gsTransform = v), v
        }, Se = function (t) {
            var e, i, r = this.data, s = -r.rotation * M, n = s + r.skewX * M, a = 1e5, o = (0 | Math.cos(s) * r.scaleX * a) / a, l = (0 | Math.sin(s) * r.scaleX * a) / a, h = (0 | Math.sin(n) * -r.scaleY * a) / a, u = (0 | Math.cos(n) * r.scaleY * a) / a, f = this.t.style, _ = this.t.currentStyle;
            if (_) {
                i = l, l = -h, h = -i, e = _.filter, f.filter = "";
                var p, d, m = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== _.position, w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u, x = r.x, b = r.y;
                if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, x += p - (p * o + d * l), b += d - (p * h + d * u)), v ? (p = m / 2, d = g / 2, w += ", Dx=" + (p - (p * o + d * l) + x) + ", Dy=" + (d - (p * h + d * u) + b) + ")") : w += ", sizingMethod='auto expand')", f.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && f.removeAttribute("filter")), !v) {
                    var P, S, C, R = 8 > c ? 1 : -1;
                    for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + x), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b), ce = 0; 4 > ce; ce++)S = J[ce], P = _[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Q(this.t, S, parseFloat(P), P.replace(y, "")) || 0, C = i !== r[S] ? 2 > ce ? -r.ieOffsetX : -r.ieOffsetY : 2 > ce ? p - r.ieOffsetX : d - r.ieOffsetY, f[S] = (r[S] = Math.round(i - C * (0 === ce || 2 === ce ? 1 : R))) + "px"
                }
            }
        }, Ce = E.set3DTransformRatio = function (t) {
            var e, i, r, s, n, a, o, l, h, u, f, p, c, d, m, g, v, y, T, w, x, b, P, S = this.data, C = this.t.style, R = S.rotation * M, k = S.scaleX, A = S.scaleY, O = S.scaleZ, D = S.perspective;
            if (!(1 !== t && 0 !== t || "auto" !== S.force3D || S.rotationY || S.rotationX || 1 !== O || D || S.z))return Re.call(this, t), void 0;
            if (_) {
                var L = 1e-4;
                L > k && k > -L && (k = O = 2e-5), L > A && A > -L && (A = O = 2e-5), !D || S.z || S.rotationX || S.rotationY || (D = 0)
            }
            if (R || S.skewX)y = Math.cos(R), T = Math.sin(R), e = y, n = T, S.skewX && (R -= S.skewX * M, y = Math.cos(R), T = Math.sin(R), "simple" === S.skewType && (w = Math.tan(S.skewX * M), w = Math.sqrt(1 + w * w), y *= w, T *= w)), i = -T, a = y; else {
                if (!(S.rotationY || S.rotationX || 1 !== O || D))return C[ye] = "translate3d(" + S.x + "px," + S.y + "px," + S.z + "px)" + (1 !== k || 1 !== A ? " scale(" + k + "," + A + ")" : ""), void 0;
                e = a = 1, i = n = 0
            }
            f = 1, r = s = o = l = h = u = p = c = d = 0, m = D ? -1 / D : 0, g = S.zOrigin, v = 1e5, R = S.rotationY * M, R && (y = Math.cos(R), T = Math.sin(R), h = f * -T, c = m * -T, r = e * T, o = n * T, f *= y, m *= y, e *= y, n *= y), R = S.rotationX * M, R && (y = Math.cos(R), T = Math.sin(R), w = i * y + r * T, x = a * y + o * T, b = u * y + f * T, P = d * y + m * T, r = i * -T + r * y, o = a * -T + o * y, f = u * -T + f * y, m = d * -T + m * y, i = w, a = x, u = b, d = P), 1 !== O && (r *= O, o *= O, f *= O, m *= O), 1 !== A && (i *= A, a *= A, u *= A, d *= A), 1 !== k && (e *= k, n *= k, h *= k, c *= k), g && (p -= g, s = r * p, l = o * p, p = f * p + g), s = (w = (s += S.x) - (s |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + s : s, l = (w = (l += S.y) - (l |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + l : l, p = (w = (p += S.z) - (p |= 0)) ? (0 | w * v + (0 > w ? -.5 : .5)) / v + p : p, C[ye] = "matrix3d(" + [(0 | e * v) / v, (0 | n * v) / v, (0 | h * v) / v, (0 | c * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | u * v) / v, (0 | d * v) / v, (0 | r * v) / v, (0 | o * v) / v, (0 | f * v) / v, (0 | m * v) / v, s, l, p, D ? 1 + -p / D : 1].join(",") + ")"
        }, Re = E.set2DTransformRatio = function (t) {
            var e, i, r, s, n, a = this.data, o = this.t, l = o.style;
            return a.rotationX || a.rotationY || a.z || a.force3D === !0 || "auto" === a.force3D && 1 !== t && 0 !== t ? (this.setRatio = Ce, Ce.call(this, t), void 0) : (a.rotation || a.skewX ? (e = a.rotation * M, i = e - a.skewX * M, r = 1e5, s = a.scaleX * r, n = a.scaleY * r, l[ye] = "matrix(" + (0 | Math.cos(e) * s) / r + "," + (0 | Math.sin(e) * s) / r + "," + (0 | Math.sin(i) * -n) / r + "," + (0 | Math.cos(i) * n) / r + "," + a.x + "," + a.y + ")") : l[ye] = "matrix(" + a.scaleX + ",0,0," + a.scaleY + "," + a.x + "," + a.y + ")", void 0)
        };
        me("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", {
            parser: function (t, e, i, r, n, o, l) {
                if (r._transform)return n;
                var h, u, f, _, p, c, d, m = r._transform = Pe(t, s, !0, l.parseTransform), g = t.style, v = 1e-6, y = ve.length, T = l, w = {};
                if ("string" == typeof T.transform && ye)f = z.style, f[ye] = T.transform, f.display = "block", f.position = "absolute", X.body.appendChild(z), h = Pe(z, null, !1), X.body.removeChild(z); else if ("object" == typeof T) {
                    if (h = {
                            scaleX: re(null != T.scaleX ? T.scaleX : T.scale, m.scaleX),
                            scaleY: re(null != T.scaleY ? T.scaleY : T.scale, m.scaleY),
                            scaleZ: re(T.scaleZ, m.scaleZ),
                            x: re(T.x, m.x),
                            y: re(T.y, m.y),
                            z: re(T.z, m.z),
                            perspective: re(T.transformPerspective, m.perspective)
                        }, d = T.directionalRotation, null != d)if ("object" == typeof d)for (f in d)T[f] = d[f]; else T.rotation = d;
                    h.rotation = se("rotation"in T ? T.rotation : "shortRotation"in T ? T.shortRotation + "_short" : "rotationZ"in T ? T.rotationZ : m.rotation, m.rotation, "rotation", w), xe && (h.rotationX = se("rotationX"in T ? T.rotationX : "shortRotationX"in T ? T.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", w), h.rotationY = se("rotationY"in T ? T.rotationY : "shortRotationY"in T ? T.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", w)), h.skewX = null == T.skewX ? m.skewX : se(T.skewX, m.skewX), h.skewY = null == T.skewY ? m.skewY : se(T.skewY, m.skewY), (u = h.skewY - m.skewY) && (h.skewX += u, h.rotation += u)
                }
                for (xe && null != T.force3D && (m.force3D = T.force3D, c = !0), m.skewType = T.skewType || m.skewType || a.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == T.scale || (h.scaleZ = 1); --y > -1;)i = ve[y], _ = h[i] - m[i], (_ > v || -v > _ || null != N[i]) && (c = !0, n = new _e(m, i, m[i], _, n), i in w && (n.e = w[i]), n.xs0 = 0, n.plugin = o, r._overwriteProps.push(n.n));
                return _ = T.transformOrigin, (_ || xe && p && m.zOrigin) && (ye ? (c = !0, i = we, _ = (_ || q(t, i, s, !1, "50% 50%")) + "", n = new _e(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, xe ? (f = m.zOrigin, _ = _.split(" "), m.zOrigin = (_.length > 2 && (0 === f || "0px" !== _[2]) ? parseFloat(_[2]) : f) || 0, n.xs0 = n.e = _[0] + " " + (_[1] || "50%") + " 0px", n = new _e(m, "zOrigin", 0, 0, n, -1, n.n), n.b = f, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = _) : ee(_ + "", m)), c && (r._transformType = p || 3 === this._transformType ? 3 : 2), n
            }, prefix: !0
        }), me("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), me("borderRadius", {
            defaultValue: "0px", parser: function (t, e, i, n, a) {
                e = this.format(e);
                var o, l, h, u, f, _, p, c, d, m, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], P = t.style;
                for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; b.length > l; l++)this.p.indexOf("border") && (b[l] = V(b[l])), f = u = q(t, b[l], s, !1, "0px"), -1 !== f.indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), _ = h = o[l], p = parseFloat(f), v = f.substr((p + "").length), y = "=" === _.charAt(1), y ? (c = parseInt(_.charAt(0) + "1", 10), _ = _.substr(2), c *= parseFloat(_), g = _.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(_), g = _.substr((c + "").length)), "" === g && (g = r[i] || v), g !== v && (T = Q(t, "borderLeft", p, v), w = Q(t, "borderTop", p, v), "%" === g ? (f = 100 * (T / d) + "%", u = 100 * (w / m) + "%") : "em" === g ? (x = Q(t, "borderLeft", 1, "em"), f = T / x + "em", u = w / x + "em") : (f = T + "px", u = w + "px"), y && (_ = parseFloat(f) + c + g, h = parseFloat(u) + c + g)), a = pe(P, b[l], f + " " + u, _ + " " + h, !1, "0px", a);
                return a
            }, prefix: !0, formatter: he("0px 0px 0px 0px", !1, !0)
        }), me("backgroundPosition", {
            defaultValue: "0 0", parser: function (t, e, i, r, n, a) {
                var o, l, h, u, f, _, p = "background-position", d = s || H(t, null), m = this.format((d ? c ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (_ = q(t, "backgroundImage").replace(C, ""), _ && "none" !== _)) {
                    for (o = m.split(" "), l = g.split(" "), I.setAttribute("src", _), h = 2; --h > -1;)m = o[h], u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (f = 0 === h ? t.offsetWidth - I.width : t.offsetHeight - I.height, o[h] = u ? parseFloat(m) / 100 * f + "px" : 100 * (parseFloat(m) / f) + "%");
                    m = o.join(" ")
                }
                return this.parseComplex(t.style, m, g, n, a)
            }, formatter: ee
        }), me("backgroundSize", {defaultValue: "0 0", formatter: ee}), me("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), me("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), me("transformStyle", {prefix: !0}), me("backfaceVisibility", {prefix: !0}), me("userSelect", {prefix: !0}), me("margin", {parser: ue("marginTop,marginRight,marginBottom,marginLeft")}), me("padding", {parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft")}), me("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, r, n, a) {
                var o, l, h;
                return 9 > c ? (l = t.currentStyle, h = 8 > c ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(q(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
            }
        }), me("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), me("autoRound,strictUnits", {
            parser: function (t, e, i, r, s) {
                return s
            }
        }), me("border", {
            defaultValue: "0px solid #000", parser: function (t, e, i, r, n, a) {
                return this.parseComplex(t.style, this.format(q(t, "borderTopWidth", s, !1, "0px") + " " + q(t, "borderTopStyle", s, !1, "solid") + " " + q(t, "borderTopColor", s, !1, "#000")), this.format(e), n, a)
            }, color: !0, formatter: function (t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(le) || ["#000"])[0]
            }
        }), me("borderWidth", {parser: ue("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), me("float,cssFloat,styleFloat", {
            parser: function (t, e, i, r, s) {
                var n = t.style, a = "cssFloat"in n ? "cssFloat" : "styleFloat";
                return new _e(n, a, 0, 0, s, -1, i, !1, 0, n[a], e)
            }
        });
        var ke = function (t) {
            var e, i = this.t, r = i.filter || q(this.data, "filter"), s = 0 | this.s + this.c * t;
            100 === s && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !q(this.data, "filter")) : (i.filter = r.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"), -1 === r.indexOf("pacity") ? 0 === s && this.xn1 || (i.filter = r + " alpha(opacity=" + s + ")") : i.filter = r.replace(T, "opacity=" + s))
        };
        me("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (t, e, i, r, n, a) {
                var o = parseFloat(q(t, "opacity", s, !1, "1")), l = t.style, h = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === q(t, "visibility", s) && 0 !== e && (o = 0), Y ? n = new _e(l, "opacity", o, e - o, n) : (n = new _e(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = ke), h && (n = new _e(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", r._overwriteProps.push(n.n), r._overwriteProps.push(i)), n
            }
        });
        var Ae = function (t, e) {
            e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
        }, Oe = function (t) {
            if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e;)e.v ? i[e.p] = e.v : Ae(i, e.p), e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        me("className", {
            parser: function (t, e, r, n, a, o, l) {
                var h, u, f, _, p, c = t.getAttribute("class") || "", d = t.style.cssText;
                if (a = n._classNamePT = new _e(t, r, 0, 0, a, 2), a.setRatio = Oe, a.pr = -11, i = !0, a.b = c, u = $(t, s), f = t._gsClassPT) {
                    for (_ = {}, p = f.data; p;)_[p.p] = 1, p = p._next;
                    f.setRatio(1)
                }
                return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), h = G(t, u, $(t), l, _), t.setAttribute("class", c), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)), a
            }
        });
        var De = function (t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, r, s, n = this.t.style, a = o.transform.parse;
                if ("all" === this.e)n.cssText = "", s = !0; else for (e = this.e.split(","), r = e.length; --r > -1;)i = e[r], o[i] && (o[i].parse === a ? s = !0 : i = "transformOrigin" === i ? we : o[i].p), Ae(n, i);
                s && (Ae(n, ye), this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (me("clearProps", {
            parser: function (t, e, r, s, n) {
                return n = new _e(t, r, 0, 0, n, 2), n.setRatio = De, n.e = e, n.pr = -10, n.data = s._tween, i = !0, n
            }
        }), l = "bezier,throwProps,physicsProps,physics2D".split(","), ce = l.length; ce--;)ge(l[ce]);
        l = a.prototype, l._firstPT = null, l._onInitTween = function (t, e, o) {
            if (!t.nodeType)return !1;
            this._target = t, this._tween = o, this._vars = e, h = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, s = H(t, ""), n = this._overwriteProps;
            var l, _, c, d, m, g, v, y, T, x = t.style;
            if (u && "" === x.zIndex && (l = q(t, "zIndex", s), ("auto" === l || "" === l) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (d = x.cssText, l = $(t, s), x.cssText = d + ";" + e, l = G(t, l, $(t)).difs, !Y && w.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, x.cssText = d), this._firstPT = _ = this.parse(t, e, null), this._transformType) {
                for (T = 3 === this._transformType, ye ? f && (u = !0, "" === x.zIndex && (v = q(t, "zIndex", s), ("auto" === v || "" === v) && this._addLazySet(x, "zIndex", 0)), p && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, c = _; c && c._next;)c = c._next;
                y = new _e(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && xe ? Ce : ye ? Re : Se, y.data = this._transform || Pe(t, s, !0), n.pop()
            }
            if (i) {
                for (; _;) {
                    for (g = _._next, c = d; c && c.pr > _.pr;)c = c._next;
                    (_._prev = c ? c._prev : m) ? _._prev._next = _ : d = _, (_._next = c) ? c._prev = _ : m = _, _ = g
                }
                this._firstPT = d
            }
            return !0
        }, l.parse = function (t, e, i, n) {
            var a, l, u, f, _, p, c, d, m, g, v = t.style;
            for (a in e)p = e[a], l = o[a], l ? i = l.parse(t, p, a, this, i, n, e) : (_ = q(t, a, s) + "", m = "string" == typeof p, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && b.test(p) ? (m || (p = oe(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = pe(v, a, _, p, !0, "transparent", i, 0, n)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (u = parseFloat(_), c = u || 0 === u ? _.substr((u + "").length) : "", ("" === _ || "auto" === _) && ("width" === a || "height" === a ? (u = te(t, a, s), c = "px") : "left" === a || "top" === a ? (u = Z(t, a, s), c = "px") : (u = "opacity" !== a ? 0 : 1, c = "")), g = m && "=" === p.charAt(1), g ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), d = p.replace(y, "")) : (f = parseFloat(p), d = m ? p.substr((f + "").length) || "" : ""), "" === d && (d = a in r ? r[a] : c), p = f || 0 === f ? (g ? f + u : f) + d : e[a], c !== d && "" !== d && (f || 0 === f) && u && (u = Q(t, a, u, c), "%" === d ? (u /= Q(t, a, 100, "%") / 100, e.strictUnits !== !0 && (_ = u + "%")) : "em" === d ? u /= Q(t, a, 1, "em") : "px" !== d && (f = Q(t, a, f, d), d = "px"), g && (f || 0 === f) && (p = f + u + d)), g && (f += u), !u && 0 !== u || !f && 0 !== f ? void 0 !== v[a] && (p || "NaN" != p + "" && null != p) ? (i = new _e(v, a, f || u || 0, 0, i, -1, a, !1, 0, _, p), i.xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : _) : U("invalid " + a + " tween value: " + e[a]) : (i = new _e(v, a, u, f - u, i, 0, a, h !== !1 && ("px" === d || "zIndex" === a), 0, _, p), i.xs0 = d)) : i = pe(v, a, _, p, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
            return i
        }, l.setRatio = function (t) {
            var e, i, r, s = this._firstPT, n = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)for (; s;) {
                if (e = s.c * t + s.s, s.r ? e = Math.round(e) : n > e && e > -n && (e = 0), s.type)if (1 === s.type)if (r = s.l, 2 === r)s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2; else if (3 === r)s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3; else if (4 === r)s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4; else if (5 === r)s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5; else {
                    for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++)i += s["xn" + r] + s["xs" + (r + 1)];
                    s.t[s.p] = i
                } else-1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t); else s.t[s.p] = e + s.xs0;
                s = s._next
            } else for (; s;)2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next; else for (; s;)2 !== s.type ? s.t[s.p] = s.e : s.setRatio(t), s = s._next
        }, l._enableTransforms = function (t) {
            this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Pe(this._target, s, !0)
        };
        var Me = function () {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        l._addLazySet = function (t, e, i) {
            var r = this._firstPT = new _e(t, e, 0, 0, this._firstPT, 2);
            r.e = i, r.setRatio = Me, r.data = this
        }, l._linkCSSP = function (t, e, i, r) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
        }, l._kill = function (e) {
            var i, r, s, n = e;
            if (e.autoAlpha || e.alpha) {
                n = {};
                for (r in e)n[r] = e[r];
                n.opacity = 1, n.autoAlpha && (n.visibility = 1)
            }
            return e.className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
        };
        var Le = function (t, e, i) {
            var r, s, n, a;
            if (t.slice)for (s = t.length; --s > -1;)Le(t[s], e, i); else for (r = t.childNodes, s = r.length; --s > -1;)n = r[s], a = n.type, n.style && (e.push($(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Le(n, e, i)
        };
        return a.cascadeTo = function (t, i, r) {
            var s, n, a, o = e.to(t, i, r), l = [o], h = [], u = [], f = [], _ = e._internals.reservedProps;
            for (t = o._targets || o.target, Le(t, h, f), o.render(i, !0), Le(t, u), o.render(0, !0), o._enabled(!0), s = f.length; --s > -1;)if (n = G(f[s], h[s], u[s]), n.firstMPT) {
                n = n.difs;
                for (a in r)_[a] && (n[a] = r[a]);
                l.push(e.to(f[s], i, n))
            }
            return l
        }, t.activate([a]), a
    }, !0)
}), window._gsDefine && window._gsQueue.pop()();


/*!
 * VERSION: beta 0.2.3
 * DATE: 2013-07-10
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t) {
    "use strict";
    var e = t.GreenSockGlobals || t, i = function (t) {
        var i, s = t.split("."), r = e;
        for (i = 0; s.length > i; i++)r[s[i]] = r = r[s[i]] || {};
        return r
    }, s = i("com.greensock.utils"), r = function (t) {
        var e = t.nodeType, i = "";
        if (1 === e || 9 === e || 11 === e) {
            if ("string" == typeof t.textContent)return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling)i += r(t)
        } else if (3 === e || 4 === e)return t.nodeValue;
        return i
    }, n = document, a = n.defaultView ? n.defaultView.getComputedStyle : function () {
    }, o = /([A-Z])/g, h = function (t, e, i, s) {
        var r;
        return (i = i || a(t, null)) ? (t = i.getPropertyValue(e.replace(o, "-$1").toLowerCase()), r = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, r = i[e]), s ? r : parseInt(r, 10) || 0
    }, l = function (t) {
        return t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
    }, _ = function (t) {
        var e, i, s, r = [], n = t.length;
        for (e = 0; n > e; e++)if (i = t[e], l(i))for (s = i.length, s = 0; i.length > s; s++)r.push(i[s]); else r.push(i);
        return r
    }, u = ")eefec303079ad17405c", c = /(?:<br>|<br\/>|<br \/>)/gi, p = n.all && !n.addEventListener, f = "<div style='position:relative;display:inline-block;" + (p ? "*display:inline;*zoom:1;'" : "'"), m = function (t) {
        t = t || "";
        var e = -1 !== t.indexOf("++"), i = 1;
        return e && (t = t.split("++").join("")), function () {
            return f + (t ? " class='" + t + (e ? i++ : "") + "'>" : ">")
        }
    }, d = s.SplitText = e.SplitText = function (t, e) {
        if ("string" == typeof t && (t = d.selector(t)), !t)throw"cannot split a null element.";
        this.elements = l(t) ? _(t) : [t], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = e || {}, this.split(e)
    }, g = function (t, e, i, s, o) {
        c.test(t.innerHTML) && (t.innerHTML = t.innerHTML.replace(c, u));
        var l, _, p, f, d, g, v, y, T, w, b, x, P, S = r(t), C = e.type || e.split || "chars,words,lines", k = -1 !== C.indexOf("lines") ? [] : null, R = -1 !== C.indexOf("words"), A = -1 !== C.indexOf("chars"), D = "absolute" === e.position || e.absolute === !0, O = D ? "&#173; " : " ", M = -999, L = a(t), I = h(t, "paddingLeft", L), E = h(t, "borderBottomWidth", L) + h(t, "borderTopWidth", L), N = h(t, "borderLeftWidth", L) + h(t, "borderRightWidth", L), F = h(t, "paddingTop", L) + h(t, "paddingBottom", L), U = h(t, "paddingLeft", L) + h(t, "paddingRight", L), X = h(t, "textAlign", L, !0), z = t.clientHeight, B = t.clientWidth, j = S.length, Y = "</div>", q = m(e.wordsClass), V = m(e.charsClass), Q = -1 !== (e.linesClass || "").indexOf("++"), G = e.linesClass;
        for (Q && (G = G.split("++").join("")), p = q(), f = 0; j > f; f++)g = S.charAt(f), ")" === g && S.substr(f, 20) === u ? (p += Y + "<BR/>", f !== j - 1 && (p += " " + q()), f += 19) : " " === g && " " !== S.charAt(f - 1) && f !== j - 1 ? (p += Y, f !== j - 1 && (p += O + q())) : p += A && " " !== g ? V() + g + "</div>" : g;
        for (t.innerHTML = p + Y, d = t.getElementsByTagName("*"), j = d.length, v = [], f = 0; j > f; f++)v[f] = d[f];
        if (k || D)for (f = 0; j > f; f++)y = v[f], _ = y.parentNode === t, (_ || D || A && !R) && (T = y.offsetTop, k && _ && T !== M && "BR" !== y.nodeName && (l = [], k.push(l), M = T), D && (y._x = y.offsetLeft, y._y = T, y._w = y.offsetWidth, y._h = y.offsetHeight), k && (R !== _ && A || (l.push(y), y._x -= I), _ && f && (v[f - 1]._wordEnd = !0)));
        for (f = 0; j > f; f++)y = v[f], _ = y.parentNode === t, "BR" !== y.nodeName ? (D && (b = y.style, R || _ || (y._x += y.parentNode._x, y._y += y.parentNode._y), b.left = y._x + "px", b.top = y._y + "px", b.position = "absolute", b.display = "block", b.width = y._w + 1 + "px", b.height = y._h + "px"), R ? _ ? s.push(y) : A && i.push(y) : _ ? (t.removeChild(y), v.splice(f--, 1), j--) : !_ && A && (T = !k && !D && y.nextSibling, t.appendChild(y), T || t.appendChild(n.createTextNode(" ")), i.push(y))) : k || D ? (t.removeChild(y), v.splice(f--, 1), j--) : R || t.appendChild(y);
        if (k) {
            for (D && (w = n.createElement("div"), t.appendChild(w), x = w.offsetWidth + "px", T = w.offsetParent === t ? 0 : t.offsetLeft, t.removeChild(w)), b = t.style.cssText, t.style.cssText = "display:none;"; t.firstChild;)t.removeChild(t.firstChild);
            for (P = !D || !R && !A, f = 0; k.length > f; f++) {
                for (l = k[f], w = n.createElement("div"), w.style.cssText = "display:block;text-align:" + X + ";position:" + (D ? "absolute;" : "relative;"), G && (w.className = G + (Q ? f + 1 : "")), o.push(w), j = l.length, d = 0; j > d; d++)"BR" !== l[d].nodeName && (y = l[d], w.appendChild(y), P && (y._wordEnd || R) && w.appendChild(n.createTextNode(" ")), D && (0 === d && (w.style.top = y._y + "px", w.style.left = I + T + "px"), y.style.top = "0px", T && (y.style.left = y._x - T + "px")));
                R || A || (w.innerHTML = r(w).split(String.fromCharCode(160)).join(" ")), D && (w.style.width = x, w.style.height = y._h + "px"), t.appendChild(w)
            }
            t.style.cssText = b
        }
        D && (z > t.clientHeight && (t.style.height = z - F + "px", z > t.clientHeight && (t.style.height = z + E + "px")), B > t.clientWidth && (t.style.width = B - U + "px", B > t.clientWidth && (t.style.width = B + N + "px")))
    }, v = d.prototype;
    v.split = function (t) {
        this.isSplit && this.revert(), this.vars = t || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var e = 0; this.elements.length > e; e++)this._originals[e] = this.elements[e].innerHTML, g(this.elements[e], this.vars, this.chars, this.words, this.lines);
        return this.isSplit = !0, this
    }, v.revert = function () {
        if (!this._originals)throw"revert() call wasn't scoped properly.";
        for (var t = this._originals.length; --t > -1;)this.elements[t].innerHTML = this._originals[t];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, d.selector = t.$ || t.jQuery || function (e) {
        return t.$ ? (d.selector = t.$, t.$(e)) : n ? n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
    }
})(window || {});


window.GreenSockGobals = null;
window._gsQueue = null;
delete(window.GreenSockGlobals);
delete(window._gsQueue);

window.GreenSockGlobals = oldgs;
window._gsQueue = oldgs_queue;

console.groupEnd();


(function (e, t) {
    e.waitForImages = {hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]};
    e.expr[":"].uncached = function (t) {
        var n = document.createElement("img");
        n.src = t.src;
        return e(t).is('img[src!=""]') && !n.complete
    };
    e.fn.waitForImages = function (t, n, r) {
        if (e.isPlainObject(arguments[0])) {
            n = t.each;
            r = t.waitForAll;
            t = t.finished
        }
        t = t || e.noop;
        n = n || e.noop;
        r = !!r;
        if (!e.isFunction(t) || !e.isFunction(n)) {
            throw new TypeError("An invalid callback was supplied.")
        }
        return this.each(function () {
            var i = e(this), s = [];
            if (r) {
                var o = e.waitForImages.hasImageProperties || [], u = /url\((['"]?)(.*?)\1\)/g;
                i.find("*").each(function () {
                    var t = e(this);
                    if (t.is("img:uncached")) {
                        s.push({src: t.attr("src"), element: t[0]})
                    }
                    e.each(o, function (e, n) {
                        var r = t.css(n);
                        if (!r) {
                            return true
                        }
                        var i;
                        while (i = u.exec(r)) {
                            s.push({src: i[2], element: t[0]})
                        }
                    })
                })
            } else {
                i.find("img:uncached").each(function () {
                    s.push({src: this.src, element: this})
                })
            }
            var f = s.length, l = 0;
            if (f == 0) {
                t.call(i[0])
            }
            e.each(s, function (r, s) {
                var o = new Image;
                e(o).bind("load error", function (e) {
                    l++;
                    n.call(s.element, l, f, e.type == "load");
                    if (l == f) {
                        t.call(i[0]);
                        return false
                    }
                });
                o.src = s.src
            })
        })
    };
})(jQuery)
