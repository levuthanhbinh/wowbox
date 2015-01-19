function onYouTubePlayerAPIReady() {
    if (ytp.YTAPIReady)return;
    ytp.YTAPIReady = true;
    jQuery(document).trigger("YTAPIReady")
}
var ytp = ytp || {};
(function (jQuery, ytp) {
    var nAgt = navigator.userAgent;
    if (!jQuery.browser) {
        jQuery.browser = {};
        jQuery.browser.mozilla = !1;
        jQuery.browser.webkit = !1;
        jQuery.browser.opera = !1;
        jQuery.browser.safari = !1;
        jQuery.browser.chrome = !1;
        jQuery.browser.msie = !1;
        jQuery.browser.ua = nAgt;
        jQuery.browser.name = navigator.appName;
        jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion);
        jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        if (-1 != (verOffset = nAgt.indexOf("Opera")))jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("MSIE")))jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
            jQuery.browser.msie = !0;
            jQuery.browser.name = "Microsoft Internet Explorer";
            var start = nAgt.indexOf("rv:") + 3, end = start + 4;
            jQuery.browser.fullVersion = nAgt.substring(start, end)
        } else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
        -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
        -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
        jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10);
        isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
        jQuery.browser.version = jQuery.browser.majorVersion
    }
    jQuery.browser.android = /Android/i.test(nAgt);
    jQuery.browser.blackberry = /BlackBerry/i.test(nAgt);
    jQuery.browser.ios = /iPhone|iPad|iPod/i.test(nAgt);
    jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt);
    jQuery.browser.windowsMobile = /IEMobile/i.test(nAgt);
    jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;
    ytp.isDevice = jQuery.browser.mobile;
    jQuery.fn.CSSAnimate = function (e, t, n, r, i) {
        function s(e) {
            return e.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        }

        function o(e, t) {
            return "string" !== typeof e || e.match(/^[\-0-9\.]+$/) ? "" + e + t : e
        }

        jQuery.support.CSStransition = function () {
            var e = (document.body || document.documentElement).style;
            return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
        }();
        return this.each(function () {
            var u = this, l = jQuery(this);
            u.id = u.id || "CSSA_" + (new Date).getTime();
            var c = c || {type: "noEvent"};
            if (u.CSSAIsRunning && u.eventType == c.type)u.CSSqueue = function () {
                l.CSSAnimate(e, t, n, r, i)
            }; else if (u.CSSqueue = null, u.eventType = c.type, 0 !== l.length && e) {
                u.CSSAIsRunning = !0;
                "function" == typeof t && (i = t, t = jQuery.fx.speeds._default);
                "function" == typeof n && (i = n, n = 0);
                "function" == typeof r && (i = r, r = "cubic-bezier(0.65,0.03,0.36,0.72)");
                if ("string" == typeof t)for (var d in jQuery.fx.speeds)if (t == d) {
                    t = jQuery.fx.speeds[d];
                    break
                } else t = jQuery.fx.speeds._default;
                t || (t = jQuery.fx.speeds._default);
                if (jQuery.support.CSStransition) {
                    c = {
                        "default": "ease",
                        "in": "ease-in",
                        out: "ease-out",
                        "in-out": "ease-in-out",
                        snap: "cubic-bezier(0,1,.5,1)",
                        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                        easeInOutExpo: "cubic-bezier(1,0,0,1)",
                        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                        easeInSine: "cubic-bezier(.47,0,.745,.715)",
                        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                    };
                    c[r] && (r = c[r]);
                    var v = "", y = "transitionEnd";
                    jQuery.browser.webkit ? (v = "-webkit-", y = "webkitTransitionEnd") : jQuery.browser.mozilla ? (v = "-moz-", y = "transitionend") : jQuery.browser.opera ? (v = "-o-", y = "otransitionend") : jQuery.browser.msie && (v = "-ms-", y = "msTransitionEnd");
                    c = [];
                    for (b in e) {
                        d = b;
                        "transform" === d && (d = v + "transform", e[d] = e[b], delete e[b]);
                        "filter" === d && (d = v + "filter", e[d] = e[b], delete e[b]);
                        if ("transform-origin" === d || "origin" === d)d = v + "transform-origin", e[d] = e[b], delete e[b];
                        "x" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " translateX(" + o(e[b], "px") + ")", delete e[b]);
                        "y" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " translateY(" + o(e[b], "px") + ")", delete e[b]);
                        "z" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " translateZ(" + o(e[b], "px") + ")", delete e[b]);
                        "rotate" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " rotate(" + o(e[b], "deg") + ")", delete e[b]);
                        "rotateX" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " rotateX(" + o(e[b], "deg") + ")", delete e[b]);
                        "rotateY" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " rotateY(" + o(e[b], "deg") + ")", delete e[b]);
                        "rotateZ" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " rotateZ(" + o(e[b], "deg") + ")", delete e[b]);
                        "scale" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " scale(" + o(e[b], "") + ")", delete e[b]);
                        "scaleX" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " scaleX(" + o(e[b], "") + ")", delete e[b]);
                        "scaleY" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " scaleY(" + o(e[b], "") + ")", delete e[b]);
                        "scaleZ" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " scaleZ(" + o(e[b], "") + ")", delete e[b]);
                        "skew" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " skew(" + o(e[b], "deg") + ")", delete e[b]);
                        "skewX" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " skewX(" + o(e[b], "deg") + ")", delete e[b]);
                        "skewY" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " skewY(" + o(e[b], "deg") + ")", delete e[b]);
                        "perspective" === d && (d = v + "transform", e[d] = e[d] || "", e[d] += " perspective(" + o(e[b], "px") + ")", delete e[b]);
                        0 > c.indexOf(d) && c.push(s(d))
                    }
                    var b = c.join(","), w = function () {
                        l.off(y + "." + u.id);
                        clearTimeout(u.timeout);
                        l.css(v + "transition", "");
                        "function" == typeof i && i(l);
                        u.called = !0;
                        u.CSSAIsRunning = !1;
                        "function" == typeof u.CSSqueue && (u.CSSqueue(), u.CSSqueue = null)
                    }, E = {};
                    jQuery.extend(E, e);
                    E[v + "transition-property"] = b;
                    E[v + "transition-duration"] = t + "ms";
                    E[v + "transition-delay"] = n + "ms";
                    E[v + "transition-style"] = "preserve-3d";
                    E[v + "transition-timing-function"] = r;
                    setTimeout(function () {
                        l.one(y + "." + u.id, w);
                        l.css(E)
                    }, 1);
                    u.timeout = setTimeout(function () {
                        l.called || !i ? (l.called = !1, u.CSSAIsRunning = !1) : (l.css(v + "transition", ""), i(l), u.CSSAIsRunning = !1, "function" == typeof u.CSSqueue && (u.CSSqueue(), u.CSSqueue = null))
                    }, t + n + 100)
                } else {
                    for (var b in e)"transform" === b && delete e[b], "filter" === b && delete e[b], "transform-origin" === b && delete e[b], "auto" === e[b] && delete e[b];
                    i && "string" !== typeof i || (i = "linear");
                    l.animate(e, t, i)
                }
            }
        })
    };
    var getYTPVideoID = function (e) {
        var t;
        if (e.substr(0, 16) == "http://youtu.be/") {
            t = e.replace("http://youtu.be/", "")
        } else if (e.substr(0, 17) == "https://youtu.be/") {
            t = e.replace("https://youtu.be/", "")
        } else if (e.indexOf("http") > -1) {
            t = e.match(/[\\?&]v=([^&#]*)/)[1]
        } else {
            t = e
        }
        return t
    };
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.7.2",
        author: "Matteo Bicocchi",
        defaults: {
            containment: "body",
            ratio: "16/9",
            videoURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: true,
            vol: 100,
            addRaster: false,
            opacity: 1,
            quality: "default",
            mute: false,
            loop: true,
            showControls: true,
            showAnnotations: false,
            showYTLogo: true,
            stopMovieOnClick: false,
            realfullscreen: true,
            gaTrack: true,
            onReady: function (e) {
            },
            onStateChange: function (e) {
            },
            onPlaybackQualityChange: function (e) {
            },
            onError: function (e) {
            }
        },
        controls: {play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y"},
        rasterImg: "images/raster.png",
        rasterImgRetina: "images/raster@2x.png",
        locationProtocol: "https:",
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this;
                var $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0;
                YTPlayer.opt = {};
                $YTPlayer.addClass("mb_YTVPlayer");
                var property = $YTPlayer.data("property") && typeof $YTPlayer.data("property") == "string" ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                if (typeof property != "undefined" && typeof property.vol != "undefined")property.vol = property.vol == 0 ? property.vol = 1 : property.vol;
                jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property);
                var canGoFullscreen = !(jQuery.browser.msie || jQuery.browser.opera || self.location.href != top.location.href);
                if (!canGoFullscreen)YTPlayer.opt.realfullscreen = false;
                if (!$YTPlayer.attr("id"))$YTPlayer.attr("id", "YTP_" + (new Date).getTime());
                YTPlayer.opt.id = YTPlayer.id;
                YTPlayer.isAlone = false;
                var playerID = "mbYTP_" + YTPlayer.id;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL) : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")) : false;
                YTPlayer.videoID = videoID;
                YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    autoplay: 0,
                    modestbranding: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: true,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                var canPlayHTML5 = false;
                var v = document.createElement("video");
                if (v.canPlayType) {
                    canPlayHTML5 = true
                }
                if (canPlayHTML5)jQuery.extend(playerVars, {html5: 1});
                if (jQuery.browser.msie && jQuery.browser.version < 9) {
                    this.opt.opacity = 1
                }
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                var overlay = jQuery("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }).addClass("YTPOverlay");
                YTPlayer.isSelf = YTPlayer.opt.containment == "self";
                YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery(this) : jQuery(YTPlayer.opt.containment);
                YTPlayer.isBackground = YTPlayer.opt.containment.get(0).tagName.toLowerCase() == "body";
                if (YTPlayer.isBackground && ytp.backgroundIsInited)return;
                if (!YTPlayer.opt.containment.is(jQuery(this))) {
                    $YTPlayer.hide()
                } else {
                    YTPlayer.isPlayer = true
                }
                if (ytp.isDevice && YTPlayer.isBackground) {
                    $YTPlayer.remove();
                    return
                }
                if (YTPlayer.opt.addRaster) {
                    var classN = YTPlayer.opt.addRaster == "dot" ? "raster-dot" : "raster";
                    var retina = window.retina || window.devicePixelRatio > 1;
                    overlay.addClass(retina ? classN + " retina" : classN)
                } else {
                    overlay.removeClass(function (e, t) {
                        var n = t.split(" "), r = [];
                        $.each(n, function (e, t) {
                            if (/raster-.*/.test(t)) {
                                r.push(t)
                            }
                        });
                        r.push("retina");
                        return r.join(" ")
                    })
                }
                var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                wrapper.css({
                    position: "absolute",
                    zIndex: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    opacity: 0
                });
                playerBox.css({
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    opacity: this.opt.opacity
                });
                wrapper.append(playerBox);
                YTPlayer.opt.containment.children().not("script, style").each(function () {
                    if (jQuery(this).css("position") == "static")jQuery(this).css("position", "relative")
                });
                if (YTPlayer.isBackground) {
                    jQuery("body").css({
                        position: "relative",
                        minWidth: "100%",
                        minHeight: "100%",
                        zIndex: 1,
                        boxSizing: "border-box"
                    });
                    wrapper.css({position: "fixed", top: 0, left: 0, zIndex: 0, webkitTransform: "translateZ(0)"});
                    $YTPlayer.hide()
                } else if (YTPlayer.opt.containment.css("position") == "static")YTPlayer.opt.containment.css({position: "relative"});
                YTPlayer.opt.containment.prepend(wrapper);
                YTPlayer.wrapper = wrapper;
                playerBox.css({opacity: 1});
                if (!ytp.isDevice) {
                    playerBox.after(overlay);
                    YTPlayer.overlay = overlay
                }
                if (!YTPlayer.isBackground) {
                    overlay.on("mouseenter", function () {
                        $YTPlayer.find(".mb_YTVPBar").addClass("visible")
                    }).on("mouseleave", function () {
                        $YTPlayer.find(".mb_YTVPBar").removeClass("visible")
                    })
                }
                if (!ytp.YTAPIReady) {
                    jQuery("#YTAPI").remove();
                    var tag = jQuery("<script></script>").attr({
                        src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/player_api?v=" + jQuery.mbYTPlayer.version,
                        id: "YTAPI"
                    });
                    jQuery("head title").after(tag)
                } else {
                    setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100)
                }
                jQuery(document).on("YTAPIReady", function () {
                    if (YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit)return;
                    if (YTPlayer.isBackground && YTPlayer.opt.stopMovieOnClick)jQuery(document).off("mousedown.ytplayer").on("mousedown,.ytplayer", function (e) {
                        var t = jQuery(e.target);
                        if (t.is("a") || t.parents().is("a")) {
                            $YTPlayer.pauseYTP()
                        }
                    });
                    if (YTPlayer.isBackground) {
                        ytp.backgroundIsInited = true
                    }
                    YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == "undefined" ? YTPlayer.isBackground ? true : false : YTPlayer.opt.autoPlay;
                    YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
                    jQuery.mbYTPlayer.getDataFromFeed(YTPlayer.videoID, YTPlayer);
                    jQuery(YTPlayer).on("YTPChanged", function () {
                        if (YTPlayer.isInit)return;
                        YTPlayer.isInit = true;
                        if (ytp.isDevice && !YTPlayer.isBackground) {
                            new YT.Player(playerID, {
                                videoId: YTPlayer.videoID.toString(),
                                height: "100%",
                                width: "100%",
                                videoId: YTPlayer.videoID,
                                events: {
                                    onReady: function (e) {
                                        YTPlayer.player = e.target;
                                        playerBox.css({opacity: 1});
                                        YTPlayer.wrapper.css({opacity: YTPlayer.opt.opacity});
                                        $YTPlayer.optimizeDisplay()
                                    }, onStateChange: function () {
                                    }
                                }
                            });
                            return
                        }
                        new YT.Player(playerID, {
                            videoId: YTPlayer.videoID.toString(),
                            playerVars: playerVars,
                            events: {
                                onReady: function (e) {
                                    YTPlayer.player = e.target;
                                    if (YTPlayer.isReady)return;
                                    YTPlayer.isReady = true;
                                    YTPlayer.playerEl = YTPlayer.player.getIframe();
                                    $YTPlayer.optimizeDisplay();
                                    YTPlayer.videoID = videoID;
                                    jQuery(window).on("resize.YTP", function () {
                                        $YTPlayer.optimizeDisplay()
                                    });
                                    if (YTPlayer.opt.showControls)jQuery(YTPlayer).buildYTPControls();
                                    var t = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                                    YTPlayer.player.setVolume(0);
                                    jQuery(YTPlayer).muteYTPVolume();
                                    jQuery.mbYTPlayer.checkForState(YTPlayer);
                                    YTPlayer.checkForStartAt = setInterval(function () {
                                        var e = YTPlayer.player.getVideoLoadedFraction() > t / YTPlayer.player.getDuration();
                                        if (YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= t && e) {
                                            clearInterval(YTPlayer.checkForStartAt);
                                            YTPlayer.player.setVolume(0);
                                            jQuery(YTPlayer).muteYTPVolume();
                                            if (typeof YTPlayer.opt.onReady == "function")YTPlayer.opt.onReady($YTPlayer);
                                            if (!YTPlayer.opt.mute)jQuery(YTPlayer).unmuteYTPVolume();
                                            jQuery.mbYTPlayer.checkForState(YTPlayer);
                                            YTPlayer.player.pauseVideo();
                                            setTimeout(function () {
                                                if (YTPlayer.opt.autoPlay) {
                                                    $YTPlayer.playYTP();
                                                    $YTPlayer.css("background-image", "none")
                                                } else {
                                                    YTPlayer.player.pauseVideo()
                                                }
                                                YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity}, 2e3)
                                            }, 100)
                                        } else {
                                            YTPlayer.player.playVideo();
                                            YTPlayer.player.seekTo(t, true)
                                        }
                                    }, jQuery.browser.chrome ? 1e3 : 1)
                                }, onStateChange: function (event) {
                                    if (typeof event.target.getPlayerState != "function")return;
                                    var state = event.target.getPlayerState();
                                    if (typeof YTPlayer.opt.onStateChange == "function")YTPlayer.opt.onStateChange($YTPlayer, state);
                                    var controls = jQuery("#controlBar_" + YTPlayer.id);
                                    var data = YTPlayer.opt;
                                    if (state == 0) {
                                        if (YTPlayer.state == state)return;
                                        YTPlayer.state = state;
                                        YTPlayer.player.pauseVideo();
                                        var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                                        if (data.loop) {
                                            YTPlayer.wrapper.css({opacity: 0});
                                            $YTPlayer.playYTP();
                                            YTPlayer.player.seekTo(startAt, true)
                                        } else if (!YTPlayer.isBackground) {
                                            YTPlayer.player.seekTo(startAt, true);
                                            $YTPlayer.playYTP();
                                            setTimeout(function () {
                                                $YTPlayer.pauseYTP()
                                            }, 10)
                                        }
                                        if (!data.loop && YTPlayer.isBackground)YTPlayer.wrapper.CSSAnimate({opacity: 0}, 2e3); else if (data.loop) {
                                            YTPlayer.wrapper.css({opacity: 0});
                                            YTPlayer.loop++
                                        }
                                        controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPEnd")
                                    }
                                    if (state == 3) {
                                        if (YTPlayer.state == state)return;
                                        YTPlayer.state = state;
                                        if (!jQuery.browser.chrome)YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                        controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPBuffering")
                                    }
                                    if (state == -1) {
                                        if (YTPlayer.state == state)return;
                                        YTPlayer.state = state;
                                        jQuery(YTPlayer).trigger("YTPUnstarted")
                                    }
                                    if (state == 1) {
                                        if (YTPlayer.state == state)return;
                                        YTPlayer.state = state;
                                        if (!jQuery.browser.chrome)YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                        controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause);
                                        jQuery(YTPlayer).trigger("YTPStart");
                                        if (typeof _gaq != "undefined" && eval(YTPlayer.opt.gaTrack))_gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.title || YTPlayer.videoID.toString()]);
                                        if (typeof ga != "undefined" && eval(YTPlayer.opt.gaTrack))ga("send", "event", "YTPlayer", "play", YTPlayer.title || YTPlayer.videoID.toString())
                                    }
                                    if (state == 2) {
                                        if (YTPlayer.state == state)return;
                                        YTPlayer.state = state;
                                        controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                        jQuery(YTPlayer).trigger("YTPPause")
                                    }
                                }, onPlaybackQualityChange: function (e) {
                                    if (typeof YTPlayer.opt.onPlaybackQualityChange == "function")YTPlayer.opt.onPlaybackQualityChange($YTPlayer)
                                }, onError: function (e) {
                                    if (e.data == 150) {
                                        console.log("Embedding this video is restricted by Youtube.");
                                        if (YTPlayer.isPlayList)jQuery(YTPlayer).playNext()
                                    }
                                    if (e.data == 2 && YTPlayer.isPlayList)jQuery(YTPlayer).playNext();
                                    if (typeof YTPlayer.opt.onError == "function")YTPlayer.opt.onError($YTPlayer, e)
                                }
                            }
                        })
                    })
                })
            })
        },
        getDataFromFeed: function (e, t) {
            t.videoID = e;
            if (!jQuery.browser.msie) {
                jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//gdata.youtube.com/feeds/api/videos/" + e + "?v=2&alt=jsonc", function (e, n, r) {
                    t.dataReceived = true;
                    var i = e.data;
                    t.title = i.title;
                    t.videoData = i;
                    if (t.opt.ratio == "auto")if (i.aspectRatio && i.aspectRatio === "widescreen")t.opt.ratio = "16/9"; else t.opt.ratio = "4/3";
                    if (!t.hasData) {
                        t.hasData = true;
                        if (t.isPlayer) {
                            var s = t.videoData.thumbnail.hqDefault;
                            t.opt.containment.css({
                                background: "rgba(0,0,0,0.5) url(" + s + ") center center",
                                backgroundSize: "cover"
                            })
                        }
                    }
                    jQuery(t).trigger("YTPChanged")
                });
                setTimeout(function () {
                    if (!t.dataReceived && !t.hasData) {
                        t.hasData = true;
                        jQuery(t).trigger("YTPChanged")
                    }
                }, 1500)
            } else {
                t.opt.ratio == "auto" ? t.opt.ratio = "16/9" : t.opt.ratio;
                if (!t.hasData) {
                    t.hasData = true;
                    setTimeout(function () {
                        jQuery(t).trigger("YTPChanged")
                    }, 100)
                }
            }
        },
        getVideoID: function () {
            var e = this.get(0);
            return e.videoID || false
        },
        setVideoQuality: function (e) {
            var t = this.get(0);
            if (!jQuery.browser.chrome)t.player.setPlaybackQuality(e)
        },
        YTPlaylist: function (e, t, n) {
            var r = this.get(0);
            r.isPlayList = true;
            if (t)e = jQuery.shuffle(e);
            if (!r.videoID) {
                r.videos = e;
                r.videoCounter = 0;
                r.videoLength = e.length;
                jQuery(r).data("property", e[0]);
                jQuery(r).mb_YTPlayer()
            }
            if (typeof n == "function")jQuery(r).on("YTPChanged", function () {
                n(r)
            });
            jQuery(r).on("YTPEnd", function () {
                jQuery(r).playNext()
            })
        },
        playNext: function () {
            var e = this.get(0);
            e.videoCounter++;
            if (e.videoCounter >= e.videoLength)e.videoCounter = 0;
            jQuery(e.playerEl).css({opacity: 0});
            jQuery(e).changeMovie(e.videos[e.videoCounter])
        },
        playPrev: function () {
            var e = this.get(0);
            e.videoCounter--;
            if (e.videoCounter < 0)e.videoCounter = e.videoLength - 1;
            jQuery(e.playerEl).css({opacity: 0});
            jQuery(e).changeMovie(e.videos[e.videoCounter])
        },
        changeMovie: function (e) {
            var t = this.get(0);
            t.opt.startAt = 0;
            t.opt.stopAt = 0;
            t.opt.mute = true;
            if (e) {
                jQuery.extend(t.opt, e)
            }
            t.videoID = getYTPVideoID(t.opt.videoURL);
            jQuery(t).pauseYTP();
            var n = jQuery.browser.msie ? 1e3 : 0;
            jQuery(t.playerEl).CSSAnimate({opacity: 0}, n);
            setTimeout(function () {
                var e = !jQuery.browser.chrome ? t.opt.quality : "default";
                jQuery(t).getPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + t.videoID), 1, e);
                jQuery(t).playYTP();
                jQuery(t).one("YTPStart", function () {
                    t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 1e3);
                    jQuery(t.playerEl).CSSAnimate({opacity: 1}, n);
                    if (t.opt.startAt) {
                        t.player.seekTo(t.opt.startAt)
                    }
                    jQuery.mbYTPlayer.checkForState(t);
                    if (!t.opt.autoPlay)jQuery(t).pauseYTP()
                });
                if (t.opt.mute) {
                    jQuery(t).muteYTPVolume()
                } else {
                    jQuery(t).unmuteYTPVolume()
                }
            }, n);
            if (t.opt.addRaster) {
                var r = window.retina || window.devicePixelRatio > 1;
                t.overlay.addClass(r ? "raster retina" : "raster")
            } else {
                t.overlay.removeClass("raster");
                t.overlay.removeClass("retina")
            }
            jQuery("#controlBar_" + t.id).remove();
            if (t.opt.showControls)jQuery(t).buildYTPControls();
            jQuery.mbYTPlayer.getDataFromFeed(t.videoID, t);
            jQuery(t).optimizeDisplay()
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var e = this.get(0);
            ytp.YTAPIReady = false;
            ytp.backgroundIsInited = false;
            e.isInit = false;
            e.videoID = null;
            var t = e.wrapper;
            t.remove();
            jQuery("#controlBar_" + e.id).remove()
        },
        fullscreen: function (real) {
            function RunPrefixMethod(e, t) {
                var n = ["webkit", "moz", "ms", "o", ""];
                var r = 0, i, s;
                while (r < n.length && !e[i]) {
                    i = t;
                    if (n[r] == "") {
                        i = i.substr(0, 1).toLowerCase() + i.substr(1)
                    }
                    i = n[r] + i;
                    s = typeof e[i];
                    if (s != "undefined") {
                        n = [n[r]];
                        return s == "function" ? e[i]() : e[i]
                    }
                    r++
                }
            }

            function launchFullscreen(e) {
                RunPrefixMethod(e, "RequestFullScreen")
            }

            function cancelFullscreen() {
                if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
                    RunPrefixMethod(document, "CancelFullScreen")
                }
            }

            var YTPlayer = this.get(0);
            if (typeof real == "undefined")real = YTPlayer.opt.realfullscreen;
            real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var fullScreenBtn = controls.find(".mb_OnlyYT");
            var videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    var e = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    if (!e) {
                        YTPlayer.isAlone = false;
                        fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
                        jQuery(YTPlayer).setVideoQuality(YTPlayer.opt.quality);
                        videoWrapper.removeClass("fullscreen");
                        videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500);
                        videoWrapper.css({zIndex: 0});
                        if (YTPlayer.isBackground) {
                            jQuery("body").after(controls)
                        } else {
                            YTPlayer.wrapper.before(controls)
                        }
                        jQuery(window).resize();
                        jQuery(YTPlayer).trigger("YTPFullScreenEnd")
                    } else {
                        jQuery(YTPlayer).setVideoQuality("default");
                        jQuery(YTPlayer).trigger("YTPFullScreenStart")
                    }
                })
            }
            if (!YTPlayer.isAlone) {
                if (real) {
                    var playerState = YTPlayer.player.getPlayerState();
                    videoWrapper.css({opacity: 0});
                    videoWrapper.addClass("fullscreen");
                    launchFullscreen(videoWrapper.get(0));
                    setTimeout(function () {
                        videoWrapper.CSSAnimate({opacity: 1}, 1e3);
                        YTPlayer.wrapper.append(controls);
                        jQuery(YTPlayer).optimizeDisplay();
                        YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, true)
                    }, 500)
                } else videoWrapper.css({zIndex: 1e4}).CSSAnimate({opacity: 1}, 1e3);
                fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite);
                YTPlayer.isAlone = true
            } else {
                if (real) {
                    cancelFullscreen()
                } else {
                    videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500);
                    videoWrapper.css({zIndex: 0})
                }
                fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
                YTPlayer.isAlone = false
            }
        },
        playYTP: function () {
            var e = this.get(0);
            if (typeof e.player === "undefined")return;
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPPlaypause");
            n.html(jQuery.mbYTPlayer.controls.pause);
            e.player.playVideo();
            e.wrapper.CSSAnimate({opacity: e.isAlone ? 1 : e.opt.opacity}, 2e3);
            jQuery(e).on("YTPStart", function () {
                jQuery(e).css("background-image", "none")
            })
        },
        toggleLoops: function () {
            var e = this.get(0);
            var t = e.opt;
            if (t.loop == 1) {
                t.loop = 0
            } else {
                if (t.startAt) {
                    e.player.seekTo(t.startAt)
                } else {
                    e.player.playVideo()
                }
                t.loop = 1
            }
        },
        stopYTP: function () {
            var e = this.get(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPPlaypause");
            n.html(jQuery.mbYTPlayer.controls.play);
            e.player.stopVideo()
        },
        pauseYTP: function () {
            var e = this.get(0);
            var t = e.opt;
            var n = jQuery("#controlBar_" + e.id);
            var r = n.find(".mb_YTVPPlaypause");
            r.html(jQuery.mbYTPlayer.controls.play);
            e.player.pauseVideo()
        },
        seekToYTP: function (e) {
            var t = this.get(0);
            t.player.seekTo(e, true)
        },
        setYTPVolume: function (e) {
            var t = this.get(0);
            if (!e && !t.opt.vol && t.player.getVolume() == 0)jQuery(t).unmuteYTPVolume(); else if (!e && t.player.getVolume() > 0 || e && t.player.getVolume() == e)jQuery(t).muteYTPVolume(); else t.opt.vol = e;
            t.player.setVolume(t.opt.vol)
        },
        muteYTPVolume: function () {
            var e = this.get(0);
            e.player.mute();
            e.player.setVolume(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPMuteUnmute");
            n.html(jQuery.mbYTPlayer.controls.unmute);
            jQuery(e).addClass("isMuted");
            jQuery(e).trigger("YTPMuted")
        },
        unmuteYTPVolume: function () {
            var e = this.get(0);
            e.player.unMute();
            e.player.setVolume(e.opt.vol);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPMuteUnmute");
            n.html(jQuery.mbYTPlayer.controls.mute);
            jQuery(e).removeClass("isMuted");
            jQuery(e).trigger("YTPUnmuted")
        },
        manageYTPProgress: function () {
            var e = this.get(0);
            var t = jQuery("#controlBar_" + e.id);
            var n = t.find(".mb_YTVPProgress");
            var r = t.find(".mb_YTVPLoaded");
            var i = t.find(".mb_YTVTime");
            var s = n.outerWidth();
            var o = Math.floor(e.player.getCurrentTime());
            var u = Math.floor(e.player.getDuration());
            var a = o * s / u;
            var f = 0;
            var l = e.player.getVideoLoadedFraction() * 100;
            r.css({left: f, width: l + "%"});
            i.css({left: 0, width: a});
            return {totalTime: u, currentTime: o}
        },
        buildYTPControls: function () {
            var YTPlayer = this.get(0);
            var data = YTPlayer.opt;
            data.showYTLogo = data.showYTLogo || data.printUrl;
            if (jQuery("#controlBar_" + YTPlayer.id).length)return;
            var controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTVPBar").css({
                whiteSpace: "noWrap",
                position: YTPlayer.isBackground ? "fixed" : "absolute",
                zIndex: YTPlayer.isBackground ? 1e4 : 1e3
            }).hide();
            var buttonBar = jQuery("<div/>").addClass("buttonBar");
            var playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTVPPlaypause ytpicon").click(function () {
                if (YTPlayer.player.getPlayerState() == 1)jQuery(YTPlayer).pauseYTP(); else jQuery(YTPlayer).playYTP()
            });
            var MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTVPMuteUnmute ytpicon").click(function () {
                if (YTPlayer.player.getVolume() == 0) {
                    jQuery(YTPlayer).unmuteYTPVolume()
                } else {
                    jQuery(YTPlayer).muteYTPVolume()
                }
            });
            var idx = jQuery("<span/>").addClass("mb_YTVPTime");
            var vURL = data.videoURL ? data.videoURL : "";
            if (vURL.indexOf("http") < 0)vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL;
            var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTVPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                window.open(vURL, "viewOnYT")
            });
            var onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                jQuery(YTPlayer).fullscreen(data.realfullscreen)
            });
            var progressBar = jQuery("<div/>").addClass("mb_YTVPProgress").css("position", "absolute").click(function (e) {
                timeBar.css({width: e.clientX - timeBar.offset().left});
                YTPlayer.timeW = e.clientX - timeBar.offset().left;
                controlBar.find(".mb_YTVPLoaded").css({width: 0});
                var t = Math.floor(YTPlayer.player.getDuration());
                YTPlayer.goto = timeBar.outerWidth() * t / progressBar.outerWidth();
                YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true);
                controlBar.find(".mb_YTVPLoaded").css({width: 0})
            });
            var loadedBar = jQuery("<div/>").addClass("mb_YTVPLoaded").css("position", "absolute");
            var timeBar = jQuery("<div/>").addClass("mb_YTVTime").css("position", "absolute");
            progressBar.append(loadedBar).append(timeBar);
            buttonBar.append(playpause).append(MuteUnmute).append(idx);
            if (data.showYTLogo) {
                buttonBar.append(movieUrl)
            }
            if (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground)buttonBar.append(onlyVideo);
            controlBar.append(buttonBar).append(progressBar);
            if (!YTPlayer.isBackground) {
                controlBar.addClass("inlinePlayer");
                YTPlayer.wrapper.before(controlBar)
            } else {
                jQuery("body").after(controlBar)
            }
            controlBar.fadeIn()
        },
        checkForState: function (e) {
            clearInterval(e.getState);
            e.getState = setInterval(function () {
                var t = jQuery(e).manageYTPProgress();
                var n = jQuery(e);
                var r = jQuery("#controlBar_" + e.id);
                var i = e.opt;
                var s = e.opt.startAt ? e.opt.startAt : 1;
                var o = e.opt.stopAt > e.opt.startAt ? e.opt.stopAt : 0;
                o = o < e.player.getDuration() ? o : 0;
                if (e.player.getVolume() == 0)n.addClass("isMuted"); else n.removeClass("isMuted");
                if (t.totalTime) {
                    r.find(".mb_YTVPTime").html(jQuery.mbYTPlayer.formatTime(t.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(t.totalTime))
                } else {
                    r.find(".mb_YTVPTime").html("-- : -- / -- : --")
                }
                if (e.player.getPlayerState() == 1 && (parseFloat(e.player.getDuration() - 3) < e.player.getCurrentTime() || o > 0 && parseFloat(e.player.getCurrentTime()) > o)) {
                    if (e.isEnded)return;
                    e.isEnded = true;
                    setTimeout(function () {
                        e.isEnded = false
                    }, 2e3);
                    if (e.isPlayList) {
                        clearInterval(e.getState);
                        jQuery(e).trigger("YTPEnd");
                        return
                    } else if (!i.loop) {
                        e.player.pauseVideo();
                        e.wrapper.CSSAnimate({opacity: 0}, 1e3, function () {
                            jQuery(e).trigger("YTPEnd");
                            e.player.seekTo(s, true);
                            if (!e.isBackground) {
                                var t = e.videoData.thumbnail.hqDefault;
                                jQuery(e).css({
                                    background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                                    backgroundSize: "cover"
                                })
                            }
                        })
                    } else e.player.seekTo(s, true)
                }
            }, 1)
        },
        formatTime: function (e) {
            var t = Math.floor(e / 60);
            var n = Math.floor(e - 60 * t);
            return (t <= 9 ? "0" + t : t) + " : " + (n <= 9 ? "0" + n : n)
        }
    };
    jQuery.fn.toggleVolume = function () {
        var e = this.get(0);
        if (!e)return;
        if (e.player.isMuted()) {
            jQuery(e).unmuteYTPVolume();
            return true
        } else {
            jQuery(e).muteYTPVolume();
            return false
        }
    };
    jQuery.fn.optimizeDisplay = function () {
        var e = this.get(0);
        var t = e.opt;
        var n = jQuery(e.playerEl);
        var r = {};
        var i = e.wrapper;
        r.width = i.outerWidth();
        r.height = i.outerHeight();
        var s = 24;
        var o = 100;
        var u = {};
        u.width = r.width + r.width * s / 100;
        u.height = t.ratio == "16/9" ? Math.ceil(9 * r.width / 16) : Math.ceil(3 * r.width / 4);
        u.marginTop = -((u.height - r.height) / 2);
        u.marginLeft = -(r.width * (s / 2) / 100);
        if (u.height < r.height) {
            u.height = r.height + r.height * s / 100;
            u.width = t.ratio == "16/9" ? Math.floor(16 * r.height / 9) : Math.floor(4 * r.height / 3);
            u.marginTop = -(r.height * (s / 2) / 100);
            u.marginLeft = -((u.width - r.width) / 2)
        }
        u.width += o;
        u.height += o;
        u.marginTop -= o / 2;
        u.marginLeft -= o / 2;
        n.css({width: u.width, height: u.height, marginTop: u.marginTop, marginLeft: u.marginLeft})
    };
    jQuery.shuffle = function (e) {
        var t = e.slice();
        var n = t.length;
        var r = n;
        while (r--) {
            var i = parseInt(Math.random() * n);
            var s = t[r];
            t[r] = t[i];
            t[i] = s
        }
        return t
    };
    jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.YTPlaylist;
    jQuery.fn.playNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev;
    jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
    jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildYTPControls;
    jQuery.fn.playYTP = jQuery.mbYTPlayer.playYTP;
    jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.stopYTP = jQuery.mbYTPlayer.stopYTP;
    jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pauseYTP;
    jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekToYTP;
    jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.muteYTPVolume;
    jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmuteYTPVolume;
    jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setYTPVolume;
    jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageYTPProgress
})(jQuery, ytp)