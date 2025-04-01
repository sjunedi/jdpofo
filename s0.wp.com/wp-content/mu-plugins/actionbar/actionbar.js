(function() {
    const e = window.wpcom || {};
    e.actionbar = {};
    e.actionbar.data = window.actionbardata;
    const t = e.actionbar.data;

    function n(e = {}, o = () => {}) {
        if (!e.action) {
            return
        }
        fetch(t.xhrURL, {
            method: "POST",
            body: new URLSearchParams(e),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(o)
    }
    let o;

    function c() {
        if (!o) {
            o = new Promise((e, n) => {
                if (window.WPCOM_Proxy_Request) {
                    e(window.WPCOM_Proxy_Request)
                } else {
                    const o = document.createElement("script");
                    o.src = t.proxyScriptUrl;
                    o.async = true;
                    document.body.appendChild(o);
                    o.addEventListener("load", () => e(window.WPCOM_Proxy_Request));
                    o.addEventListener("error", e => n(e))
                }
            })
        }
        return o
    }

    function s(e, t, n = {}) {
        const o = {
            path: e,
            body: n,
            method: "POST",
            apiNamespace: t
        };
        c().then(e => e(o))
    }

    function i(e, t) {
        n({
            action: "actionbar_stats",
            stat: e
        }, t)
    }

    function r(e) {
        n({
            action: e,
            _wpnonce: t.nonce,
            source: "actionbar",
            blog_id: t.siteID
        })
    }
    let a = window.scrollY || window.pageYOffset || 0;
    if (window != window.top) {
        return
    }
    const l = document.querySelector("#actionbar");
    if (!l) {
        return
    }
    l.removeAttribute("style");
    if (t.statusMessage) {
        A(t.statusMessage)
    }
    let d = false;
    const u = l.querySelector(".actnbr-actn-follow");
    const f = l.querySelector(".actnbr-actn-reblog");
    const b = l.querySelector(".actnbr-actn-comment");
    const p = document.querySelector("#commentform");
    const m = l.querySelector(".actnbr-actn-privacy");
    const _ = l.querySelector("#toggle-input-notify-posts");
    const w = l.querySelector("#toggle-input-email-posts");
    const g = l.querySelector("#toggle-input-email-comments");
    const y = l.querySelectorAll(".segmented-control__link");
    const L = l.querySelector(".frequency-instantly");
    const v = l.querySelector(".frequency-daily");
    const h = l.querySelector(".frequency-weekly");
    if (f) {
        f.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            const n = "reblog_source";
            const o = "actionbar";
            new Image().src = `${document.location.protocol}//pixel.wp.com/g.gif?v=wpcom-no-pv&x_${n}=${o}&baba=${Math.random()}`;
            T("wpcom_actionbar_post_reblogged", {
                url: t.siteURL,
                blog_id: t.siteID,
                post_id: t.postID
            });
            const c = t.siteID + "-" + t.postID;
            if (wpcom_reblog && typeof wpcom_reblog.toggle_reblog_box_flair === "function") {
                wpcom_reblog.toggle_reblog_box_flair(c, t.postID)
            }
        })
    }
    if (b) {
        if (!p) {
            b.parentNode.classList.add("no-display")
        }
        b.addEventListener("click", e => {
            i("comment_clicked");
            T("wpcom_actionbar_comment_click", {
                url: t.siteURL,
                blog_id: t.siteID,
                post_id: t.postID
            })
        })
    }
    if (_) {
        _.addEventListener("click", e => {
            e.preventDefault();
            const n = e.target.parentElement.classList.toggle("is-checked");
            const o = `/read/sites/${t.siteID}/notification-subscriptions/${n?"new":"delete"}`;
            s(o, "wpcom/v2");
            T("wpcom_actionbar_site_notifications", {
                enabling: n,
                follow_source: "actionbar",
                url: t.siteURL
            })
        })
    }
    if (w) {
        w.addEventListener("click", e => {
            e.preventDefault();
            const n = e.target.parentElement.classList.toggle("is-checked");
            const o = `/read/site/${t.siteID}/post_email_subscriptions/${n?"new":"delete"}`;
            let c = {};
            if (n) {
                c.delivery_frequency = t.subsEmailDefault;
                y.forEach(e => e.parentElement.classList.remove("is-selected"));
                l.querySelector(`.frequency-${t.subsEmailDefault}`).parentElement.classList.add("is-selected")
            }
            l.querySelector("#email-new-posts-details").classList.toggle("is-visible", n);
            s(o, "rest/v1.2", c)
        })
    }
    if (g) {
        g.addEventListener("click", e => {
            e.preventDefault();
            const n = e.target.parentElement.classList.toggle("is-checked");
            const o = `/read/site/${t.siteID}/comment_email_subscriptions/${n?"new":"delete"}`;
            s(o, "rest/v1.2")
        })
    }
    if (m) {
        if (!l.classList.contains("actnbr-has-actions") && !window.__tcfapi) {
            l.classList.remove("actnbr-has-actions")
        }
        if (window.__tcfapi) {
            m.parentNode.classList.remove("no-display")
        }
        m.addEventListener("click", e => {
            e.preventDefault();
            i("privacy_clicked");
            T("wpcom_actionbar_privacy_click", {
                url: t.siteURL,
                blog_id: t.siteID,
                post_id: t.postID
            })
        })
    }
    const k = (e, n) => {
        y.forEach(e => e.parentElement.classList.remove("is-selected"));
        e.target.parentElement.classList.add("is-selected");
        const o = `/read/site/${t.siteID}/post_email_subscriptions/update`;
        s(o, "rest/v1.2", {
            delivery_frequency: n
        })
    };
    if (y.length > 0) {
        L.addEventListener("click", e => k(e, "instantly"));
        v.addEventListener("click", e => k(e, "daily"));
        h.addEventListener("click", e => k(e, "weekly"))
    }
    if (u) {
        u.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            d = true;
            if (t.isLoggedIn) {
                A(`<div class="actnbr-reader">${t.i18n.followedText}</div>`);
                i("followed");
                T("wpcom_actionbar_site_followed", {
                    follow_source: "actionbar",
                    url: t.siteURL
                });
                r("ab_subscribe_to_blog");
                const e = t.subsEmailDefault;
                if (e !== "never") {
                    w.click()
                }
                _ && _.click()
            } else {
                M()
            }
        })
    }
    const q = l.querySelector(".actnbr-actn-following");
    if (q) {
        q.addEventListener("click", e => {
            e.preventDefault();
            q.classList.add("no-display");
            u.classList.remove("no-display");
            i("unfollowed");
            T("wpcom_actionbar_site_unfollowed", {
                follow_source: "actionbar",
                url: t.siteURL
            });
            r("ab_unsubscribe_from_blog");
            const n = l.querySelector(".actnbr-btn");
            n.classList.add("actnbr-hidden");
            const o = l.querySelectorAll(".actnbr-site-settings__toggle.is-checked");
            o.forEach(e => e.classList.remove("is-checked"))
        })
    }
    document.addEventListener("click", e => {
        const t = !!e.target.closest("#follow-bubble");
        if (t) {
            return
        }
        const n = l.querySelector(".actnbr-btn");
        if (d && !n.classList.contains("actnbr-hidden")) {
            d = false;
            n.classList.add("actnbr-hidden")
        }
    });
    const S = l.querySelector(".actnbr-shortlink a");

    function E(e, n, o) {
        n.textContent = t.i18n.shortLinkCopied;
        e.classList.add("actnbr-shortlink__copied");
        setTimeout(() => {
            n.textContent = o;
            e.classList.remove("actnbr-shortlink__copied")
        }, 6e3)
    }

    function D(e, n, o, c) {
        if (!e || !n || n.textContent === t.i18n.shortLinkCopied) {
            return
        }
        if (navigator.clipboard) {
            navigator.clipboard.writeText(o).then(() => {
                E(e, n, c)
            }).catch(e => {
                window.prompt("Shortlink: ", o)
            })
        } else {
            const t = document.createElement("textarea");
            t.value = o;
            e.appendChild(t);
            t.focus();
            t.select();
            try {
                document.execCommand("copy");
                E(e, n, c)
            } catch (e) {
                window.prompt("Shortlink: ", o)
            }
            e.removeChild(t)
        }
        i("copied_shortlink")
    }
    if (S) {
        const e = l.querySelector(".actnbr-shortlink__text");
        S.addEventListener("click", n => {
            n.preventDefault();
            n.stopPropagation();
            const o = t.shortlink;
            const c = e.textContent;
            D(S, e, o, c)
        })
    }
    const x = l.querySelector(".actnbr-ellipsis");
    let C = false;
    if (x) {
        x.addEventListener("click", e => {
            const t = e.target.closest("a");
            if (t && t.classList.contains("actnbr-action")) {
                return false
            }
            x.classList.toggle("actnbr-hidden");
            setTimeout(() => {
                if (!x.classList.contains("actnbr-hidden")) {
                    i("show_more_menu");
                    C = true
                }
            }, 10)
        })
    }
    document.addEventListener("click", () => {
        if (C) {
            x.classList.add("actnbr-hidden");
            C = false
        }
    });
    const I = l.querySelector(".actnbr-fold");
    if (I) {
        if (!l.classList.contains("actnbr-has-actions") && !window.__tcfapi) {
            I.classList.add("no-display")
        }
        I.addEventListener("click", e => {
            e.preventDefault();
            const o = I.querySelector("a");
            if (l.classList.contains("actnbr-folded")) {
                o.textContent = t.i18n.foldBar;
                l.classList.remove("actnbr-folded");
                n({
                    action: "unfold_actionbar"
                })
            } else {
                o.textContent = t.i18n.unfoldBar;
                l.classList.add("actnbr-folded");
                n({
                    action: "fold_actionbar"
                })
            }
        })
    }

    function P(e, t, n) {
        const o = l.querySelector(e);
        if (o) {
            o.addEventListener("click", U(t, n))
        }
    }
    P(".actnbr-sitename a", "clicked_site_title");
    P(".actnbr-theme a", "explored_theme");
    P(".actnbr-edit a", "edited");
    P(".actnbr-stats a", "clicked_stats");
    P(".flb-report a", "reported_content");
    P(".actnbr-follows a", "managed_following");
    P(".actnbr-login-nudge a", "clicked_login_nudge");
    P(".actnbr-signup a", "clicked_signup_link");
    P(".actnbr-login a", "clicked_login_link");
    P(".actnbr-subs a", "clicked_manage_subs_link");
    P(".actnbr-reader a", "view_reader");
    const R = l.querySelector(".actnbr-follow-bubble form");
    if (R) {
        R.addEventListener("submit", U("submit_follow_form", () => {
            const e = R.querySelector("button");
            if (e) {
                e.setAttribute("disabled", true)
            }
        }))
    }

    function $() {
        const e = window.scrollY || window.pageYOffset || 0;
        const t = l.classList.contains("actnbr-hidden");
        if (e < a) {
            l.classList.remove("actnbr-hidden")
        } else {
            if (!t && document.querySelectorAll("#actionbar > ul > li:not(.actnbr-hidden) > .actnbr-popover").length === 0) {
                l.classList.add("actnbr-hidden");
                l.querySelectorAll("li").forEach(e => e.classList.add("actnbr-hidden"))
            }
        }
        a = e
    }
    document.addEventListener("scroll", $, {
        passive: true
    });

    function T(e, t) {
        t = t || {};
        window._tkq = window._tkq || [];
        window._tkq.push(["recordEvent", e, t])
    }

    function U(e, t) {
        const n = {};
        return function o(o) {
            if (n[o.timeStamp]) {
                delete n[o.timeStamp];
                if (o.type === "submit") {
                    o.target.submit()
                }
                if (typeof t === "function") {
                    return t(o)
                }
                return true
            }
            o.preventDefault();
            o.stopPropagation();

            function c() {
                const e = new o.constructor(o.type, o);
                n[e.timeStamp] = true;
                o.target.dispatchEvent(e)
            }
            i(e, c)
        }
    }

    function M() {
        const e = l.querySelector(".actnbr-follow-bubble form");
        e.removeAttribute("style");
        const t = l.querySelector(".actnbr-actn-follow") ? .parentNode;
        t && t.classList.toggle("actnbr-hidden");
        setTimeout(() => {
            l.querySelector(".actnbr-email-field").focus()
        }, 10)
    }

    function A(e) {
        const t = l.querySelector(".actnbr-actn-follow");
        const n = l.querySelector(".actnbr-actn-following");
        t && t.classList.add("no-display");
        n && n.classList.remove("no-display");
        const o = l.querySelector(".actnbr-follow-bubble .actnbr-message");
        if (o) {
            o.classList.remove("no-display");
            o.innerHTML = e
        }
        const c = l.querySelector(".actnbr-btn");
        c && c.classList.remove("actnbr-hidden")
    }
})();