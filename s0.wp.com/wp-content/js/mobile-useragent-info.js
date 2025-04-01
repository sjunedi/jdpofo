(function(e) {
    var i = {
        PLATFORM_WINDOWS: "windows",
        PLATFORM_IPHONE: "iphone",
        PLATFORM_IPOD: "ipod",
        PLATFORM_IPAD: "ipad",
        PLATFORM_BLACKBERRY: "blackberry",
        PLATFORM_BLACKBERRY_10: "blackberry_10",
        PLATFORM_SYMBIAN: "symbian_series60",
        PLATFORM_SYMBIAN_S40: "symbian_series40",
        PLATFORM_J2ME_MIDP: "j2me_midp",
        PLATFORM_ANDROID: "android",
        PLATFORM_ANDROID_TABLET: "android_tablet",
        PLATFORM_FIREFOX_OS: "firefoxOS",
        PLATFORM_MOBILE_GENERIC: "mobile_generic",
        userAgent: false,
        matchedPlatformName: false,
        matchedUserAgentName: false,
        init: function() {
            try {
                i.userAgent = e.navigator.userAgent.toLowerCase();
                i.getPlatformName();
                i.getMobileUserAgentName()
            } catch (e) {
                console.error(e)
            }
        },
        initForTest: function(e) {
            i.matchedPlatformName = false;
            i.matchedUserAgentName = false;
            try {
                i.userAgent = e.toLowerCase();
                i.getPlatformName();
                i.getMobileUserAgentName()
            } catch (e) {
                console.error(e)
            }
        },
        getMobileUserAgentName: function() {
            if (i.matchedUserAgentName !== false) return i.matchedUserAgentName;
            if (i.userAgent === false) return false;
            if (i.isChromeForIOS()) i.matchedUserAgentName = "chrome-for-ios";
            else if (i.isTwitterForIpad()) i.matchedUserAgentName = "twitter-for-ipad";
            else if (i.isTwitterForIphone()) i.matchedUserAgentName = "twitter-for-iphone";
            else if (i.isIPhoneOrIPod()) i.matchedUserAgentName = "iphone";
            else if (i.isIPad()) i.matchedUserAgentName = "ipad";
            else if (i.isAndroidTablet()) i.matchedUserAgentName = "android_tablet";
            else if (i.isAndroid()) i.matchedUserAgentName = "android";
            else if (i.isBlackberry10()) i.matchedUserAgentName = "blackberry_10";
            else if (r("blackberry")) i.matchedUserAgentName = "blackberry";
            else if (i.isBlackberryTablet()) i.matchedUserAgentName = "blackberry_tablet";
            else if (i.isWindowsPhone7()) i.matchedUserAgentName = "win7";
            else if (i.isWindowsPhone8()) i.matchedUserAgentName = "winphone8";
            else if (i.isOperaMini()) i.matchedUserAgentName = "opera-mini";
            else if (i.isOperaMobile()) i.matchedUserAgentName = "opera-mobi";
            else if (i.isKindleFire()) i.matchedUserAgentName = "kindle-fire";
            else if (i.isSymbianPlatform()) i.matchedUserAgentName = "series60";
            else if (i.isFirefoxMobile()) i.matchedUserAgentName = "firefox_mobile";
            else if (i.isFirefoxOS()) i.matchedUserAgentName = "firefoxOS";
            else if (i.isFacebookForIphone()) i.matchedUserAgentName = "facebook-for-iphone";
            else if (i.isFacebookForIpad()) i.matchedUserAgentName = "facebook-for-ipad";
            else if (i.isWordPressForIos()) i.matchedUserAgentName = "ios-app";
            else if (r("iphone")) i.matchedUserAgentName = "iphone-unknown";
            else if (r("ipad")) i.matchedUserAgentName = "ipad-unknown";
            return i.matchedUserAgentName
        },
        getPlatformName: function() {
            if (i.matchedPlatformName !== false) return i.matchedPlatformName;
            if (i.userAgent === false) return false;
            if (r("windows ce") || r("windows phone")) {
                i.matchedPlatformName = i.PLATFORM_WINDOWS
            } else if (r("ipad")) {
                i.matchedPlatformName = i.PLATFORM_IPAD
            } else if (r("ipod")) {
                i.matchedPlatformName = i.PLATFORM_IPOD
            } else if (r("iphone")) {
                i.matchedPlatformName = i.PLATFORM_IPHONE
            } else if (r("android")) {
                if (i.isAndroidTablet()) i.matchedPlatformName = i.PLATFORM_ANDROID_TABLET;
                else i.matchedPlatformName = i.PLATFORM_ANDROID
            } else if (i.isKindleFire()) {
                i.matchedPlatformName = i.PLATFORM_ANDROID_TABLET
            } else if (i.isBlackberry10()) {
                i.matchedPlatformName = i.PLATFORM_BLACKBERRY_10
            } else if (r("blackberry")) {
                i.matchedPlatformName = i.PLATFORM_BLACKBERRY
            } else if (i.isBlackberryTablet()) {
                i.matchedPlatformName = i.PLATFORM_BLACKBERRY
            } else if (i.isSymbianPlatform()) {
                i.matchedPlatformName = i.PLATFORM_SYMBIAN
            } else if (i.isSymbianS40Platform()) {
                i.matchedPlatformName = i.PLATFORM_SYMBIAN_S40
            } else if (i.isJ2MEPlatform()) {
                i.matchedPlatformName = i.PLATFORM_J2ME_MIDP
            } else if (i.isFirefoxOS()) {
                i.matchedPlatformName = i.PLATFORM_FIREFOX_OS
            } else if (i.isFirefoxMobile()) {
                i.matchedPlatformName = i.PLATFORM_MOBILE_GENERIC
            }
            return i.matchedPlatformName
        },
        getBlackBerryOSVersion: a(function() {
            if (i.isBlackberry10()) return "10";
            if (!r("blackberry")) return false;
            var e = -1;
            var a;
            if (r("webkit")) {
                a = /Version\/([\d\.]+)/i
            } else {
                a = /BlackBerry\w+\/([\d\.]+)/i
            }
            if (a.exec(i.userAgent) != null) e = RegExp.$1.toString();
            return e === -1 ? false : e
        }),
        isIPhoneOrIPod: a(function() {
            return r("safari") && (r("iphone") || r("ipod"))
        }),
        isIPad: a(function() {
            return r("ipad") && r("safari")
        }),
        isChromeForIOS: a(function() {
            return i.isIPhoneOrIPod() && r("crios/")
        }),
        isAndroid: a(function() {
            if (r("android")) {
                return !(i.isOperaMini() || i.isOperaMobile() || i.isFirefoxMobile())
            }
        }),
        isAndroidTablet: a(function() {
            if (r("android") && !r("mobile")) {
                return !(i.isOperaMini() || i.isOperaMobile() || i.isFirefoxMobile())
            }
        }),
        isOperaMobile: a(function() {
            return r("opera") && r("mobi")
        }),
        isOperaMini: a(function() {
            return r("opera") && r("mini")
        }),
        isBlackberry10: a(function() {
            return r("bb10") && r("mobile")
        }),
        isBlackberryTablet: a(function() {
            return r("playbook") && r("rim tablet")
        }),
        isWindowsPhone7: a(function() {
            return r("windows phone os 7")
        }),
        isWindowsPhone8: a(function() {
            return r("windows phone 8")
        }),
        isJ2MEPlatform: a(function() {
            return r("j2me/midp") || r("midp") && r("cldc")
        }),
        isSymbianS40Platform: a(function() {
            if (r("series40")) {
                return r("nokia") || r("ovibrowser") || r("nokiabrowser")
            }
        }),
        isSymbianPlatform: a(function() {
            if (r("webkit")) {
                return r("symbian") || r("series60")
            } else if (r("symbianos") && r("series60")) {
                return true
            } else if (r("nokia") && r("series60")) {
                return true
            } else if (r("opera mini")) {
                return r("symbianos") || r("symbos") || r("series 60")
            }
        }),
        isKindleFire: a(function() {
            return r("silk/") && r("silk-accelerated=")
        }),
        isFirefoxMobile: a(function() {
            return r("fennec")
        }),
        isFirefoxOS: a(function() {
            return r("mozilla") && r("mobile") && r("gecko") && r("firefox")
        }),
        isFacebookForIpad: a(function() {
            if (!r("ipad")) return false;
            return r("facebook") || r("fbforiphone") || r("fban/fbios;")
        }),
        isFacebookForIphone: a(function() {
            if (!r("iphone")) return false;
            return r("facebook") && !r("ipad") || r("fbforiphone") && !r("tablet") || r("fban/fbios;") && !r("tablet")
        }),
        isTwitterForIphone: a(function() {
            if (r("ipad")) return false;
            return r("twitter for iphone")
        }),
        isTwitterForIpad: a(function() {
            return r("twitter for ipad") || r("ipad") && r("twitter for iphone")
        }),
        isWordPressForIos: a(function() {
            return r("wp-iphone")
        })
    };

    function r(e) {
        return i.userAgent.indexOf(e) != -1
    }

    function a(e) {
        return function() {
            return i.userAgent === false ? false : e() || false
        }
    }
    e.wpcom_mobile_user_agent_info = i
})(typeof window !== "undefined" ? window : this);