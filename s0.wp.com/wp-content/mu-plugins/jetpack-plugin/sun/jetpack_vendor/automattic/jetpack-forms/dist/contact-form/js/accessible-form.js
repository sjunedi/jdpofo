(() => {
    "use strict";
    var e = {
            889: (e, t, r) => {
                r.d(t, {
                    $5: () => s,
                    Nt: () => o,
                    S_: () => a,
                    cq: () => i
                });
                const {
                    __: __
                } = wp.i18n, n = {
                    /* translators: text read by a screen reader when a warning icon is displayed in front of an error message. */
                    warning: __("Warning.", "jetpack-forms")
                }, o = (e, t, r) => {
                    const n = `${e.name}-error`;
                    let o = t.querySelector(`#${n}`);
                    if (!o) {
                        o = i(n);
                        const t = e.closest(r.hasInsetLabel ? ".contact-form__inset-label-wrap" : ".grunion-field-wrap");
                        t && t.appendChild(o)
                    }
                    o.replaceChildren(s(e.validationMessage)), e.setAttribute("aria-invalid", "true"), e.setAttribute("aria-describedby", n)
                }, a = (e, t) => {
                    e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedby");
                    const r = e.closest(t.hasInsetLabel ? ".contact-form__inset-label-wrap" : ".grunion-field-wrap");
                    if (!r) return;
                    const n = r.querySelector(".contact-form__input-error");
                    n && n.replaceChildren()
                }, i = e => {
                    const t = document.createElement("div");
                    return t.id = e, t.classList.add("contact-form__input-error"), t
                }, s = e => {
                    const t = document.createDocumentFragment();
                    return t.appendChild(c()), t.appendChild(l(e)), t
                }, c = () => {
                    const e = document.createElement("span"),
                        t = document.createElement("span"),
                        r = document.createElement("i");
                    return t.textContent = n.warning, t.classList.add("visually-hidden"), r.setAttribute("aria-hidden", !0), e.classList.add("contact-form__warning-icon"), e.appendChild(t), e.appendChild(r), e
                }, l = e => {
                    const t = document.createElement("span");
                    return t.textContent = e, t
                }
            },
            990: (e, t, r) => {
                r.d(t, {
                    Z: () => n
                });
                const n = (e, t) => {
                    let r, n, o;
                    if (!e) return !1;
                    switch (t) {
                        case "mm/dd/yy":
                            [n, o, r] = e.split("/").map(Number);
                            break;
                        case "dd/mm/yy":
                            [o, n, r] = e.split("/").map(Number);
                            break;
                        case "yy-mm-dd":
                            [r, n, o] = e.split("-").map(Number);
                            break;
                        default:
                            return !1
                    }
                    if (isNaN(r) || isNaN(n) || isNaN(o)) return !1;
                    const a = new Date(r, n - 1, o);
                    return a.getFullYear() === r && a.getMonth() === n - 1 && a.getDate() === o
                }
            }
        },
        t = {};

    function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var a = t[n] = {
            exports: {}
        };
        return e[n](a, a.exports, r), a.exports
    }
    r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var n = r(889),
        o = r(990);
    document.addEventListener("DOMContentLoaded", (() => {
        i()
    }));
    const {
        __: __,
        _n: _n
    } = wp.i18n, a = {
        /* translators: text read by a screen reader when a warning icon is displayed in front of an error message. */
        warning: __("Warning.", "jetpack-forms"),
        /* translators: error message shown when one or more fields of the form are invalid. */
        invalidForm: __("Please make sure all fields are valid.", "jetpack-forms"),
        /* translators: error message shown when a multiple choice field requires at least one option to be selected. */
        checkboxMissingValue: __("Please select at least one option.", "jetpack-forms"),
        /* translators: error message shown when a user enters an invalid date */
        invalidDate: __("The date is not valid.", "jetpack-forms"),
        /* translators: text read by a screen reader when a form is being submitted */
        submittingForm: __("Submitting form", "jetpack-forms"),
        /* translators: generic error message */
        genericError: __("Please correct this field", "jetpack-forms"),
        /* translators: error message shown when no field has been filled out */
        emptyForm: __("The form you are trying to submit is empty.", "jetpack-forms"),
        errorCount: e => /* translators: message displayed when errors need to be fixed. %d is the number of errors. */
            _n("You need to fix %d error.", "You need to fix %d errors.", e, "jetpack-forms")
    }, i = () => {
        document.querySelectorAll(".wp-block-jetpack-contact-form-container form.contact-form").forEach(s)
    };
    const s = e => {
            e.hasAttribute("novalidate") || e.setAttribute("novalidate", !0);
            const t = {
                hasInsetLabel: y(e)
            };
            let r = {};
            const n = o => {
                if (o.preventDefault(), l(e)) return;
                S(e, r, t);
                const a = c(e);
                (function(e) {
                    const t = e.cloneNode(!0);
                    Array.from(t.querySelectorAll("select")).forEach((t => {
                        t.value = e.querySelector(`select[id="${t.id}"`) ? .value
                    })), Array.from(t.querySelectorAll('input[type="hidden"]')).forEach((e => e.remove()));
                    const r = new FormData(t);
                    return !Array.from(r.values()).some((e => e instanceof File ? !!e.size : !!e ? .trim ? .()))
                })(e) && a ? T(e, [], {
                    disableLiveRegion: !0,
                    type: "emptyForm"
                }) : a ? (r = {}, e.removeEventListener("submit", n), N(e)) : r = $(e, t)
            };
            e.addEventListener("submit", n)
        },
        c = e => {
            let t = e.checkValidity();
            if (!t) return !1;
            const r = g(e);
            for (const e of r)
                if (m(e) && !h(e)) return !1;
            const n = A(e);
            for (const e of n)
                if (!b(e)) return !1;
            return t
        },
        l = e => !0 === e.getAttribute("data-submitting"),
        u = e => "fieldset" === e.tagName.toLowerCase() && e.classList.contains("grunion-checkbox-multiple-options"),
        d = e => "fieldset" === e.tagName.toLowerCase() && e.classList.contains("grunion-radio-options"),
        m = e => e.hasAttribute("data-required"),
        p = e => {
            return "input" === (t = e).tagName.toLowerCase() && t.classList.contains("jp-contact-form-date") && e.value ? b(e) : e.validity.valid;
            var t
        },
        f = e => {
            const t = Array.from(e.querySelectorAll('input[type="radio"]'));
            return t.length > 0 && t.every((e => e.validity.valid))
        },
        h = e => {
            if (!m(e)) return !0;
            const t = Array.from(e.querySelectorAll('input[type="checkbox"]'));
            return t.length > 0 && t.some((e => e.checked))
        },
        b = e => {
            const t = e.getAttribute("data-format"),
                r = e.value;
            if (r && t) {
                if (!(0, o.Z)(r, t)) return e.setCustomValidity(a.invalidDate), !1;
                e.setCustomValidity("")
            }
            return !0
        },
        y = e => {
            const t = e.querySelector(".wp-block-jetpack-contact-form");
            if (!t) return !1;
            const r = t.classList;
            return r.contains("is-style-outlined") || r.contains("is-style-animated")
        },
        v = e => e.querySelector('[type="submit"]') || e.querySelector('button:not([type="reset"])'),
        g = e => Array.from(e.querySelectorAll(".grunion-checkbox-multiple-options")),
        A = e => Array.from(e.querySelectorAll("input.jp-contact-form-date")),
        C = e => {
            const t = L((e => Array.from(e.elements).filter((e => !["hidden", "submit"].includes(e.type) && null !== e.offsetParent)))(e)),
                r = {
                    simple: t.default,
                    singleChoice: [],
                    multipleChoice: []
                },
                n = t.radios.reduce(((e, t) => e.includes(t.name) ? e : [...e, t.name]), []);
            for (const t of n) {
                const n = e.querySelector(`input[type="radio"][name="${t}"]`);
                if (n) {
                    const e = n.closest("fieldset");
                    e && r.singleChoice.push(e)
                }
            }
            const o = t.checkboxes.reduce(((e, t) => e.includes(t.name) ? e : [...e, t.name]), []);
            for (const t of o) {
                const n = e.querySelector(`input[type="checkbox"][name="${t}"]`);
                if (n) {
                    const e = n.closest("fieldset");
                    e && r.multipleChoice.push(e)
                }
            }
            return r
        },
        k = e => e.querySelector(".contact-form__error"),
        q = e => e.querySelectorAll("[aria-invalid]"),
        L = e => e.reduce(((e, t) => {
            switch (t.type) {
                case "radio":
                    e.radios.push(t);
                    break;
                case "checkbox":
                    t.name.indexOf("[]") === t.name.length - 2 ? e.checkboxes.push(t) : e.default.push(t);
                    break;
                default:
                    e.default.push(t)
            }
            return e
        }), {
            default: [],
            radios: [],
            checkboxes: []
        }),
        S = (e, t, r) => {
            E(e, r);
            for (const r in t) e.querySelectorAll(`[name="${r}"]`).forEach((e => e.removeEventListener(t[r][0], t[r][1])))
        },
        E = (e, t) => {
            _(e), w(e, t)
        },
        _ = e => {
            const t = k(e);
            t && t.replaceChildren()
        },
        w = (e, t) => {
            for (const r of q(e)) d(r) || u(r) ? x(r) : (0, n.S_)(r, t)
        },
        x = e => {
            e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedby");
            const t = e.querySelector(".contact-form__input-error");
            t && t.replaceChildren()
        },
        N = e => {
            j(e), e.setAttribute("data-submitting", !0), e.submit()
        },
        j = e => {
            const t = v(e);
            t && (t.setAttribute("aria-disabled", !0), t.appendChild((() => {
                const e = document.createElement("span"),
                    t = document.createElement("span"),
                    r = document.createElement("span");
                return t.setAttribute("aria-hidden", !0), t.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>', r.classList.add("visually-hidden"), r.textContent = a.submittingForm, e.classList.add("contact-form__spinner"), e.appendChild(t), e.appendChild(r), e
            })()))
        },
        $ = (e, t) => (O(e, t), M(e, t)),
        M = (e, t) => {
            let r = {};
            const n = () => V(e);
            for (const a of q(e)) {
                let i;
                i = d(a) && (o = a, Array.from(o.querySelectorAll('input[type="radio"]')).some((e => e.hasAttribute("required") || e.hasAttribute("aria-required")))) ? F(a, n, e, t) : u(a) && m(a) ? D(a, n, e, t) : P(a, n, e, t), r = { ...r,
                    ...i
                }
            }
            var o;
            return r
        },
        F = (e, t, r, n) => {
            const o = {},
                a = () => {
                    f(e) ? x(e) : I(e, r, n), t()
                },
                i = e.querySelectorAll('input[type="radio"]');
            for (const e of i) e.addEventListener("blur", a), e.addEventListener("change", a), o[e.name] = ["blur", a], o[e.name] = ["change", a];
            return o
        },
        D = (e, t, r, n) => {
            const o = {},
                a = () => {
                    h(e) ? x(e) : R(e, r, n), t()
                },
                i = e.querySelectorAll('input[type="checkbox"]');
            for (const e of i) e.addEventListener("blur", a), e.addEventListener("change", a), o[e.name] = ["blur", a], o[e.name] = ["change", a];
            return o
        },
        P = (e, t, r, o) => {
            const a = e.validity.valueMissing,
                i = {},
                s = () => {
                    p(e) ? (0, n.S_)(e, o) : (0, n.Nt)(e, r, o), t()
                },
                c = () => {
                    e.validity.valueMissing ? (0, n.Nt)(e, r, o) : (0, n.S_)(e, o), t()
                };
            return e.addEventListener("blur", s), i[e.name] = ["blur", s], a && (e.addEventListener("input", c), i[e.name] = ["input", c]), i
        },
        O = (e, t) => {
            const r = Z(e, t);
            T(e, r)
        },
        T = (e, t, r = {}) => {
            let o = k(e);
            if (!o) {
                o = (() => {
                    const e = document.createElement("div");
                    return e.classList.add("contact-form__error"), e
                })();
                const t = v(e);
                t ? t.parentNode.parentNode.insertBefore(o, t.parentNode) : e.appendChild(o)
            }
            const {
                disableLiveRegion: i
            } = r;
            i ? (o.removeAttribute("aria-live"), o.removeAttribute("role")) : (o.setAttribute("aria-live", "assertive"), o.setAttribute("role", "alert"));
            const s = t.length;
            if (!s && a[r.type]) return void o.appendChild((0, n.$5)(a[r.type]));
            const c = [a.invalidForm];
            s > 0 && c.push(a.errorCount(s).replace("%d", s)), o.appendChild((0, n.$5)(c.join(" "))), s > 0 && o.appendChild(((e, t) => {
                const r = document.createElement("ul");
                for (const n of t) {
                    const t = n.id;
                    if (!t) continue;
                    let o;
                    if (o = u(n) || d(n) ? n.querySelector("legend") : e.querySelector(`label[for="${t}"]`), !o) continue;
                    const a = document.createElement("li"),
                        i = document.createElement("a");
                    i.textContent = o.innerText, i.setAttribute("href", `#${t}`), a.appendChild(i), r.appendChild(a)
                }
                return r
            })(e, t))
        },
        V = e => {
            _(e), c(e) || T(e, q(e), {
                disableLiveRegion: !0
            })
        },
        Z = (e, t) => {
            const r = [],
                {
                    simple: o,
                    singleChoice: a,
                    multipleChoice: i
                } = C(e);
            for (const a of o) p(a) || ((0, n.Nt)(a, e, t), r.push(a));
            for (const n of a) f(n) || (I(n, e, t), r.push(n));
            for (const n of i) h(n) || (R(n, e, t), r.push(n));
            return r
        },
        I = (e, t, r) => {
            Y(e, t, r)
        },
        R = (e, t, r) => {
            Y(e, t, { ...r,
                message: a.checkboxMissingValue
            })
        },
        Y = (e, t, r) => {
            const o = e.querySelector("input");
            if (!o) return;
            const i = `${o.name.replace("[]","")}-error`;
            let s = t.querySelector(`#${i}`);
            s || (s = (0, n.cq)(i)), s.replaceChildren((0, n.$5)(o.validationMessage || r.message || a.genericError)), e.appendChild(s), e.setAttribute("aria-invalid", "true"), e.setAttribute("aria-describedby", i)
        }
})();