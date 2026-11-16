(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/three/TandoorModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TandoorModel",
    ()=>TandoorModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TandoorModel(param) {
    let { assets } = param;
    _s();
    const { geometries: g, materials: m } = assets;
    const lid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const R = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].radius;
    const TOP = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].top;
    const lidBaseY = TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].clayRise + 0.003;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "TandoorModel.useFrame": ()=>{
            const l = lid.current;
            if (!l) return;
            l.position.set(0, lidBaseY + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"].lidY, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"].lidZ);
            l.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"].lidTilt;
        }
    }["TandoorModel.useFrame"]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.body,
                material: m.steel,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].bodyHeight / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bottom,
                material: m.darkSteel,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet,
                "rotation-x": Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.band,
                material: m.steelBand,
                "position-y": TOP - 0.0375
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": TOP + 0.0005,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": TOP - 0.075,
                "rotation-x": Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandBottom,
                material: m.steelBand,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet + 0.03
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.bandCap,
                material: m.steelBand,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet + 0.06,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.clay,
                material: m.clay
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.chamber,
                material: m.chamber
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.ember,
                material: m.ember,
                "position-y": 0.21,
                "rotation-x": -Math.PI / 2
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                geometry: g.emblem,
                material: m.emblem,
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].emblemY
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorModel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            [
                1,
                -1
            ].map((side)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].sideHandleY,
                    "scale-x": side,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                            geometry: g.sideHandle,
                            material: m.polished
                        }, void 0, false, {
                            fileName: "[project]/src/three/TandoorModel.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                "position-y": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet + 0.235,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireFrame,
                        material: m.steelBand
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireDoor,
                        material: m.darkSteel,
                        "position-y": -0.01
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.fireOpening,
                        material: m.opening,
                        "position-y": -0.095
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
            rivets.map((param)=>{
                let [x, y] = param;
                const a = x / (R + 0.006);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    geometry: g.rivet,
                    material: m.polished,
                    position: [
                        Math.sin(a) * (R + 0.006),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].feet + y,
                        Math.cos(a) * (R + 0.006)
                    ]
                }, "".concat(x, "-").concat(y), false, {
                    fileName: "[project]/src/three/TandoorModel.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this);
            }),
            feetAngles.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    "rotation-y": a,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lid,
                "position-y": lidBaseY,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lid,
                        material: m.steel
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        geometry: g.lidHandle,
                        material: m.polished
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorModel.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
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
_s(TandoorModel, "wkTT/rNRZ426G4eRHiUlxzzkoFg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = TandoorModel;
var _c;
__turbopack_context__.k.register(_c, "TandoorModel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/three/textures.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-client] (ecmascript)");
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
        ctx.fillStyle = "rgba(".concat(v, ",").concat(v, ",").concat(v, ",").concat(0.25 + rand() * 0.4, ")");
        ctx.fillRect(x, 0, rand() < 0.85 ? 1 : 2, h);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"];
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
        ctx.fillStyle = dark ? "rgba(90,70,50,".concat(rand() * 0.22, ")") : "rgba(255,248,235,".concat(rand() * 0.25, ")");
        ctx.fillRect(x, y, 1 + rand() * 2, 1 + rand() * 2);
    }
    // irregular soot near the lip
    for(let i = 0; i < 160; i++){
        const x = rand() * w;
        const y = h - rand() * h * 0.45;
        const r = 6 + rand() * 26;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, "rgba(40,28,20,".concat(0.18 + rand() * 0.2, ")"));
        rg.addColorStop(1, 'rgba(40,28,20,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
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
        ctx.fillStyle = "rgba(0,0,0,".concat(rand() * 0.3, ")");
        ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
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
        rg.addColorStop(0, "rgba(255,".concat(150 + rand() * 60, ",").concat(60 + rand() * 40, ",").concat(0.5 + rand() * 0.5, ")"));
        rg.addColorStop(1, 'rgba(120,30,0,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
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
    ctx.font = "600 ".concat(s * 0.3, 'px Montserrat, "Segoe UI", Arial, sans-serif');
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].monogram, cx, s * 0.47, -s * 0.012);
    // RAJ TANDOOR
    ctx.fillStyle = gold(s * 0.53, s * 0.63);
    ctx.font = "700 ".concat(s * 0.088, 'px Montserrat, "Segoe UI", Arial, sans-serif');
    fitText(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].logoLine1, s * 0.8);
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].logoLine1, cx, s * 0.62, s * 0.004);
    // AND KITCHEN EQUIPMENT
    ctx.fillStyle = mode === 'metal' ? '#666666' : '#e8dcc2';
    ctx.font = "600 ".concat(s * 0.04, 'px Montserrat, "Segoe UI", Arial, sans-serif');
    drawTracked(ctx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].logoLine2, cx, s * 0.7, s * 0.004);
}
function fitText(ctx, text, maxW) {
    const m = ctx.measureText(text).width;
    if (m > maxW) {
        var _exec;
        var _exec_;
        const size = parseFloat((_exec_ = (_exec = /(\d+(\.\d+)?)px/.exec(ctx.font)) === null || _exec === void 0 ? void 0 : _exec[1]) !== null && _exec_ !== void 0 ? _exec_ : '40');
        ctx.font = ctx.font.replace(/\d+(\.\d+)?px/, "".concat(size * maxW / m, "px"));
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].emblemTextureUrl) {
        const map = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"]().loadAsync(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].emblemTextureUrl);
        map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
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
    } catch (e) {
    /* system font fallback is acceptable */ }
    const s = 1024;
    const color = makeCanvas(s, s);
    drawEmblem(color.ctx, s, 'color');
    const metal = makeCanvas(s, s);
    drawEmblem(metal.ctx, s, 'metal');
    const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](color.c);
    map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    map.anisotropy = 8;
    const metalnessMap = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](metal.c);
    metalnessMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"];
    return {
        map,
        metalnessMap
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/three/useTandoorAssets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTandoorAssets",
    ()=>useTandoorAssets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/dimensions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/textures.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
/**
 * Builds every geometry, material and texture of the procedural tandoor once.
 * They are shared by the product and its floor reflection, and disposed on unmount.
 */ const v2 = (x, y)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](x, y);
/** A polyline with rounded corners as a smooth 3D curve (used for handles). */ function roundedPath(points, radius) {
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurvePath"]();
    let prev = points[0].clone();
    for(let i = 1; i < points.length - 1; i++){
        const p = points[i];
        const inDir = p.clone().sub(points[i - 1]).normalize();
        const outDir = points[i + 1].clone().sub(p).normalize();
        const a = p.clone().addScaledVector(inDir, -radius);
        const b = p.clone().addScaledVector(outDir, radius);
        path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineCurve3"](prev, a));
        path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuadraticBezierCurve3"](a, p.clone(), b));
        prev = b;
    }
    path.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineCurve3"](prev, points[points.length - 1].clone()));
    return path;
}
/** A curved rectangular panel that sits on the cylinder surface, centred on the front (+z). */ function frontPanel(radius, width, height) {
    let segments = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 32;
    const len = width / radius;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](radius, radius, height, segments, 1, true, -len / 2, len);
}
function useTandoorAssets() {
    _s();
    const [emblem, setEmblem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const assets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTandoorAssets.useMemo[assets]": ()=>{
            const { radius: R, top: TOP } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"];
            const textures = {
                brushed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrushedRoughness"])(),
                clay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClayTexture"])(),
                chamber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChamberTexture"])(),
                ember: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmberTexture"])()
            };
            textures.brushed.repeat.set(3, 1);
            const materials = {
                steel: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                    color: '#d9dadb',
                    metalness: 1,
                    roughness: 0.78,
                    roughnessMap: textures.brushed,
                    anisotropy: 0.55,
                    anisotropyRotation: Math.PI / 2,
                    envMapIntensity: 1
                }),
                steelBand: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                    color: '#dcdddf',
                    metalness: 1,
                    roughness: 0.62,
                    roughnessMap: textures.brushed,
                    envMapIntensity: 1.1
                }),
                polished: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: '#e2e3e4',
                    metalness: 1,
                    roughness: 0.16
                }),
                darkSteel: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: '#33302d',
                    metalness: 0.85,
                    roughness: 0.42
                }),
                opening: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: '#060504',
                    roughness: 1,
                    metalness: 0,
                    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#ff6a1a'),
                    emissiveIntensity: 0
                }),
                clay: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    map: textures.clay,
                    roughness: 0.96,
                    metalness: 0,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                }),
                chamber: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    map: textures.chamber,
                    roughness: 1,
                    metalness: 0,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
                }),
                ember: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    map: textures.ember,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0, 0, 0),
                    transparent: true,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthWrite: false
                }),
                emblem: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    transparent: true,
                    alphaTest: 0.5,
                    metalness: 0.75,
                    roughness: 0.38,
                    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#ffffff'),
                    emissiveIntensity: 0.16,
                    polygonOffset: true,
                    polygonOffsetFactor: -2,
                    visible: false
                })
            };
            const handleR = 0.0125;
            const geometries = {
                body: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](R, R, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].bodyHeight, 160, 1, true),
                bottom: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](R, 96),
                band: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](R + 0.012, R + 0.012, 0.075, 160, 1, true),
                bandCap: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingGeometry"](R - 0.002, R + 0.012, 160),
                bandBottom: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](R + 0.01, R + 0.01, 0.06, 160, 1, true),
                clay: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"]([
                    v2(0.452, TOP - 0.16),
                    v2(0.449, TOP - 0.06),
                    v2(0.452, TOP - 0.006),
                    v2(0.462, TOP + 0.013),
                    v2(0.482, TOP + 0.021),
                    v2(0.56, TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].clayRise + 0.002),
                    v2(0.66, TOP + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].clayRise),
                    v2(0.692, TOP + 0.014),
                    v2(0.7, TOP + 0.002),
                    v2(0.7, TOP - 0.01)
                ], 160),
                chamber: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"]([
                    v2(0.452, TOP - 0.16),
                    v2(0.48, TOP - 0.36),
                    v2(0.54, TOP - 0.72),
                    v2(0.585, 0.85),
                    v2(0.58, 0.45),
                    v2(0.52, 0.26),
                    v2(0.4, 0.2),
                    v2(0.001, 0.2)
                ], 96),
                ember: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircleGeometry"](0.44, 48),
                lid: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LatheGeometry"]([
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
                lidHandle: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](roundedPath([
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.15, 0.04, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.15, 0.17, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.15, 0.17, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.15, 0.04, 0)
                ], 0.035), 64, handleR, 12, false),
                lidPlate: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.06, 0.01, 0.04),
                sideHandle: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](roundedPath([
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](R - 0.004, 0.09, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](R + 0.115, 0.09, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](R + 0.13, -0.09, 0),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](R - 0.004, -0.09, 0)
                ], 0.025), 64, handleR, 12, false),
                sidePlate: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.012, 0.055, 0.075),
                fireFrame: frontPanel(R + 0.004, 0.54, 0.42),
                fireDoor: frontPanel(R + 0.008, 0.43, 0.33),
                fireOpening: frontPanel(R + 0.011, 0.2, 0.15, 12),
                rivet: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.011, 12, 8),
                hinge: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.012, 0.012, 0.24, 12),
                footUpright: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.1, 0.085, 0.014),
                footPad: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.1, 0.01, 0.07),
                emblem: frontPanel(R + 0.0025, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].emblemSize, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIM"].emblemSize, 64)
            };
            return {
                textures,
                materials,
                geometries
            };
        }
    }["useTandoorAssets.useMemo[assets]"], []);
    // Emblem needs fonts (or an image) — load it asynchronously, then attach.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTandoorAssets.useEffect": ()=>{
            let cancelled = false;
            let loaded = null;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$textures$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmblemTextures"])().then({
                "useTandoorAssets.useEffect": (t)=>{
                    if (cancelled) {
                        var _t_metalnessMap;
                        t.map.dispose();
                        (_t_metalnessMap = t.metalnessMap) === null || _t_metalnessMap === void 0 ? void 0 : _t_metalnessMap.dispose();
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
                }
            }["useTandoorAssets.useEffect"]).catch({
                "useTandoorAssets.useEffect": ()=>{
                    /* Product still renders without the emblem. */ setEmblem({
                        map: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"](),
                        metalnessMap: null
                    });
                }
            }["useTandoorAssets.useEffect"]);
            return ({
                "useTandoorAssets.useEffect": ()=>{
                    var _loaded_metalnessMap;
                    cancelled = true;
                    loaded === null || loaded === void 0 ? void 0 : loaded.map.dispose();
                    loaded === null || loaded === void 0 ? void 0 : (_loaded_metalnessMap = loaded.metalnessMap) === null || _loaded_metalnessMap === void 0 ? void 0 : _loaded_metalnessMap.dispose();
                }
            })["useTandoorAssets.useEffect"];
        }
    }["useTandoorAssets.useEffect"], [
        assets
    ]);
    // Release GPU resources on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTandoorAssets.useEffect": ()=>({
                "useTandoorAssets.useEffect": ()=>{
                    Object.values(assets.geometries).forEach({
                        "useTandoorAssets.useEffect": (g)=>g.dispose()
                    }["useTandoorAssets.useEffect"]);
                    Object.values(assets.materials).forEach({
                        "useTandoorAssets.useEffect": (m)=>m.dispose()
                    }["useTandoorAssets.useEffect"]);
                    Object.values(assets.textures).forEach({
                        "useTandoorAssets.useEffect": (t)=>t.dispose()
                    }["useTandoorAssets.useEffect"]);
                }
            })["useTandoorAssets.useEffect"]
    }["useTandoorAssets.useEffect"], [
        assets
    ]);
    return {
        ...assets,
        emblemReady: emblem !== null
    };
}
_s(useTandoorAssets, "xMZBz40yppdrih5TB0FETgZIfQo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/three/TandoorScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TandoorScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e51d7528.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/ContactShadows.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Lightformer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshReflectorMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/MeshReflectorMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$TandoorModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/TandoorModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$useTandoorAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/useTandoorAssets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/animation/storyConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
/** Studio lighting baked into a small environment map once (frames=1): warm key panel, soft top, rim strip. */ function StudioEnvironment() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Environment"], {
        frames: 1,
        resolution: 256,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    '#050403'
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.0,
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
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.4,
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
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 1.6,
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
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 2.6,
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
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "rect",
                intensity: 0.9,
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
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightformer"], {
                form: "ring",
                intensity: 0.6,
                color: "#ff8f3a",
                position: [
                    -2,
                    0.5,
                    -6
                ],
                scale: 3
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/three/TandoorScene.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = StudioEnvironment;
const tmp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const keyPos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
/** Reads the shared animation state every rendered frame and applies it to camera, lights, product & callouts. */ function StoryRig(param) {
    let { assets } = param;
    _s();
    const { camera, gl, size, scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "StoryRig.useFrame": ()=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sceneState"];
            const cam = camera;
            const introPull = (1 - s.intro) * 1.6;
            cam.position.set(s.camX + introPull * 0.15, s.camY + introPull * 0.12, s.camZ + introPull);
            cam.lookAt(s.tgtX, s.tgtY, s.tgtZ);
            if (cam.fov !== s.fov) cam.fov = s.fov;
            // Shift the framing (product right of the copy on desktop, below it on phones) without changing perspective.
            cam.setViewOffset(size.width, size.height, -s.shiftX * size.width, -s.shiftY * size.height, size.width, size.height);
            cam.updateProjectionMatrix();
            cam.updateMatrixWorld();
            gl.toneMappingExposure = 0.25 + 0.8 * s.intro;
            scene.environmentRotation.y = s.envRot;
            if (product.current) {
                product.current.rotation.y = s.rotY;
                product.current.updateMatrixWorld();
            }
            if (key.current) {
                const r = 6;
                keyPos.set(Math.sin(s.keyAz) * r, 1 + s.keyEl * 5, Math.cos(s.keyAz) * r);
                key.current.position.copy(keyPos);
                key.current.intensity = 2.6 * s.key;
            }
            const glow = s.glow;
            if (inner.current) inner.current.intensity = glow * 3.2;
            assets.materials.ember.color.setScalar(glow * 0.85);
            assets.materials.opening.emissiveIntensity = glow * 0.35;
            // Pin DOM callouts to their 3D anchors.
            const w = size.width;
            const h = size.height;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutsEnabled && product.current) {
                for (const c of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callouts"]){
                    const el = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].calloutEls.get(c.id);
                    if (!el) continue;
                    tmp.set(c.anchor[0], c.anchor[1], c.anchor[2]).applyMatrix4(product.current.matrixWorld).project(cam);
                    const x = (tmp.x * 0.5 + 0.5) * w;
                    const y = (-tmp.y * 0.5 + 0.5) * h;
                    el.style.transform = "translate3d(".concat(x.toFixed(1), "px, ").concat(y.toFixed(1), "px, 0)");
                }
            }
            // Warm atmospheric glow behind the product follows it on screen.
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].stageEl) {
                tmp.set(0, 1.1, 0).project(cam);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].stageEl.style.setProperty('--glow-x', "".concat(((tmp.x * 0.5 + 0.5) * 100).toFixed(2), "%"));
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].stageEl.style.setProperty('--glow-y', "".concat(((-tmp.y * 0.5 + 0.5) * 100).toFixed(2), "%"));
            }
        }
    }["StoryRig.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.12,
                color: "#ffe9cf"
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                ref: key,
                color: "#ffc995",
                intensity: 2.6,
                position: [
                    -5,
                    4,
                    3
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: "#d6dde6",
                intensity: 0.35,
                position: [
                    4,
                    3,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                color: "#ffcf8f",
                intensity: 1.3,
                position: [
                    3,
                    4,
                    -5
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: inner,
                color: "#ff7f2e",
                intensity: 0,
                distance: 2.6,
                decay: 2,
                position: [
                    0,
                    0.95,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: product,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$TandoorModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TandoorModel"], {
                    assets: assets
                }, void 0, false, {
                    fileName: "[project]/src/three/TandoorScene.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(StoryRig, "y63juVSyuxaYwVIC3/sCQ7nHJkU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = StoryRig;
function useRadialFade() {
    _s1();
    const tex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useRadialFade.useMemo[tex]": ()=>{
            const c = document.createElement('canvas');
            c.width = c.height = 256;
            const ctx = c.getContext('2d');
            const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            g.addColorStop(0, '#fff');
            g.addColorStop(0.35, '#ddd');
            g.addColorStop(0.75, '#333');
            g.addColorStop(1, '#000');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, 256, 256);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](c);
        }
    }["useRadialFade.useMemo[tex]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRadialFade.useEffect": ()=>({
                "useRadialFade.useEffect": ()=>tex.dispose()
            })["useRadialFade.useEffect"]
    }["useRadialFade.useEffect"], [
        tex
    ]);
    return tex;
}
_s1(useRadialFade, "t5pV4L5WuhPCZ3KDPJmoubjchWA=");
function Floor(param) {
    let { reflections } = param;
    _s2();
    const fade = useRadialFade();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                "rotation-x": -Math.PI / 2,
                "position-y": -0.001,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            7,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorScene.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    reflections ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshReflectorMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshReflectorMaterial"], {
                        blur: [
                            400,
                            120
                        ],
                        resolution: 512,
                        mixBlur: 1,
                        mixStrength: 4,
                        mixContrast: 1,
                        roughness: 0.9,
                        depthScale: 1.1,
                        minDepthThreshold: 0.35,
                        maxDepthThreshold: 1.3,
                        color: "#15110d",
                        metalness: 0.5,
                        mirror: 0,
                        transparent: true,
                        alphaMap: fade,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorScene.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#15110d",
                        roughness: 0.6,
                        metalness: 0.4,
                        transparent: true,
                        alphaMap: fade,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/three/TandoorScene.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContactShadows"], {
                "position-y": 0.002,
                opacity: 0.75,
                scale: 4.5,
                blur: 2.6,
                far: 1.6,
                resolution: 512,
                frames: 1,
                color: "#000000"
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s2(Floor, "oV+4OLvcZ4eP33BXTzthJBJAa1s=", false, function() {
    return [
        useRadialFade
    ];
});
_c2 = Floor;
function ReadySignal(param) {
    let { ready } = param;
    _s3();
    const invalidate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "ReadySignal.useThree[invalidate]": (s)=>s.invalidate
    }["ReadySignal.useThree[invalidate]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadySignal.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate = ({
                "ReadySignal.useEffect": ()=>invalidate()
            })["ReadySignal.useEffect"];
            return ({
                "ReadySignal.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].invalidate = ({
                        "ReadySignal.useEffect": ()=>{}
                    })["ReadySignal.useEffect"];
                }
            })["ReadySignal.useEffect"];
        }
    }["ReadySignal.useEffect"], [
        invalidate
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadySignal.useEffect": ()=>{
            if (!ready) return;
            invalidate();
            // Wait two frames so the first lit frame is on screen before the poster fades.
            let raf2 = 0;
            const raf1 = requestAnimationFrame({
                "ReadySignal.useEffect.raf1": ()=>{
                    raf2 = requestAnimationFrame({
                        "ReadySignal.useEffect.raf1": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$animation$2f$storyStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storyBus"].markReady()
                    }["ReadySignal.useEffect.raf1"]);
                }
            }["ReadySignal.useEffect.raf1"]);
            return ({
                "ReadySignal.useEffect": ()=>{
                    cancelAnimationFrame(raf1);
                    cancelAnimationFrame(raf2);
                }
            })["ReadySignal.useEffect"];
        }
    }["ReadySignal.useEffect"], [
        ready,
        invalidate
    ]);
    return null;
}
_s3(ReadySignal, "Ux7OBBZ8MsSgaNv+j2Oq0AgJTP8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e51d7528$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c3 = ReadySignal;
function SceneContent(param) {
    let { mode } = param;
    _s4();
    const assets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$useTandoorAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTandoorAssets"])();
    const reflections = mode === 'desktop';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudioEnvironment, {}, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 204,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryRig, {
                assets: assets
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Floor, {
                reflections: reflections
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadySignal, {
                ready: assets.emblemReady
            }, void 0, false, {
                fileName: "[project]/src/three/TandoorScene.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s4(SceneContent, "tDGrINtiZGN1LtfalbZIQ1AjI3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$useTandoorAssets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTandoorAssets"]
    ];
});
_c4 = SceneContent;
function TandoorScene(param) {
    let { mode } = param;
    const dpr = mode === 'stacked' ? [
        1,
        1.5
    ] : [
        1,
        1.75
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        className: "stage__canvas",
        frameloop: "demand",
        dpr: dpr,
        gl: {
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        },
        camera: {
            fov: 30,
            near: 0.1,
            far: 60,
            position: [
                1.7,
                2.25,
                9
            ]
        },
        onCreated: (param)=>{
            let { gl } = param;
            gl.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
            gl.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        },
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneContent, {
            mode: mode
        }, void 0, false, {
            fileName: "[project]/src/three/TandoorScene.tsx",
            lineNumber: 227,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/three/TandoorScene.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_c5 = TandoorScene;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "StudioEnvironment");
__turbopack_context__.k.register(_c1, "StoryRig");
__turbopack_context__.k.register(_c2, "Floor");
__turbopack_context__.k.register(_c3, "ReadySignal");
__turbopack_context__.k.register(_c4, "SceneContent");
__turbopack_context__.k.register(_c5, "TandoorScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_three_85ad71f7._.js.map