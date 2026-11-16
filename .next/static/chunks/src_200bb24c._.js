(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/three/dimensions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Proportions of the procedural tandoor, derived from the reference photograph.
 * Units are arbitrary scene units (≈ 1 unit = 0.5 m). The product stands on y = 0.
 */ __turbopack_context__.s([
    "DIM",
    ()=>DIM
]);
const DIM = {
    feet: 0.07,
    bodyHeight: 1.9,
    radius: 0.7,
    /** Top of the stainless-steel body. */ get top () {
        return this.feet + this.bodyHeight;
    },
    /** Radius of the clay-lined opening. */ openingRadius: 0.45,
    lidRadius: 0.545,
    /** Height of the clay collar above the steel rim. */ clayRise: 0.022,
    sideHandleY: 1.4,
    emblemY: 1.2,
    emblemSize: 0.54
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/animation/storyConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callouts",
    ()=>callouts,
    "chapterAnchors",
    ()=>chapterAnchors,
    "chapterWindows",
    ()=>chapterWindows,
    "lidSchedule",
    ()=>lidSchedule,
    "shotSchedule",
    ()=>shotSchedule,
    "shotsByMode",
    ()=>shotsByMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-client] (ecmascript)");
;
const desktopShots = {
    reveal0: {
        pos: [
            1.5,
            3.3,
            7.7
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.08,
        shiftX: 0.18,
        shiftY: 0.1,
        fov: 30
    },
    reveal1: {
        pos: [
            1.3,
            3.1,
            6.4
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.02,
        shiftX: 0.18,
        shiftY: 0.1,
        fov: 30
    },
    craft: {
        pos: [
            1.6,
            2.6,
            5.6
        ],
        target: [
            0,
            1.25,
            0
        ],
        rotY: -0.32,
        shiftX: 0.15,
        shiftY: 0.08,
        fov: 30
    },
    chamber: {
        pos: [
            0.6,
            4.25,
            3.5
        ],
        target: [
            0,
            1.85,
            0
        ],
        rotY: -0.12,
        shiftX: 0.15,
        shiftY: 0.12,
        fov: 30
    },
    details: {
        pos: [
            2.0,
            1.05,
            4.9
        ],
        target: [
            0,
            0.85,
            0
        ],
        rotY: 0.18,
        shiftX: 0.1,
        shiftY: 0.06,
        fov: 30
    },
    complete: {
        pos: [
            1.25,
            3.0,
            6.5
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.04,
        shiftX: 0.2,
        shiftY: 0.1,
        fov: 30
    }
};
/** Tablet landscape: same story, gentler moves and a little more breathing room. */ const tabletShots = {
    reveal0: {
        ...desktopShots.reveal0,
        pos: [
            1.6,
            3.3,
            9.6
        ]
    },
    reveal1: {
        ...desktopShots.reveal1,
        pos: [
            1.5,
            3.1,
            8.4
        ]
    },
    craft: {
        ...desktopShots.craft,
        pos: [
            1.6,
            2.7,
            7.2
        ],
        rotY: -0.25,
        shiftX: 0.03
    },
    chamber: {
        ...desktopShots.chamber,
        pos: [
            0.6,
            4.6,
            4.2
        ]
    },
    details: {
        ...desktopShots.details,
        pos: [
            2.1,
            1.3,
            6.6
        ],
        target: [
            0,
            0.9,
            0
        ],
        shiftX: 0.12
    },
    complete: {
        ...desktopShots.complete,
        pos: [
            1.45,
            3.0,
            8.2
        ]
    }
};
/** Phones & portrait tablets: text on top, product below, reduced camera travel. */ const stackedShots = {
    reveal0: {
        pos: [
            1.4,
            3.9,
            12.6
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.06,
        shiftX: 0,
        shiftY: 0.2,
        fov: 30
    },
    reveal1: {
        pos: [
            1.2,
            3.6,
            11.4
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.02,
        shiftX: 0,
        shiftY: 0.2,
        fov: 30
    },
    craft: {
        pos: [
            1.4,
            3.2,
            9.8
        ],
        target: [
            0,
            1.1,
            0
        ],
        rotY: -0.25,
        shiftX: 0,
        shiftY: 0.21,
        fov: 30
    },
    chamber: {
        pos: [
            0.5,
            5.8,
            7.4
        ],
        target: [
            0,
            1.6,
            0
        ],
        rotY: -0.1,
        shiftX: 0,
        shiftY: 0.2,
        fov: 30
    },
    details: {
        pos: [
            1.6,
            1.7,
            9.6
        ],
        target: [
            0,
            0.85,
            0
        ],
        rotY: 0.15,
        shiftX: 0,
        shiftY: 0.2,
        fov: 30
    },
    complete: {
        pos: [
            1.2,
            3.5,
            11.4
        ],
        target: [
            0,
            1.0,
            0
        ],
        rotY: 0.03,
        shiftX: 0,
        shiftY: 0.22,
        fov: 30
    }
};
const shotsByMode = {
    desktop: desktopShots,
    tablet: tabletShots,
    stacked: stackedShots
};
const shotSchedule = [
    {
        shot: 'reveal1',
        from: 0,
        to: 14
    },
    {
        shot: 'craft',
        from: 16,
        to: 26
    },
    {
        shot: 'chamber',
        from: 38,
        to: 48
    },
    {
        shot: 'details',
        from: 61,
        to: 70
    },
    {
        shot: 'complete',
        from: 80,
        to: 90
    }
];
const chapterWindows = [
    {
        in: 0,
        out: 12
    },
    {
        in: 19,
        out: 35
    },
    {
        in: 42,
        out: 58
    },
    {
        in: 65,
        out: 78
    },
    {
        in: 85,
        out: null
    }
];
const chapterAnchors = [
    0,
    24,
    50,
    71,
    94
];
const lidSchedule = {
    liftFrom: 43,
    liftTo: 52,
    lowerFrom: 57,
    lowerTo: 64,
    /** How far the lid lifts and how much it tilts back. */ lift: 0.4,
    tilt: -0.32,
    backOffset: -0.34
};
const R = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].radius;
const deg = (d)=>d * Math.PI / 180;
const callouts = [
    {
        id: 'steel',
        chapter: 1,
        anchor: [
            R * Math.sin(deg(40)),
            0.72,
            R * Math.cos(deg(40))
        ],
        side: 'right',
        dy: 40,
        in: 23,
        out: 35
    },
    {
        id: 'clay',
        chapter: 1,
        anchor: [
            0.58 * Math.sin(deg(25)),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].top + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].clayRise,
            0.58 * Math.cos(deg(25))
        ],
        side: 'right',
        dy: -46,
        in: 26.5,
        out: 35
    },
    {
        id: 'design',
        chapter: 1,
        anchor: [
            R + 0.11,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].sideHandleY,
            0
        ],
        side: 'right',
        dy: 0,
        in: 30,
        out: 35
    },
    {
        id: 'firebox',
        chapter: 3,
        anchor: [
            0,
            0.26,
            R + 0.01
        ],
        side: 'right',
        dy: 34,
        in: 68,
        out: 78
    },
    {
        id: 'body',
        chapter: 3,
        anchor: [
            R * Math.sin(deg(38)),
            0.95,
            R * Math.cos(deg(38))
        ],
        side: 'right',
        dy: -20,
        in: 70,
        out: 78
    },
    {
        id: 'handles',
        chapter: 3,
        anchor: [
            R + 0.11,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].sideHandleY - 0.08,
            0
        ],
        side: 'right',
        dy: -52,
        in: 72,
        out: 78
    },
    {
        id: 'base',
        chapter: 3,
        anchor: [
            0.62 * Math.sin(deg(45)),
            0.04,
            0.62 * Math.cos(deg(45))
        ],
        side: 'right',
        dy: 46,
        in: 74,
        out: 78
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/animation/storyStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sceneState",
    ()=>sceneState,
    "storyBus",
    ()=>storyBus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyConfig.ts [app-client] (ecmascript)");
;
/**
 * Mutable animation state shared between the GSAP timeline (writer) and the
 * three.js render loop (reader). It is deliberately NOT React state: GSAP tweens
 * these numbers directly and the canvas re-renders on demand, so React never
 * re-renders on scroll.
 */ const start = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shotsByMode"].desktop.reveal0;
const sceneState = {
    camX: start.pos[0],
    camY: start.pos[1],
    camZ: start.pos[2],
    tgtX: start.target[0],
    tgtY: start.target[1],
    tgtZ: start.target[2],
    rotY: start.rotY,
    shiftX: start.shiftX,
    shiftY: start.shiftY,
    fov: start.fov,
    lidY: 0,
    lidTilt: 0,
    lidZ: 0,
    /** Warm glow inside the cooking chamber, 0–1. */ glow: 0,
    /** Key light strength multiplier. */ key: 1,
    /** Key light azimuth (radians around the product) and elevation (0–1). */ keyAz: -1.0,
    keyEl: 0.55,
    /** Environment rotation — moves reflections across the steel. */ envRot: -0.35,
    /** Load-in reveal, 0–1 (time based, not scroll based). */ intro: 0
};
const storyBus = {
    /** Set by the canvas: request a new frame (frameloop = "demand"). */ invalidate: ()=>{},
    /** Callout DOM nodes, positioned every rendered frame from projected 3D anchors. */ calloutEls: new Map(),
    /** Stage element receives CSS variables for the product glow position. */ stageEl: null,
    /** Whether 3D-anchored callouts are active for the current layout. */ calloutsEnabled: false,
    sceneReady: false,
    readyListeners: new Set(),
    markReady () {
        this.sceneReady = true;
        this.readyListeners.forEach((l)=>l());
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/animation/buildStoryTimeline.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyRestingComposition",
    ()=>applyRestingComposition,
    "buildStoryTimeline",
    ()=>buildStoryTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-client] (ecmascript)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
const flat = (k)=>({
        camX: k.pos[0],
        camY: k.pos[1],
        camZ: k.pos[2],
        tgtX: k.target[0],
        tgtY: k.target[1],
        tgtZ: k.target[2],
        rotY: k.rotY,
        shiftX: k.shiftX,
        shiftY: k.shiftY,
        fov: k.fov
    });
function applyRestingComposition(mode) {
    Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], flat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shotsByMode"][mode].complete), {
        lidY: 0,
        lidTilt: 0,
        lidZ: 0,
        glow: 0,
        key: 1,
        keyAz: -1.0,
        keyEl: 0.55,
        envRot: -0.1
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate();
}
function buildStoryTimeline(o) {
    const shots = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shotsByMode"][o.mode];
    const useCallouts = o.mode !== 'stacked' && !o.fallbackImg;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutsEnabled = useCallouts;
    Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], flat(shots.reveal0), {
        lidY: 0,
        lidTilt: 0,
        lidZ: 0,
        glow: 0,
        key: 1,
        keyAz: -1.0,
        keyEl: 0.55,
        envRot: -0.35
    });
    let activeChapter = -1;
    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
        defaults: {
            ease: 'none'
        },
        onUpdate: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate(),
        scrollTrigger: {
            trigger: o.section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
            invalidateOnRefresh: false,
            onUpdate: (self)=>{
                if (o.progressEl) o.progressEl.style.transform = "scaleY(".concat(self.progress.toFixed(4), ")");
                const p = self.progress * 100;
                let idx = 0;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapterAnchors"].forEach((a, i)=>{
                    if (p >= a - 6) idx = i;
                });
                if (idx !== activeChapter) {
                    activeChapter = idx;
                    o.onChapterChange(idx);
                }
            }
        }
    });
    // ── Camera & product path ───────────────────────────────────────────
    for (const step of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shotSchedule"]){
        tl.to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
            ...flat(shots[step.shot]),
            duration: step.to - step.from,
            ease: 'power2.inOut'
        }, step.from);
    }
    tl.set({}, {}, 100); // pin the timeline length to exactly 100
    // ── Light: highlights travel across the steel ───────────────────────
    tl.to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        envRot: 0.15,
        keyAz: -0.75,
        duration: 18,
        ease: 'sine.inOut'
    }, 0).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        envRot: 0.55,
        keyAz: -1.25,
        keyEl: 0.45,
        duration: 14,
        ease: 'sine.inOut'
    }, 18).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        key: 0.7,
        keyEl: 0.85,
        envRot: 0.3,
        duration: 10,
        ease: 'sine.inOut'
    }, 40).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        key: 1.2,
        keyAz: -1.45,
        keyEl: 0.12,
        envRot: -0.2,
        duration: 10,
        ease: 'sine.inOut'
    }, 61).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        key: 1.05,
        keyAz: -0.9,
        keyEl: 0.55,
        envRot: 0.05,
        duration: 12,
        ease: 'sine.inOut'
    }, 80);
    // ── Lid lift & chamber glow ─────────────────────────────────────────
    const L = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lidSchedule"];
    tl.to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        lidY: L.lift,
        lidTilt: L.tilt,
        lidZ: L.backOffset,
        duration: L.liftTo - L.liftFrom,
        ease: 'power2.inOut'
    }, L.liftFrom).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        glow: 1,
        duration: 9,
        ease: 'sine.inOut'
    }, L.liftFrom + 2).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        lidY: 0,
        lidTilt: 0,
        lidZ: 0,
        duration: L.lowerTo - L.lowerFrom,
        ease: 'power2.inOut'
    }, L.lowerFrom).to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
        glow: 0,
        duration: 7,
        ease: 'sine.inOut'
    }, L.lowerFrom + 1);
    // ── Chapter copy ────────────────────────────────────────────────────
    o.chapterEls.forEach((el, i)=>{
        const win = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapterWindows"][i];
        if (!win) return;
        if (i === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(el, {
                autoAlpha: 1,
                y: 0
            });
        } else {
            tl.fromTo(el, {
                autoAlpha: 0,
                y: 36
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 4,
                ease: 'power2.out'
            }, win.in);
        }
        if (win.out !== null) {
            tl.to(el, {
                autoAlpha: 0,
                y: -28,
                duration: 3.5,
                ease: 'power2.in'
            }, win.out);
        }
    });
    // ── 3D-anchored callouts ────────────────────────────────────────────
    if (useCallouts) {
        for (const c of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callouts"]){
            const el = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutEls.get(c.id);
            const inner = el === null || el === void 0 ? void 0 : el.firstElementChild;
            if (!inner) continue;
            tl.fromTo(inner, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                duration: 2.5
            }, c.in);
            const line = inner.querySelector('.callout__line');
            if (line) tl.fromTo(line, {
                scaleX: 0
            }, {
                scaleX: 1,
                duration: 2.5,
                ease: 'power2.out'
            }, c.in);
            tl.to(inner, {
                autoAlpha: 0,
                duration: 2.5
            }, c.out);
        }
    }
    // ── Image-based fallback (no WebGL) ─────────────────────────────────
    if (o.fallbackImg) {
        const img = o.fallbackImg;
        tl.fromTo(img, {
            scale: 1,
            yPercent: 0
        }, {
            scale: 1.04,
            duration: 14
        }, 0).to(img, {
            scale: 1.35,
            yPercent: 14,
            duration: 10,
            ease: 'power2.inOut'
        }, 16).to(img, {
            scale: 1.7,
            yPercent: 34,
            duration: 10,
            ease: 'power2.inOut'
        }, 38).to(img, {
            scale: 1.45,
            yPercent: -20,
            duration: 9,
            ease: 'power2.inOut'
        }, 61).to(img, {
            scale: 1,
            yPercent: 0,
            duration: 10,
            ease: 'power2.inOut'
        }, 80);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate();
    return tl;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroCTA.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroCTA",
    ()=>HeroCTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function HeroCTA(param) {
    let { ctas } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cta-row",
        children: ctas.map((cta)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "btn btn--".concat(cta.variant, " btn--lg"),
                href: cta.href,
                children: [
                    cta.label,
                    cta.variant === 'primary' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "btn__arrow",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M3 8h9M8.5 4.5 12 8l-3.5 3.5",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HeroCTA.tsx",
                            lineNumber: 12,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCTA.tsx",
                        lineNumber: 11,
                        columnNumber: 13
                    }, this)
                ]
            }, cta.label, true, {
                fileName: "[project]/src/components/HeroCTA.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/HeroCTA.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = HeroCTA;
var _c;
__turbopack_context__.k.register(_c, "HeroCTA");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ScrollStory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollStory",
    ()=>ScrollStory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroCTA.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Heading(param) {
    let { chapter, level } = param;
    const lines = chapter.heading.split('\n');
    const content = lines.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "chapter__heading-line",
            children: [
                line,
                i < lines.length - 1 && ' '
            ]
        }, line, true, {
            fileName: "[project]/src/components/ScrollStory.tsx",
            lineNumber: 8,
            columnNumber: 5
        }, this));
    return level === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
        className: "chapter__heading chapter__heading--hero",
        children: content
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollStory.tsx",
        lineNumber: 13,
        columnNumber: 24
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        className: "chapter__heading",
        children: content
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollStory.tsx",
        lineNumber: 13,
        columnNumber: 97
    }, this);
}
_c = Heading;
function ScrollStory(param) {
    let { registerChapter } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hero__copy",
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapters"].map((chapter, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                ref: (el)=>registerChapter(i, el),
                className: "chapter chapter--".concat(chapter.id),
                "aria-labelledby": "chapter-".concat(chapter.id, "-title"),
                children: [
                    chapter.eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: chapter.eyebrow
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 30,
                        columnNumber: 31
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "chapter-".concat(chapter.id, "-title"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Heading, {
                            chapter: chapter,
                            level: i === 0 ? 1 : 2
                        }, void 0, false, {
                            fileName: "[project]/src/components/ScrollStory.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "chapter__body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chapter__body-full",
                                children: chapter.body
                            }, void 0, false, {
                                fileName: "[project]/src/components/ScrollStory.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            chapter.mobileBody && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chapter__body-short",
                                children: chapter.mobileBody
                            }, void 0, false, {
                                fileName: "[project]/src/components/ScrollStory.tsx",
                                lineNumber: 36,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    chapter.features && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "chapter__features",
                        children: chapter.features.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    f.index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "chapter__feature-index",
                                        children: f.index
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ScrollStory.tsx",
                                        lineNumber: 42,
                                        columnNumber: 31
                                    }, this),
                                    f.label
                                ]
                            }, f.id, true, {
                                fileName: "[project]/src/components/ScrollStory.tsx",
                                lineNumber: 41,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    chapter.tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "chapter__tag",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chapter__tag-dot",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ScrollStory.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            chapter.tag
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this),
                    chapter.ctas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroCTA"], {
                        ctas: chapter.ctas
                    }, void 0, false, {
                        fileName: "[project]/src/components/ScrollStory.tsx",
                        lineNumber: 54,
                        columnNumber: 28
                    }, this)
                ]
            }, chapter.id, true, {
                fileName: "[project]/src/components/ScrollStory.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ScrollStory.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c1 = ScrollStory;
var _c, _c1;
__turbopack_context__.k.register(_c, "Heading");
__turbopack_context__.k.register(_c1, "ScrollStory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FeatureCallout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureCallout",
    ()=>FeatureCallout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FeatureCallout(param) {
    let { config, label, index, compact = false } = param;
    _s();
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FeatureCallout.useCallback[register]": (el)=>{
            if (el) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutEls.set(config.id, el);
            else __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutEls.delete(config.id);
        }
    }["FeatureCallout.useCallback[register]"], [
        config.id
    ]);
    const lineDx = compact ? 48 : 96;
    const dy = compact ? config.dy * 0.75 : config.dy;
    const dx = config.side === 'right' ? lineDx : -lineDx;
    const len = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: register,
        className: "callout callout--".concat(config.side),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "callout__inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "callout__dot"
                }, void 0, false, {
                    fileName: "[project]/src/components/FeatureCallout.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "callout__line-wrap",
                    style: {
                        width: "".concat(len, "px"),
                        transform: "rotate(".concat(angle, "deg)")
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "callout__line"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FeatureCallout.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FeatureCallout.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "callout__label",
                    style: {
                        transform: "translate(".concat(dx, "px, ").concat(dy, "px) translate(").concat(config.side === 'right' ? '8px' : 'calc(-100% - 8px)', ", -50%)")
                    },
                    children: [
                        index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "callout__index",
                            children: index
                        }, void 0, false, {
                            fileName: "[project]/src/components/FeatureCallout.tsx",
                            lineNumber: 47,
                            columnNumber: 21
                        }, this),
                        label
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FeatureCallout.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FeatureCallout.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FeatureCallout.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(FeatureCallout, "Ys4Mh/F9H99vETvICbvgwMTc3ug=");
_c = FeatureCallout;
var _c;
__turbopack_context__.k.register(_c, "FeatureCallout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductFallback.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductFallback",
    ()=>ProductFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-client] (ecmascript)");
'use client';
;
;
;
const ProductFallback = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = function ProductFallback(param, ref) {
    let { hidden, mode } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "product-photo product-photo--".concat(mode).concat(hidden ? ' is-hidden' : ''),
        "aria-hidden": hidden,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "product-photo__frame",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productImage"].src,
                width: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productImage"].width,
                height: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productImage"].height,
                alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productImage"].alt,
                decoding: "async",
                fetchPriority: "high"
            }, void 0, false, {
                fileName: "[project]/src/components/ProductFallback.tsx",
                lineNumber: 14,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProductFallback.tsx",
            lineNumber: 13,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ProductFallback.tsx",
        lineNumber: 12,
        columnNumber: 7
    }, this);
});
_c1 = ProductFallback;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductFallback$forwardRef");
__turbopack_context__.k.register(_c1, "ProductFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TandoorHero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TandoorHero",
    ()=>TandoorHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$buildStoryTimeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/animation/buildStoryTimeline.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useEnvironment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollStory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ScrollStory.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FeatureCallout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FeatureCallout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductFallback.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
// The 3D scene (three.js + R3F) is code-split so it never blocks the first render.
const TandoorScene = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/src/three/TandoorScene.tsx [app-client] (ecmascript, async loader)"));
_c = TandoorScene;
/** If WebGL throws at runtime, keep the photo instead of a broken stage. */ class SceneBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    static getDerivedStateFromError() {
        return {
            failed: true
        };
    }
    componentDidCatch() {
        this.props.onError();
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
    constructor(...args){
        super(...args), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "state", {
            failed: false
        });
    }
}
const calloutLabel = (id)=>{
    for (const ch of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapters"]){
        var _ch_features;
        const f = (_ch_features = ch.features) === null || _ch_features === void 0 ? void 0 : _ch_features.find((x)=>x.id === id);
        if (f) return f;
    }
    return null;
};
function TandoorHero() {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutMode"])();
    const reduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [webglFailed, setWebglFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const webgl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TandoorHero.useMemo": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasWebGL"])()
    }["TandoorHero.useMemo"], []) && !webglFailed;
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fallbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chapterEls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadScene, setLoadScene] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sceneReady, setSceneReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].sceneReady);
    const registerChapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TandoorHero.useCallback[registerChapter]": (i, el)=>{
            chapterEls.current[i] = el;
        }
    }["TandoorHero.useCallback[registerChapter]"], []);
    // Start loading the 3D bundle once the page has painted.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TandoorHero.useEffect": ()=>{
            if (!webgl) return;
            const w = window;
            if (w.requestIdleCallback) {
                w.requestIdleCallback({
                    "TandoorHero.useEffect": ()=>setLoadScene(true)
                }["TandoorHero.useEffect"], {
                    timeout: 600
                });
            } else {
                const t = setTimeout({
                    "TandoorHero.useEffect.t": ()=>setLoadScene(true)
                }["TandoorHero.useEffect.t"], 200);
                return ({
                    "TandoorHero.useEffect": ()=>clearTimeout(t)
                })["TandoorHero.useEffect"];
            }
        }
    }["TandoorHero.useEffect"], [
        webgl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TandoorHero.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].stageEl = stageRef.current;
            const onReady = {
                "TandoorHero.useEffect.onReady": ()=>setSceneReady(true)
            }["TandoorHero.useEffect.onReady"];
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].readyListeners.add(onReady);
            return ({
                "TandoorHero.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].readyListeners.delete(onReady);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].stageEl = null;
                }
            })["TandoorHero.useEffect"];
        }
    }["TandoorHero.useEffect"], []);
    // Time-based reveal once the first lit frame exists (independent of scroll).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TandoorHero.useEffect": ()=>{
            if (!sceneReady) return;
            const tween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"], {
                intro: 1,
                duration: reduced ? 0 : 2.6,
                ease: 'power2.out',
                onUpdate: {
                    "TandoorHero.useEffect.tween": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate()
                }["TandoorHero.useEffect.tween"]
            });
            return ({
                "TandoorHero.useEffect": ()=>{
                    tween.kill();
                }
            })["TandoorHero.useEffect"];
        }
    }["TandoorHero.useEffect"], [
        sceneReady,
        reduced
    ]);
    // The scroll timeline — rebuilt when the layout or motion preference changes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "TandoorHero.useLayoutEffect": ()=>{
            const section = sectionRef.current;
            if (!section) return;
            const els = chapterEls.current.filter({
                "TandoorHero.useLayoutEffect.els": (e)=>!!e
            }["TandoorHero.useLayoutEffect.els"]);
            if (reduced) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutsEnabled = false;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$buildStoryTimeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["applyRestingComposition"])(mode);
                return;
            }
            const tl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$buildStoryTimeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildStoryTimeline"])({
                section,
                mode,
                chapterEls: els,
                fallbackImg: webgl ? null : fallbackRef.current,
                progressEl: progressRef.current,
                onChapterChange: setActive
            });
            return ({
                "TandoorHero.useLayoutEffect": ()=>{
                    var _tl_scrollTrigger;
                    (_tl_scrollTrigger = tl.scrollTrigger) === null || _tl_scrollTrigger === void 0 ? void 0 : _tl_scrollTrigger.kill();
                    tl.kill();
                    const inners = [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutEls.values()
                    ].map({
                        "TandoorHero.useLayoutEffect.inners": (el)=>el.firstElementChild
                    }["TandoorHero.useLayoutEffect.inners"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set([
                        ...els,
                        ...inners,
                        fallbackRef.current
                    ].filter(Boolean), {
                        clearProps: 'all'
                    });
                }
            })["TandoorHero.useLayoutEffect"];
        }
    }["TandoorHero.useLayoutEffect"], [
        mode,
        reduced,
        webgl
    ]);
    // Recalculate trigger positions after fonts load (heights may change).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TandoorHero.useEffect": ()=>{
            var _document_fonts;
            (_document_fonts = document.fonts) === null || _document_fonts === void 0 ? void 0 : _document_fonts.ready.then({
                "TandoorHero.useEffect": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].refresh()
            }["TandoorHero.useEffect"]);
        }
    }["TandoorHero.useEffect"], []);
    const goToChapter = (i)=>{
        const section = sectionRef.current;
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        const distance = section.offsetHeight - window.innerHeight;
        window.scrollTo({
            top: top + distance * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapterAnchors"][i] / 100,
            behavior: reduced ? 'auto' : 'smooth'
        });
    };
    const showCallouts = mode !== 'stacked' && webgl && !reduced;
    const motion = reduced ? 'reduced' : 'full';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        id: "top",
        className: "hero",
        "data-layout": mode,
        "data-motion": motion,
        "data-callouts": showCallouts ? 'on' : 'off',
        "data-active": active,
        "aria-label": "Raj Tandoor product story",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hero__sticky",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: stageRef,
                    className: "stage",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stage__atmosphere",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductFallback"], {
                            ref: fallbackRef,
                            hidden: webgl && sceneReady,
                            mode: webgl ? 'poster' : 'fallback'
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        webgl && loadScene && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneBoundary, {
                            onError: ()=>setWebglFailed(true),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                fallback: null,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stage__canvas-wrap".concat(sceneReady ? ' is-ready' : ''),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TandoorScene, {
                                        mode: mode
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TandoorHero.tsx",
                                        lineNumber: 153,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TandoorHero.tsx",
                                    lineNumber: 152,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/TandoorHero.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        showCallouts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "callout-layer".concat(sceneReady ? ' is-ready' : ''),
                            "aria-hidden": "true",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callouts"].map((c)=>{
                                const f = calloutLabel(c.id);
                                return f ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FeatureCallout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureCallout"], {
                                    config: c,
                                    label: f.label,
                                    index: f.index,
                                    compact: mode === 'tablet'
                                }, c.id, false, {
                                    fileName: "[project]/src/components/TandoorHero.tsx",
                                    lineNumber: 162,
                                    columnNumber: 28
                                }, this) : null;
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stage__vignette",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TandoorHero.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero__content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ScrollStory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollStory"], {
                        registerChapter: registerChapter
                    }, void 0, false, {
                        fileName: "[project]/src/components/TandoorHero.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/TandoorHero.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                !reduced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "chapter-nav",
                            "aria-label": "Product story chapters",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "chapter-nav__track",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: progressRef,
                                        className: "chapter-nav__progress"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TandoorHero.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TandoorHero.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chapters"].map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: i === active ? 'is-active' : undefined,
                                                "aria-current": i === active ? 'step' : undefined,
                                                onClick: ()=>goToChapter(i),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "chapter-nav__dot",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TandoorHero.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "chapter-nav__label",
                                                        children: c.navLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/TandoorHero.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TandoorHero.tsx",
                                                lineNumber: 182,
                                                columnNumber: 21
                                            }, this)
                                        }, c.id, false, {
                                            fileName: "[project]/src/components/TandoorHero.tsx",
                                            lineNumber: 181,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TandoorHero.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll-cue".concat(active > 0 ? ' is-hidden' : ''),
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "scroll-cue__line"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/TandoorHero.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                "Scroll to explore"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            className: "skip-story",
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["links"].exploreTandoors,
                            children: "Skip the product story"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TandoorHero.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TandoorHero.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/TandoorHero.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(TandoorHero, "/xft3BFPltxJ7fCCrTtSHptVKSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutMode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = TandoorHero;
var _c, _c1;
__turbopack_context__.k.register(_c, "TandoorScene");
__turbopack_context__.k.register(_c1, "TandoorHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TandoorHero.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/TandoorHero.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_200bb24c._.js.map