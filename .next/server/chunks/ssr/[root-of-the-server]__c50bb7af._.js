module.exports = [
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[project]/src/three/dimensions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/animation/storyConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-ssr] (ecmascript)");
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
const R = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].radius;
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
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].top + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].clayRise,
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
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].sideHandleY,
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
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].sideHandleY - 0.08,
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
}),
"[project]/src/animation/storyStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sceneState",
    ()=>sceneState,
    "storyBus",
    ()=>storyBus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyConfig.ts [app-ssr] (ecmascript)");
;
/**
 * Mutable animation state shared between the GSAP timeline (writer) and the
 * three.js render loop (reader). It is deliberately NOT React state: GSAP tweens
 * these numbers directly and the canvas re-renders on demand, so React never
 * re-renders on scroll.
 */ const start = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shotsByMode"].desktop.reveal0;
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
}),
"[project]/src/three/TandoorModel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TandoorModel",
    ()=>TandoorModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function TandoorModel({ assets }) {
    const { geometries: g, materials: m } = assets;
    const lid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const R = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].radius;
    const TOP = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].top;
    const lidBaseY = TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].clayRise + 0.003;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])(()=>{
        const l = lid.current;
        if (!l) return;
        l.position.set(0, lidBaseY + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sceneState"].lidY, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sceneState"].lidZ);
        l.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sceneState"].lidTilt;
    });
    const feetAngles = [
        45,
        135,
        225,
        315
    ].map((d)=>d * Math.PI / 180);
    const rivets = [
        [
            -0.245,
            0.425
        ],
        [
            0.245,
            0.425
        ],
        [
            -0.245,
            0.05
        ],
        [
            0.245,
            0.05
        ]
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.body,
                material: m.steel,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].bodyHeight / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bottom,
                material: m.darkSteel,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet,
                "rotation-x": Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.band,
                material: m.steelBand,
                "position-y": TOP - 0.0375
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": TOP + 0.0005,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": TOP - 0.075,
                "rotation-x": Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandBottom,
                material: m.steelBand,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet + 0.03
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet + 0.06,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.clay,
                material: m.clay
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.chamber,
                material: m.chamber
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.ember,
                material: m.ember,
                "position-y": 0.21,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.emblem,
                material: m.emblem,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].emblemY
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            [
                1,
                -1
            ].map((side)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].sideHandleY,
                    "scale-x": side,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.sideHandle,
                            material: m.polished
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.sidePlate,
                            material: m.steelBand,
                            position: [
                                R + 0.004,
                                0.09,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.sidePlate,
                            material: m.steelBand,
                            position: [
                                R + 0.004,
                                -0.09,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, side, true, {
                    fileName: "[project]/src/three/TandoorModel.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet + 0.235,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireFrame,
                        material: m.steelBand
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireDoor,
                        material: m.darkSteel,
                        "position-y": -0.01
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireOpening,
                        material: m.opening,
                        "position-y": -0.095
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.hinge,
                        material: m.polished,
                        position: [
                            Math.sin(0.218 / R) * (R + 0.01),
                            -0.01,
                            Math.cos(0.218 / R) * (R + 0.01)
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            rivets.map(([x, y])=>{
                const a = x / (R + 0.006);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    geometry: g.rivet,
                    material: m.polished,
                    position: [
                        Math.sin(a) * (R + 0.006),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].feet + y,
                        Math.cos(a) * (R + 0.006)
                    ]
                }, `${x}-${y}`, false, {
                    fileName: "[project]/src/three/TandoorModel.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this);
            }),
            feetAngles.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    "rotation-y": a,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.footUpright,
                            material: m.steelBand,
                            position: [
                                0,
                                0.0425,
                                R - 0.03
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.footPad,
                            material: m.steelBand,
                            position: [
                                0,
                                0.005,
                                R - 0.01
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, a, true, {
                    fileName: "[project]/src/three/TandoorModel.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lid,
                "position-y": lidBaseY,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lid,
                        material: m.steel
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lidHandle,
                        material: m.polished
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lidPlate,
                        material: m.steelBand,
                        position: [
                            -0.15,
                            0.045,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lidPlate,
                        material: m.steelBand,
                        position: [
                            0.15,
                            0.045,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/three/TandoorModel.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/three/textures.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBrushedRoughness",
    ()=>createBrushedRoughness,
    "createChamberTexture",
    ()=>createChamberTexture,
    "createClayTexture",
    ()=>createClayTexture,
    "createEmberTexture",
    ()=>createEmberTexture,
    "createEmblemTextures",
    ()=>createEmblemTextures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-ssr] (ecmascript)");
;
;
/**
 * Procedural textures generated on a canvas at runtime — no network requests,
 * no large image downloads. Every texture created here must be disposed by the caller.
 */ function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    return {
        c,
        ctx
    };
}
/** Seeded random so textures are identical on every load. */ function rng(seed) {
    let s = seed >>> 0;
    return ()=>{
        s = s * 1664525 + 1013904223 >>> 0;
        return s / 4294967296;
    };
}
function createBrushedRoughness() {
    const w = 1024;
    const h = 64;
    const { c, ctx } = makeCanvas(w, h);
    const rand = rng(7);
    ctx.fillStyle = 'rgb(92,92,92)';
    ctx.fillRect(0, 0, w, h);
    for(let i = 0; i < 2600; i++){
        const x = rand() * w;
        const v = 60 + rand() * 80;
        ctx.fillStyle = `rgba(${v},${v},${v},${0.25 + rand() * 0.4})`;
        ctx.fillRect(x, 0, rand() < 0.85 ? 1 : 2, h);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"];
    tex.anisotropy = 8;
    return tex;
}
function createClayTexture() {
    const w = 1024;
    const h = 256;
    const { c, ctx } = makeCanvas(w, h);
    const rand = rng(21);
    // v=0 (canvas bottom) = inner lip, v=1 (canvas top) = outer edge
    const g = ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, '#3b2a1f');
    g.addColorStop(0.18, '#6d5440');
    g.addColorStop(0.36, '#bfa98c');
    g.addColorStop(0.55, '#dccdb4');
    g.addColorStop(1, '#e6dac6');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // speckle
    for(let i = 0; i < 9000; i++){
        const x = rand() * w;
        const y = rand() * h;
        const dark = rand() < 0.55;
        ctx.fillStyle = dark ? `rgba(90,70,50,${rand() * 0.22})` : `rgba(255,248,235,${rand() * 0.25})`;
        ctx.fillRect(x, y, 1 + rand() * 2, 1 + rand() * 2);
    }
    // irregular soot near the lip
    for(let i = 0; i < 160; i++){
        const x = rand() * w;
        const y = h - rand() * h * 0.45;
        const r = 6 + rand() * 26;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, `rgba(40,28,20,${0.18 + rand() * 0.2})`);
        rg.addColorStop(1, 'rgba(40,28,20,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    tex.anisotropy = 8;
    return tex;
}
function createChamberTexture() {
    const w = 512;
    const h = 256;
    const { c, ctx } = makeCanvas(w, h);
    const rand = rng(5);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#5a4130');
    g.addColorStop(0.25, '#3a281d');
    g.addColorStop(1, '#140d09');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for(let i = 0; i < 5000; i++){
        ctx.fillStyle = `rgba(0,0,0,${rand() * 0.3})`;
        ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    return tex;
}
function createEmberTexture() {
    const s = 256;
    const { c, ctx } = makeCanvas(s, s);
    const rand = rng(11);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, s, s);
    const base = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    base.addColorStop(0, 'rgba(255,120,40,0.55)');
    base.addColorStop(0.6, 'rgba(160,50,10,0.25)');
    base.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    for(let i = 0; i < 260; i++){
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * s * 0.42;
        const x = s / 2 + Math.cos(a) * d;
        const y = s / 2 + Math.sin(a) * d;
        const r = 2 + rand() * 7;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, `rgba(255,${150 + rand() * 60},${60 + rand() * 40},${0.5 + rand() * 0.5})`);
        rg.addColorStop(1, 'rgba(120,30,0,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    return tex;
}
/**
 * Draws the Raj Tandoor emblem — black disc, gold ring, "RT" monogram and the
 * brand lines — with real text (never generated lettering).
 * mode "color" draws the artwork; mode "metal" draws a metalness mask (gold = white).
 */ function drawEmblem(ctx, s, mode) {
    const cx = s / 2;
    const cy = s / 2;
    const R = s * 0.48;
    const gold = (y0, y1)=>{
        if (mode === 'metal') return '#ffffff';
        const g = ctx.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, '#f0c66a');
        g.addColorStop(0.5, '#d9a441');
        g.addColorStop(1, '#a77a30');
        return g;
    };
    ctx.clearRect(0, 0, s, s);
    // black disc
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = mode === 'metal' ? '#000000' : '#0b0a09';
    ctx.fill();
    // gold ring
    ctx.lineWidth = s * 0.022;
    ctx.strokeStyle = gold(cy - R, cy + R);
    ctx.beginPath();
    ctx.arc(cx, cy, R - s * 0.03, 0, Math.PI * 2);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    // RT monogram
    ctx.fillStyle = gold(s * 0.18, s * 0.5);
    ctx.font = `600 ${s * 0.3}px Montserrat, "Segoe UI", Arial, sans-serif`;
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].monogram, cx, s * 0.47, -s * 0.012);
    // RAJ TANDOOR
    ctx.fillStyle = gold(s * 0.53, s * 0.63);
    ctx.font = `700 ${s * 0.088}px Montserrat, "Segoe UI", Arial, sans-serif`;
    fitText(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].logoLine1, s * 0.8);
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].logoLine1, cx, s * 0.62, s * 0.004);
    // AND KITCHEN EQUIPMENT
    ctx.fillStyle = mode === 'metal' ? '#666666' : '#e8dcc2';
    ctx.font = `600 ${s * 0.04}px Montserrat, "Segoe UI", Arial, sans-serif`;
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].logoLine2, cx, s * 0.7, s * 0.004);
}
function fitText(ctx, text, maxW) {
    const m = ctx.measureText(text).width;
    if (m > maxW) {
        const size = parseFloat(/(\d+(\.\d+)?)px/.exec(ctx.font)?.[1] ?? '40');
        ctx.font = ctx.font.replace(/\d+(\.\d+)?px/, `${size * maxW / m}px`);
    }
}
function drawTracked(ctx, text, cx, y, tracking) {
    const chars = [
        ...text
    ];
    const widths = chars.map((ch)=>ctx.measureText(ch).width);
    const total = widths.reduce((a, b)=>a + b, 0) + tracking * (chars.length - 1);
    let x = cx - total / 2;
    ctx.textAlign = 'left';
    chars.forEach((ch, i)=>{
        ctx.fillText(ch, x, y);
        x += widths[i] + tracking;
    });
    ctx.textAlign = 'center';
}
async function createEmblemTextures() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].emblemTextureUrl) {
        const map = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]().loadAsync(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["brand"].emblemTextureUrl);
        map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        map.anisotropy = 8;
        return {
            map,
            metalnessMap: null
        };
    }
    try {
        await Promise.all([
            document.fonts.load('600 100px Montserrat'),
            document.fonts.load('700 100px Montserrat')
        ]);
    } catch  {
    /* system font fallback is acceptable */ }
    const s = 1024;
    const color = makeCanvas(s, s);
    drawEmblem(color.ctx, s, 'color');
    const metal = makeCanvas(s, s);
    drawEmblem(metal.ctx, s, 'metal');
    const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](color.c);
    map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    map.anisotropy = 8;
    const metalnessMap = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](metal.c);
    metalnessMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NoColorSpace"];
    return {
        map,
        metalnessMap
    };
}
}),
"[project]/src/three/useTandoorAssets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTandoorAssets",
    ()=>useTandoorAssets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/textures.ts [app-ssr] (ecmascript)");
;
;
;
;
/**
 * Builds every geometry, material and texture of the procedural tandoor once.
 * They are shared by the product and its floor reflection, and disposed on unmount.
 */ const v2 = (x, y)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](x, y);
/** A polyline with rounded corners as a smooth 3D curve (used for handles). */ function roundedPath(points, radius) {
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CurvePath"]();
    let prev = points[0].clone();
    for(let i = 1; i < points.length - 1; i++){
        const p = points[i];
        const inDir = p.clone().sub(points[i - 1]).normalize();
        const outDir = points[i + 1].clone().sub(p).normalize();
        const a = p.clone().addScaledVector(inDir, -radius);
        const b = p.clone().addScaledVector(outDir, radius);
        path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineCurve3"](prev, a));
        path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuadraticBezierCurve3"](a, p.clone(), b));
        prev = b;
    }
    path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineCurve3"](prev, points[points.length - 1].clone()));
    return path;
}
/** A curved rectangular panel that sits on the cylinder surface, centred on the front (+z). */ function frontPanel(radius, width, height, segments = 32) {
    const len = width / radius;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](radius, radius, height, segments, 1, true, -len / 2, len);
}
function useTandoorAssets() {
    const [emblem, setEmblem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const assets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const { radius: R, top: TOP } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"];
        const textures = {
            brushed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrushedRoughness"])(),
            clay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClayTexture"])(),
            chamber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChamberTexture"])(),
            ember: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmberTexture"])()
        };
        textures.brushed.repeat.set(3, 1);
        const materials = {
            steel: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                color: '#d9dadb',
                metalness: 1,
                roughness: 0.78,
                roughnessMap: textures.brushed,
                anisotropy: 0.55,
                anisotropyRotation: Math.PI / 2,
                envMapIntensity: 1
            }),
            steelBand: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                color: '#dcdddf',
                metalness: 1,
                roughness: 0.62,
                roughnessMap: textures.brushed,
                envMapIntensity: 1.1
            }),
            polished: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: '#e2e3e4',
                metalness: 1,
                roughness: 0.16
            }),
            darkSteel: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: '#33302d',
                metalness: 0.85,
                roughness: 0.42
            }),
            opening: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: '#060504',
                roughness: 1,
                metalness: 0,
                emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#ff6a1a'),
                emissiveIntensity: 0
            }),
            clay: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                map: textures.clay,
                roughness: 0.96,
                metalness: 0,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
            }),
            chamber: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                map: textures.chamber,
                roughness: 1,
                metalness: 0,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
            }),
            ember: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: textures.ember,
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0, 0, 0),
                transparent: true,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            }),
            emblem: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                transparent: true,
                alphaTest: 0.5,
                metalness: 0.75,
                roughness: 0.38,
                emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]('#ffffff'),
                emissiveIntensity: 0.16,
                polygonOffset: true,
                polygonOffsetFactor: -2,
                visible: false
            })
        };
        const handleR = 0.0125;
        const geometries = {
            body: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](R, R, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].bodyHeight, 160, 1, true),
            bottom: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircleGeometry"](R, 96),
            band: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](R + 0.012, R + 0.012, 0.075, 160, 1, true),
            bandCap: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RingGeometry"](R - 0.002, R + 0.012, 160),
            bandBottom: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](R + 0.01, R + 0.01, 0.06, 160, 1, true),
            clay: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LatheGeometry"]([
                v2(0.452, TOP - 0.16),
                v2(0.449, TOP - 0.06),
                v2(0.452, TOP - 0.006),
                v2(0.462, TOP + 0.013),
                v2(0.482, TOP + 0.021),
                v2(0.56, TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].clayRise + 0.002),
                v2(0.66, TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].clayRise),
                v2(0.692, TOP + 0.014),
                v2(0.7, TOP + 0.002),
                v2(0.7, TOP - 0.01)
            ], 160),
            chamber: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LatheGeometry"]([
                v2(0.452, TOP - 0.16),
                v2(0.48, TOP - 0.36),
                v2(0.54, TOP - 0.72),
                v2(0.585, 0.85),
                v2(0.58, 0.45),
                v2(0.52, 0.26),
                v2(0.4, 0.2),
                v2(0.001, 0.2)
            ], 96),
            ember: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircleGeometry"](0.44, 48),
            lid: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LatheGeometry"]([
                v2(0.001, 0.05),
                v2(0.2, 0.048),
                v2(0.4, 0.04),
                v2(0.5, 0.029),
                v2(0.532, 0.02),
                v2(0.545, 0.009),
                v2(0.545, 0.0),
                v2(0.53, -0.004),
                v2(0.3, 0.004),
                v2(0.001, 0.01)
            ], 128),
            lidHandle: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TubeGeometry"](roundedPath([
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-0.15, 0.04, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-0.15, 0.17, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0.15, 0.17, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0.15, 0.04, 0)
            ], 0.035), 64, handleR, 12, false),
            lidPlate: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.06, 0.01, 0.04),
            sideHandle: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TubeGeometry"](roundedPath([
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](R - 0.004, 0.09, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](R + 0.115, 0.09, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](R + 0.13, -0.09, 0),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](R - 0.004, -0.09, 0)
            ], 0.025), 64, handleR, 12, false),
            sidePlate: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.012, 0.055, 0.075),
            fireFrame: frontPanel(R + 0.004, 0.54, 0.42),
            fireDoor: frontPanel(R + 0.008, 0.43, 0.33),
            fireOpening: frontPanel(R + 0.011, 0.2, 0.15, 12),
            rivet: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.011, 12, 8),
            hinge: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.012, 0.012, 0.24, 12),
            footUpright: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.1, 0.085, 0.014),
            footPad: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](0.1, 0.01, 0.07),
            emblem: frontPanel(R + 0.0025, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].emblemSize, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIM"].emblemSize, 64)
        };
        return {
            textures,
            materials,
            geometries
        };
    }, []);
    // Emblem needs fonts (or an image) — load it asynchronously, then attach.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        let loaded = null;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmblemTextures"])().then((t)=>{
            if (cancelled) {
                t.map.dispose();
                t.metalnessMap?.dispose();
                return;
            }
            loaded = t;
            const m = assets.materials.emblem;
            m.map = t.map;
            m.emissiveMap = t.map;
            m.metalnessMap = t.metalnessMap;
            if (!t.metalnessMap) m.metalness = 0.2;
            m.visible = true;
            m.needsUpdate = true;
            setEmblem(t);
        }).catch(()=>{
            /* Product still renders without the emblem. */ setEmblem({
                map: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"](),
                metalnessMap: null
            });
        });
        return ()=>{
            cancelled = true;
            loaded?.map.dispose();
            loaded?.metalnessMap?.dispose();
        };
    }, [
        assets
    ]);
    // Release GPU resources on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            Object.values(assets.geometries).forEach((g)=>g.dispose());
            Object.values(assets.materials).forEach((m)=>m.dispose());
            Object.values(assets.textures).forEach((t)=>t.dispose());
        }, [
        assets
    ]);
    return {
        ...assets,
        emblemReady: emblem !== null
    };
}
}),
"[project]/src/three/TransitionScene.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransitionScene",
    ()=>TransitionScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-ssr] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-ssr] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/ContactShadows.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Lightformer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$TandoorModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/TandoorModel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$useTandoorAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/useTandoorAssets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/tAnim.ts [app-ssr] (ecmascript)");
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
function TransitionEnvironment() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Environment"], {
        frames: 1,
        resolution: 128,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    '#050302'
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.2,
                color: "#ffe9d2",
                position: [
                    -4.5,
                    2,
                    2.5
                ],
                scale: [
                    0.9,
                    8,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.6,
                color: "#f3f1ec",
                position: [
                    -1.2,
                    2,
                    5
                ],
                scale: [
                    0.6,
                    8,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 1.8,
                color: "#e9ecef",
                position: [
                    3.5,
                    2,
                    3.5
                ],
                scale: [
                    0.5,
                    8,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.8,
                color: "#ffd6a3",
                position: [
                    5,
                    1.8,
                    -2
                ],
                scale: [
                    0.4,
                    8,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 1.0,
                color: "#f4efe7",
                position: [
                    0,
                    6,
                    0
                ],
                "rotation-x": Math.PI / 2,
                scale: [
                    5,
                    2,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/three/TransitionScene.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function TransitionModelRig({ activeRef }) {
    const { camera, invalidate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const assets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$useTandoorAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTandoorAssets"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const tick = ()=>{
            if (activeRef.current) invalidate();
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(tick);
        return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(tick);
    }, [
        invalidate,
        activeRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])(()=>{
        if (!activeRef.current) return;
        const g = groupRef.current;
        if (g) {
            g.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tAnim"].posX;
            g.rotation.y = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tAnim"].rotY;
        }
        const cam = camera;
        cam.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tAnim"].cameraZ;
        cam.updateProjectionMatrix();
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: groupRef,
                position: [
                    5,
                    0,
                    0
                ],
                scale: [
                    0.78,
                    0.78,
                    0.78
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$TandoorModel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TandoorModel"], {
                    assets: assets
                }, void 0, false, {
                    fileName: "[project]/src/three/TransitionScene.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContactShadows"], {
                position: [
                    0,
                    -0.001,
                    0
                ],
                opacity: 0.55,
                scale: 4,
                blur: 1.8,
                far: 1.6,
                color: "#0a0804",
                frames: 1
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function TransitionScene({ activeRef }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        frameloop: "demand",
        camera: {
            position: [
                0,
                1.6,
                4.5
            ],
            fov: 45,
            near: 0.1,
            far: 50
        },
        dpr: [
            1,
            Math.min(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1, 2)
        ],
        gl: {
            alpha: true,
            antialias: true,
            toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
            toneMappingExposure: 1.1
        },
        style: {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TransitionEnvironment, {}, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.1,
                color: "#ffe8cc"
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: "#ffc995",
                intensity: 2.4,
                position: [
                    -5,
                    4,
                    3
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: "#d6dde6",
                intensity: 0.4,
                position: [
                    4,
                    3,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: "#ffcf8f",
                intensity: 1.2,
                position: [
                    3,
                    4,
                    -5
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TransitionModelRig, {
                activeRef: activeRef
            }, void 0, false, {
                fileName: "[project]/src/three/TransitionScene.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/three/TransitionScene.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c50bb7af._.js.map