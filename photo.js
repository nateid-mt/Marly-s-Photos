(function(w, d) {
    zaraz.debug = (cW="")=>{
        document.cookie = `zarazDebug=${cW}; path=/`;
        location.reload()
    }
    ;
    window.zaraz._al = function(ck, cl, cm) {
        w.zaraz.listeners.push({
            item: ck,
            type: cl,
            callback: cm
        });
        ck.addEventListener(cl, cm)
    }
    ;
    zaraz.preview = (cn="")=>{
        document.cookie = `zarazPreview=${cn}; path=/`;
        location.reload()
    }
    ;
    zaraz.i = function(cN) {
        const cO = d.createElement("div");
        cO.innerHTML = unescape(cN);
        const cP = cO.querySelectorAll("script");
        for (let cQ = 0; cQ < cP.length; cQ++) {
            const cR = d.createElement("script");
            cP[cQ].innerHTML && (cR.innerHTML = cP[cQ].innerHTML);
            for (const cS of cP[cQ].attributes)
                cR.setAttribute(cS.name, cS.value);
            d.head.appendChild(cR);
            cP[cQ].remove()
        }
        d.body.appendChild(cO)
    }
    ;
    zaraz.f = async function(cT, cU) {
        const cV = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (cU) {
            cV.method = "POST";
            cV.body = new URLSearchParams(cU);
            cV.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(cT, cV)
    }
    ;
    !function(cX, cY, cZ, c$, da, db) {
        function dc(de, df) {
            db ? c$(de, df || 32) : da.push(de, df)
        }
        function dd(dg, dh, di, dj) {
            return dh && cY.getElementById(dh) || (dj = cY.createElement(dg || "SCRIPT"),
            dh && (dj.id = dh),
            di && (dj.onload = di),
            cY.head.appendChild(dj)),
            dj || {}
        }
        db = /p/.test(cY.readyState),
        cX.addEventListener("on" + cZ in cX ? cZ : "load", (function() {
            for (db = 1; da[0]; )
                dc(da.shift(), da.shift())
        }
        )),
        dc._ = dd,
        cX.defer = dc,
        cX.deferscript = function(dk, dl, dm, dn) {
            dc((function() {
                dd("", dl, dn).src = dk
            }
            ), dm)
        }
    }(this, d, "pageshow", setTimeout, []);
    defer((function() {
        for (; zaraz.deferred.length; )
            zaraz.deferred.pop()();
        Object.defineProperty(zaraz.deferred, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...dp) {
                let dq = Array.prototype.push.apply(this, dp);
                for (; zaraz.deferred.length; )
                    zaraz.deferred.pop()();
                return dq
            }
        })
    }
    ), 5500);
    addEventListener("visibilitychange", (function() {
        for (; zaraz.deferred.length; )
            zaraz.deferred.pop()()
    }
    ));
    window.zaraz._p = async dB=>new Promise((dC=>{
        if (dB) {
            dB.e && dB.e.forEach((dD=>{
                try {
                    new Function(dD)()
                } catch (dE) {
                    console.error(`Error executing script: ${dD}\n`, dE)
                }
            }
            ));
            Promise.allSettled((dB.f || []).map((dF=>fetch(dF[0], dF[1]))))
        }
        dC()
    }
    ));
    zaraz.pageVariables = {};
    zaraz.__zcl = zaraz.__zcl || {};
    zaraz.track = async function(cr, cs, ct) {
        return new Promise(((cu,cv)=>{
            const cw = {
                name: cr,
                data: {}
            };
            for (const cx of [localStorage, sessionStorage])
                Object.keys(cx || {}).filter((cz=>cz.startsWith("_zaraz_"))).forEach((cy=>{
                    try {
                        cw.data[cy.slice(7)] = JSON.parse(cx.getItem(cy))
                    } catch {
                        cw.data[cy.slice(7)] = cx.getItem(cy)
                    }
                }
                ));
            Object.keys(zaraz.pageVariables).forEach((cA=>cw.data[cA] = JSON.parse(zaraz.pageVariables[cA])));
            Object.keys(zaraz.__zcl).forEach((cB=>cw.data[`__zcl_ ${cB}`] = zaraz.__zcl[cB]));
            cw.data.__zarazMCListeners = zaraz.__zarazMCListeners;
            //
            cw.data = {
                ...cw.data,
                ...cs
            };
            cw.zarazData = zarazData;
            fetch("/cdn-cgi/zaraz/t", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cw)
            }).catch((()=>{
                //
                return fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cw)
                })
            }
            )).then((function(cD) {
                zarazData._let = (new Date).getTime();
                cD.ok || cv();
                return 204 !== cD.status && cD.json()
            }
            )).then((async cC=>{
                await zaraz._p(cC);
                "function" == typeof ct && ct()
            }
            )).finally((()=>cu()))
        }
        ))
    }
    ;
    zaraz.set = function(cE, cF, cG) {
        try {
            cF = JSON.stringify(cF)
        } catch (cH) {
            return
        }
        prefixedKey = "_zaraz_" + cE;
        sessionStorage && sessionStorage.removeItem(prefixedKey);
        localStorage && localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[cE];
        if (void 0 !== cF) {
            cG && "session" == cG.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, cF) : cG && "page" == cG.scope ? zaraz.pageVariables[cE] = cF : localStorage && localStorage.setItem(prefixedKey, cF);
            zaraz.__watchVar = {
                key: cE,
                value: cF
            }
        }
    }
    ;
    for (const {m: cI, a: cJ} of zarazData.q.filter((({m: cK})=>["debug", "set"].includes(cK))))
        zaraz[cI](...cJ);
    for (const {m: cL, a: cM} of zaraz.q)
        zaraz[cL](...cM);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(bK, bL, bM, bN) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[bK] || (zaraz.__zarazTriggerMap[bK] = "");
        zaraz.__zarazTriggerMap[bK] += "*" + bL + "*";
        zaraz.track("__zarazEmpty", {
            ...bM,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[bK]
        }, bN)
    }
    ;
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = du=>{
        for (const dv of Object.entries(du))
            zaraz.set(dv[0], dv[1], {
                scope: "page"
            });
        if (du.event) {
            if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(du.event))
                return;
            let dw = {};
            for (let dx of dataLayer.slice(0, dataLayer.indexOf(du) + 1))
                dw = {
                    ...dw,
                    ...dx
                };
            delete dw.event;
            du.event.startsWith("gtm.") || zaraz.track(du.event, dw)
        }
    }
    ;
    const dt = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: function(...dy) {
            let dz = dt.apply(this, dy);
            zaraz._processDataLayer(dy[0]);
            return dz
        }
    });
    dataLayer.forEach((dA=>zaraz._processDataLayer(dA)));
    zaraz._cts = ()=>{
        zaraz._timeouts && zaraz._timeouts.forEach((bn=>clearTimeout(bn)));
        zaraz._timeouts = []
    }
    ;
    zaraz._rl = function() {
        w.zaraz.listeners && w.zaraz.listeners.forEach((bo=>bo.item.removeEventListener(bo.type, bo.callback)));
        window.zaraz.listeners = []
    }
    ;
    history.pushState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.pushState.apply(history, arguments);
            setTimeout((()=>{
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.__zarazMCListeners = {};
                zaraz.track("__zarazSPA")
            }
            ), 100)
        }
    }
    ;
    history.replaceState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.replaceState.apply(history, arguments);
            setTimeout((()=>{
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }
            ), 100)
        }
    }
    ;
    zaraz._c = fU=>{
        const {event: fV, ...fW} = fU;
        zaraz.track(fV, {
            ...fW,
            __zarazClientEvent: !0
        })
    }
    ;
    zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
    zaraz.__zcl.track = !0;
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");})(window,document)"]
    })
}
)(window, document);
