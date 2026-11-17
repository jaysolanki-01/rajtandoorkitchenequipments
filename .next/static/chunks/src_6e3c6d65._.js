(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
const BASE = '/api';
class ApiError extends Error {
    constructor(status, message){
        super(message), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "status", void 0), this.status = status;
        this.name = 'ApiError';
    }
}
async function request(path) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const res = await fetch("".concat(BASE).concat(path), {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    const json = await res.json().catch(()=>({
            success: false,
            error: 'Unexpected server response.'
        }));
    if (!res.ok || !json.success) {
        throw new ApiError(res.status, json.error || "Request failed (".concat(res.status, ")"));
    }
    var _json_data;
    return (_json_data = json.data) !== null && _json_data !== void 0 ? _json_data : json;
}
const api = {
    get: (path)=>request(path),
    post: (path, body)=>request(path, {
            method: 'POST',
            body: JSON.stringify(body)
        }),
    patch: (path, body)=>request(path, {
            method: 'PATCH',
            body: JSON.stringify(body)
        }),
    delete: (path)=>request(path, {
            method: 'DELETE'
        })
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/auth/me').then(setUser).catch({
                "AuthProvider.useEffect": ()=>{}
            }["AuthProvider.useEffect"]).finally({
                "AuthProvider.useEffect": ()=>setIsLoading(false)
            }["AuthProvider.useEffect"]);
        }
    }["AuthProvider.useEffect"], []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            const u = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/login', {
                email,
                password
            });
            setUser(u);
        }
    }["AuthProvider.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (name, email, password, phone)=>{
            const u = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/register', {
                name,
                email,
                password,
                phone
            });
            setUser(u);
        }
    }["AuthProvider.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/logout');
            } catch (e) {}
            setUser(null);
        }
    }["AuthProvider.useCallback[logout]"], []);
    const isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
    var _user_email;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoggedIn: !!user,
            isAdmin,
            isLoading,
            login,
            register,
            logout,
            email: (_user_email = user === null || user === void 0 ? void 0 : user.email) !== null && _user_email !== void 0 ? _user_email : null
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/AuthContext.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "qbiN9HswE+Mb6fXaD9NhPqvg5Co=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'rt-cart';
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}
function CartProvider(param) {
    let { children } = param;
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(load);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch (e) {}
        }
    }["CartProvider.useEffect"], [
        items
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[addItem]": function(product) {
            let quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            setItems({
                "CartProvider.useCallback[addItem]": (prev)=>{
                    const existing = prev.find({
                        "CartProvider.useCallback[addItem].existing": (i)=>i.product.id === product.id
                    }["CartProvider.useCallback[addItem].existing"]);
                    if (existing) {
                        return prev.map({
                            "CartProvider.useCallback[addItem]": (i)=>i.product.id === product.id ? {
                                    ...i,
                                    quantity: i.quantity + quantity
                                } : i
                        }["CartProvider.useCallback[addItem]"]);
                    }
                    return [
                        ...prev,
                        {
                            product,
                            quantity
                        }
                    ];
                }
            }["CartProvider.useCallback[addItem]"]);
        }
    }["CartProvider.useCallback[addItem]"], []);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[removeItem]": (id)=>{
            setItems({
                "CartProvider.useCallback[removeItem]": (prev)=>prev.filter({
                        "CartProvider.useCallback[removeItem]": (i)=>i.product.id !== id
                    }["CartProvider.useCallback[removeItem]"])
            }["CartProvider.useCallback[removeItem]"]);
        }
    }["CartProvider.useCallback[removeItem]"], []);
    const updateQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[updateQuantity]": (id, quantity)=>{
            if (quantity < 1) {
                setItems({
                    "CartProvider.useCallback[updateQuantity]": (prev)=>prev.filter({
                            "CartProvider.useCallback[updateQuantity]": (i)=>i.product.id !== id
                        }["CartProvider.useCallback[updateQuantity]"])
                }["CartProvider.useCallback[updateQuantity]"]);
            } else {
                setItems({
                    "CartProvider.useCallback[updateQuantity]": (prev)=>prev.map({
                            "CartProvider.useCallback[updateQuantity]": (i)=>i.product.id === id ? {
                                    ...i,
                                    quantity
                                } : i
                        }["CartProvider.useCallback[updateQuantity]"])
                }["CartProvider.useCallback[updateQuantity]"]);
            }
        }
    }["CartProvider.useCallback[updateQuantity]"], []);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[clearCart]": ()=>setItems([])
    }["CartProvider.useCallback[clearCart]"], []);
    const itemCount = items.reduce((s, i)=>s + i.quantity, 0);
    const subtotal = items.some((i)=>i.product.price === null) ? null : items.reduce((s, i)=>{
        var _i_product_price;
        return s + ((_i_product_price = i.product.price) !== null && _i_product_price !== void 0 ? _i_product_price : 0) * i.quantity;
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            itemCount,
            subtotal
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/CartContext.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(CartProvider, "DOVQY+CBp7e29kwqaWIFp7MBAPM=");
_c = CartProvider;
function useCart() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}
_s1(useCart, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/WishlistContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WishlistProvider",
    ()=>WishlistProvider,
    "useWishlist",
    ()=>useWishlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const WishlistContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'rt-wishlist';
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
        return new Set();
    }
}
function WishlistProvider(param) {
    let { children } = param;
    _s();
    const [ids, setIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(load);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WishlistProvider.useEffect": ()=>{
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([
                    ...ids
                ]));
            } catch (e) {}
        }
    }["WishlistProvider.useEffect"], [
        ids
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WishlistProvider.useCallback[toggle]": (id)=>{
            setIds({
                "WishlistProvider.useCallback[toggle]": (prev)=>{
                    const next = new Set(prev);
                    if (next.has(id)) next.delete(id);
                    else next.add(id);
                    return next;
                }
            }["WishlistProvider.useCallback[toggle]"]);
        }
    }["WishlistProvider.useCallback[toggle]"], []);
    const has = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WishlistProvider.useCallback[has]": (id)=>ids.has(id)
    }["WishlistProvider.useCallback[has]"], [
        ids
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistContext.Provider, {
        value: {
            ids,
            toggle,
            has,
            count: ids.size
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/WishlistContext.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(WishlistProvider, "1t3A83j9JIP1x7noS1ThQKp1lL0=");
_c = WishlistProvider;
function useWishlist() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
    return ctx;
}
_s1(useWishlist, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "WishlistProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Product catalog for Raj Tandoor & Kitchen Equipment.
 *
 * IMPORTANT: Only confirmed, visible product facts are listed here.
 * Do not add invented prices, specifications, certifications, or warranty claims.
 * Demo products are clearly marked with isDemo: true.
 */ __turbopack_context__.s([
    "categories",
    ()=>categories,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "products",
    ()=>products
]);
const products = [
    // ── TANDOORS ──────────────────────────────────────────────────────────────
    {
        id: 'ss-tandoor-mini',
        slug: 'stainless-steel-tandoor-mini',
        name: 'Stainless Steel Tandoor — Mini',
        sizeGroup: 'ss-tandoor',
        sizeLabel: 'Mini',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Compact stainless-steel tandoor ideal for small restaurants, home caterers, and food stalls. Clay-lined chamber, solid-fuel operation.',
        description: "The Mini Stainless Steel Tandoor from Raj Tandoor is built for compact commercial use — perfect for small restaurants, cloud kitchens, and food stalls.\n\nFeatures a clay-lined cooking chamber, removable lid, side carrying handles, and a front firebox for solid-fuel or gas operation. Stainless-steel body ensures durability and easy cleaning.\n\nContact us for bulk pricing and customisation options.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 12000,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel (SS 304)'
            },
            {
                label: 'Lining',
                value: 'Clay'
            },
            {
                label: 'Fuel Type',
                value: 'Solid Fuel / Wood Charcoal'
            },
            {
                label: 'Size',
                value: 'Mini (approx. 18″ diameter)'
            },
            {
                label: 'Suitable For',
                value: 'Small restaurants, food stalls'
            }
        ],
        features: [
            'SS 304 stainless steel body',
            'Clay-lined cooking chamber',
            'Removable lid with handle',
            'Side carrying handles',
            'Front firebox opening',
            'Easy to clean and maintain'
        ],
        isDemo: false,
        inStock: true,
        sku: 'RT-SST-01',
        included: [
            'Stainless steel tandoor with clay-lined chamber',
            'Removable lid with handle'
        ],
        faq: [
            {
                q: 'What fuel can I use with this tandoor?',
                a: 'This model is designed for solid fuel (wood or charcoal). An optional gas burner attachment is available — contact us for details.'
            },
            {
                q: 'Is the clay lining replaceable?',
                a: 'Yes, the clay lining can be replaced. Contact us for guidance on re-lining your tandoor.'
            },
            {
                q: 'Is professional installation required?',
                a: 'No — solid-fuel tandoors are ready to use once placed and seasoned. Season the tandoor with coal for 2–3 cycles before first use.'
            }
        ]
    },
    {
        id: 'ss-tandoor-medium',
        slug: 'stainless-steel-tandoor-medium',
        name: 'Stainless Steel Tandoor — Medium',
        sizeGroup: 'ss-tandoor',
        sizeLabel: 'Medium',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Mid-size commercial tandoor for restaurants and hotels. Deep clay chamber, dual side handles, solid-fuel or gas compatible.',
        description: "The Medium Stainless Steel Tandoor is our most popular model for mid-size restaurants and hotel kitchens.\n\nThe deeper clay-lined chamber accommodates larger bread and skewer batches, making it ideal for busy service periods. Built with SS 304 stainless steel and thick clay lining for heat retention.\n\nAvailable in gas-burner and solid-fuel variants. Contact us for specifications and delivery timelines.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 18500,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel (SS 304)'
            },
            {
                label: 'Lining',
                value: 'Clay (thick-walled)'
            },
            {
                label: 'Fuel Type',
                value: 'Solid Fuel / Gas (optional)'
            },
            {
                label: 'Size',
                value: 'Medium (approx. 22″ diameter)'
            },
            {
                label: 'Suitable For',
                value: 'Restaurants, hotels, caterers'
            }
        ],
        features: [
            'Heavy-gauge SS 304 body',
            'Thick clay lining for heat retention',
            'Removable disc lid',
            'Dual side handles for easy movement',
            'Compatible with solid fuel and gas burner',
            'Stabilising base feet'
        ],
        isDemo: false,
        inStock: true,
        badge: 'Best Seller',
        sku: 'RT-SST-02',
        included: [
            'Stainless steel tandoor with thick clay-lined chamber',
            'Removable disc lid',
            'Dual side handles'
        ],
        faq: [
            {
                q: 'Is this model compatible with a gas burner?',
                a: 'Yes — this model supports both solid fuel and an optional gas burner attachment. Contact us to add a gas burner to your order.'
            },
            {
                q: 'How much can this tandoor cook at once?',
                a: 'The medium chamber fits multiple naan or several skewers simultaneously. Exact capacity depends on the size of items being prepared.'
            },
            {
                q: 'How long does delivery take?',
                a: 'We typically dispatch within 3–5 business days. Delivery time to your location is confirmed at order placement.'
            }
        ]
    },
    {
        id: 'ss-tandoor-large',
        slug: 'stainless-steel-tandoor-large',
        name: 'Stainless Steel Tandoor — Large',
        sizeGroup: 'ss-tandoor',
        sizeLabel: 'Large',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Large-capacity commercial tandoor for high-volume restaurants, banquet halls, and catering operations.',
        description: "The Large Stainless Steel Tandoor is engineered for high-volume commercial cooking — banquet kitchens, large restaurants, and outdoor catering setups.\n\nWide mouth opening allows simultaneous cooking of multiple naan and skewer batches. Reinforced SS 304 body with extra-thick clay lining maintains consistent temperatures during extended cooking sessions.\n\nComes with professional stabilising frame for countertop or floor installation.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 26000,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel (SS 304)'
            },
            {
                label: 'Lining',
                value: 'Extra-thick clay'
            },
            {
                label: 'Fuel Type',
                value: 'Solid Fuel / Gas'
            },
            {
                label: 'Size',
                value: 'Large (approx. 28″ diameter)'
            },
            {
                label: 'Suitable For',
                value: 'Banquet halls, large restaurants'
            }
        ],
        features: [
            'Extra-thick clay lining',
            'Wide-mouth opening for high capacity',
            'Heavy-gauge reinforced SS 304 body',
            'Professional stabilising frame',
            'Dual fuel compatibility',
            'Extended heat retention'
        ],
        isDemo: false,
        inStock: true,
        sku: 'RT-SST-03',
        included: [
            'Large stainless steel tandoor with extra-thick clay lining',
            'Removable lid',
            'Professional stabilising frame'
        ]
    },
    {
        id: 'copper-finish-tandoor',
        slug: 'copper-finish-tandoor',
        name: 'Copper Finish Tandoor',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Premium decorative tandoor with copper finish exterior. Ideal for open-kitchen restaurants and live cooking stations.',
        description: "The Copper Finish Tandoor combines authentic cooking performance with a striking decorative exterior — perfect for open kitchens, live counters, and premium dining setups.\n\nStainless steel construction with a hand-applied copper finish. Clay-lined chamber delivers authentic tandoori flavour. This model is frequently used as a centrepiece in premium restaurant interiors.\n\nAvailable in mini, medium, and large sizes. Contact us for custom finishes and sizing.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 32000,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel with Copper Finish'
            },
            {
                label: 'Lining',
                value: 'Clay'
            },
            {
                label: 'Fuel Type',
                value: 'Solid Fuel / Gas (optional)'
            },
            {
                label: 'Finish',
                value: 'Hand-applied copper'
            },
            {
                label: 'Suitable For',
                value: 'Open kitchens, premium restaurants'
            }
        ],
        features: [
            'Premium copper decorative finish',
            'Stainless steel structural body',
            'Clay-lined cooking chamber',
            'Ideal for live cooking stations',
            'Available in multiple sizes',
            'Custom finishes available on request'
        ],
        isDemo: false,
        inStock: true,
        badge: 'Premium',
        sku: 'RT-CPT-01',
        faq: [
            {
                q: 'Is this tandoor suitable for outdoor use?',
                a: 'Yes — the copper finish is designed to withstand commercial kitchen conditions. Outdoor use is possible in covered areas. Avoid prolonged exposure to direct rain.'
            },
            {
                q: 'Can I customise the finish or size?',
                a: 'Yes, Raj Tandoor offers custom finishes and sizes. Contact us with your requirements.'
            }
        ]
    },
    {
        id: 'gas-tandoor-compact',
        slug: 'gas-tandoor-compact',
        name: 'Gas Tandoor — Compact',
        sizeGroup: 'gas-tandoor',
        sizeLabel: 'Compact',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Compact gas-operated tandoor with built-in LPG burner. Precise temperature control for consistent results in smaller kitchens.',
        description: "The Compact Gas Tandoor features a built-in LPG burner for precise, consistent heat without the need for charcoal management.\n\nDesigned for cloud kitchens, smaller restaurants, and fast-food operations where speed and temperature control are priorities. The gas burner ensures rapid heat-up and consistent results across each batch.\n\nComes with gas regulator fitting (LPG cylinder not included). Professional installation recommended.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 22500,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel (SS 304)'
            },
            {
                label: 'Lining',
                value: 'Clay'
            },
            {
                label: 'Fuel Type',
                value: 'LPG Gas'
            },
            {
                label: 'Burner',
                value: 'Built-in LPG burner'
            },
            {
                label: 'Size',
                value: 'Compact (approx. 18″ diameter)'
            }
        ],
        features: [
            'Built-in LPG gas burner',
            'Precise temperature control',
            'Rapid heat-up time',
            'No charcoal management needed',
            'Stainless steel body with clay lining',
            'Gas regulator fitting included'
        ],
        isDemo: false,
        inStock: true,
        sku: 'RT-GTD-01',
        included: [
            'Compact gas tandoor with clay-lined chamber',
            'Gas regulator fitting',
            '(LPG cylinder not included — source locally)'
        ],
        faq: [
            {
                q: 'Does this come with an LPG cylinder?',
                a: 'No — the LPG cylinder is not included and must be sourced locally. The tandoor includes a gas regulator fitting.'
            },
            {
                q: 'Is professional installation required?',
                a: 'Professional gas fitting is strongly recommended. The gas regulator fitting is included; a certified gas plumber should connect the appliance to your supply.'
            },
            {
                q: 'What is the heat-up time?',
                a: 'Gas tandoors typically reach cooking temperature faster than solid-fuel models. Exact heat-up time depends on gas pressure and ambient conditions.'
            }
        ]
    },
    {
        id: 'gas-tandoor-commercial',
        slug: 'gas-tandoor-commercial',
        name: 'Gas Tandoor — Commercial',
        sizeGroup: 'gas-tandoor',
        sizeLabel: 'Commercial',
        category: 'tandoors',
        categoryLabel: 'Tandoors',
        shortDescription: 'Full-size commercial gas tandoor with high-output LPG burner. Designed for high-volume restaurants and catering operations.',
        description: "The Commercial Gas Tandoor delivers the performance demanded by high-volume catering operations, large restaurants, and hotel kitchens.\n\nEquipped with a high-output LPG burner, this model reaches cooking temperature quickly and maintains consistent heat across long service periods. The large clay-lined chamber accommodates multiple naan and skewers simultaneously.\n\nIncludes gas regulator and fitting kit. LPG cylinder not included. Professional installation strongly recommended.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 38000,
        currency: 'INR',
        specs: [
            {
                label: 'Body Material',
                value: 'Stainless Steel (SS 304)'
            },
            {
                label: 'Lining',
                value: 'Extra-thick clay'
            },
            {
                label: 'Fuel Type',
                value: 'LPG Gas'
            },
            {
                label: 'Burner',
                value: 'High-output LPG burner'
            },
            {
                label: 'Size',
                value: 'Large (approx. 26″ diameter)'
            }
        ],
        features: [
            'High-output commercial LPG burner',
            'Extra-thick clay lining',
            'Large-capacity cooking chamber',
            'Consistent temperature across service',
            'Gas regulator and fitting kit included',
            'Built for extended daily use'
        ],
        isDemo: false,
        inStock: true,
        sku: 'RT-GTD-02',
        included: [
            'Commercial gas tandoor with extra-thick clay lining',
            'Gas regulator',
            'Fitting kit',
            '(LPG cylinder not included — source locally)'
        ]
    },
    // ── KITCHEN EQUIPMENT ─────────────────────────────────────────────────────
    {
        id: 'commercial-roti-maker',
        slug: 'commercial-roti-maker',
        name: 'Commercial Roti Maker',
        category: 'kitchen-equipment',
        categoryLabel: 'Kitchen Equipment',
        shortDescription: 'Electric commercial roti maker for consistent, uniform rotis. Suitable for restaurants, canteens, and catering operations.',
        description: "The Commercial Roti Maker from Raj Tandoor produces uniform, consistent rotis at scale — ideal for restaurants, school canteens, corporate cafeterias, and catering operations.\n\nNon-stick heated plates press and cook rotis simultaneously, reducing preparation time significantly compared to hand-rolling. Adjustable pressure and temperature settings accommodate different dough types.\n\nCapacity and power specifications available on request. Contact us for volume pricing.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 8500,
        currency: 'INR',
        specs: [
            {
                label: 'Operation',
                value: 'Electric'
            },
            {
                label: 'Plates',
                value: 'Non-stick heated plates'
            },
            {
                label: 'Power',
                value: 'Available on request'
            },
            {
                label: 'Suitable For',
                value: 'Restaurants, canteens, catering'
            }
        ],
        features: [
            'Electric non-stick heated plates',
            'Uniform roti thickness',
            'Adjustable pressure and temperature',
            'Reduces preparation time significantly',
            'Easy-clean non-stick surface',
            'Durable commercial-grade construction'
        ],
        isDemo: false,
        inStock: true
    },
    {
        id: 'chapati-press-machine',
        slug: 'chapati-press-machine',
        name: 'Chapati Press Machine',
        category: 'kitchen-equipment',
        categoryLabel: 'Kitchen Equipment',
        shortDescription: 'Heavy-duty stainless-steel chapati press for commercial kitchens. Produces perfectly round, even chapatis quickly.',
        description: "The Chapati Press Machine is a heavy-duty manual press designed for commercial kitchens that require consistent chapati production.\n\nCast iron and stainless steel construction ensures longevity. The lever mechanism delivers even pressure across the dough ball, producing perfectly round chapatis of uniform thickness every time.\n\nNo electricity required — suitable for kitchens with limited electrical capacity.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 4500,
        currency: 'INR',
        specs: [
            {
                label: 'Material',
                value: 'Cast Iron / Stainless Steel'
            },
            {
                label: 'Operation',
                value: 'Manual lever press'
            },
            {
                label: 'Power Required',
                value: 'None'
            },
            {
                label: 'Output',
                value: 'Uniform round chapatis'
            }
        ],
        features: [
            'Heavy-duty cast iron and stainless steel',
            'Manual lever press — no electricity needed',
            'Consistent round shape and thickness',
            'Easy to operate and clean',
            'Durable for daily commercial use',
            'Compact footprint'
        ],
        isDemo: false,
        inStock: true
    },
    {
        id: 'commercial-dough-mixer',
        slug: 'commercial-dough-mixer',
        name: 'Commercial Dough Mixer — 10 kg',
        category: 'kitchen-equipment',
        categoryLabel: 'Kitchen Equipment',
        shortDescription: '10 kg capacity spiral dough mixer for commercial bread, roti, and naan production. Heavy-duty motor, stainless steel bowl.',
        description: "The 10 kg Commercial Dough Mixer is built for high-volume dough preparation in restaurants, bakeries, and catering operations.\n\nA heavy-duty spiral hook mixes dough thoroughly and consistently in large batches, saving time compared to manual kneading. The stainless steel bowl is removable for easy cleaning.\n\nAvailable in 10 kg and 20 kg capacities. Contact us for specifications and delivery.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 15000,
        currency: 'INR',
        specs: [
            {
                label: 'Capacity',
                value: '10 kg dough'
            },
            {
                label: 'Bowl Material',
                value: 'Stainless Steel'
            },
            {
                label: 'Hook Type',
                value: 'Spiral'
            },
            {
                label: 'Operation',
                value: 'Electric'
            },
            {
                label: 'Suitable For',
                value: 'Restaurants, bakeries, caterers'
            }
        ],
        features: [
            '10 kg dough capacity',
            'Heavy-duty spiral mixing hook',
            'Stainless steel removable bowl',
            'Timer and speed controls',
            'Safety bowl guard',
            'Easy-clean design'
        ],
        isDemo: false,
        inStock: true
    },
    // ── ACCESSORIES ───────────────────────────────────────────────────────────
    {
        id: 'tandoor-skewer-set',
        slug: 'tandoor-skewer-set',
        name: 'Tandoor Skewer Set (6 pieces)',
        category: 'accessories',
        categoryLabel: 'Accessories',
        shortDescription: 'Set of 6 flat stainless-steel tandoor skewers. Suitable for kebabs, tikka, and seekh. Commercial grade.',
        description: "This set of 6 flat stainless-steel tandoor skewers is designed for daily commercial use in tandoor cooking.\n\nFlat blade design holds marinated meats and vegetables securely during cooking. Long handles keep hands clear of heat. Dishwasher safe and rust-resistant.\n\nCompatible with all Raj Tandoor models.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 1200,
        currency: 'INR',
        specs: [
            {
                label: 'Material',
                value: 'Stainless Steel'
            },
            {
                label: 'Quantity',
                value: '6 pieces'
            },
            {
                label: 'Type',
                value: 'Flat blade'
            },
            {
                label: 'Compatibility',
                value: 'All Raj Tandoor models'
            }
        ],
        features: [
            'Set of 6 flat stainless steel skewers',
            'Long handles for safe handling',
            'Rust-resistant and dishwasher safe',
            'Flat blade holds food securely',
            'Compatible with all tandoor sizes'
        ],
        isDemo: false,
        inStock: true
    },
    {
        id: 'tandoor-cleaning-kit',
        slug: 'tandoor-cleaning-kit',
        name: 'Tandoor Cleaning Kit',
        category: 'accessories',
        categoryLabel: 'Accessories',
        shortDescription: 'Complete cleaning kit for stainless-steel tandoors. Includes ash tray, wire brush, and cleaning cloth.',
        description: "Keep your tandoor in top condition with the Raj Tandoor Cleaning Kit — everything you need for regular maintenance and deep cleaning.\n\nIncludes: 1× ash tray insert, 1× long-handled wire brush for the clay chamber, 1× stainless steel exterior polish cloth.\n\nRegular cleaning extends the life of both the steel body and the clay lining. Recommended after every service.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 850,
        currency: 'INR',
        specs: [
            {
                label: 'Contents',
                value: 'Ash tray, wire brush, polish cloth'
            },
            {
                label: 'Compatible With',
                value: 'All Raj Tandoor models'
            }
        ],
        features: [
            'Ash tray insert for easy ash removal',
            'Long-handled wire brush for clay chamber',
            'Stainless steel exterior polish cloth',
            'Extends life of clay lining',
            'Compatible with all tandoor sizes'
        ],
        isDemo: false,
        inStock: true
    },
    {
        id: 'naan-bread-tray-set',
        slug: 'naan-bread-tray-set',
        name: 'Naan Bread Tray Set (4 pieces)',
        category: 'accessories',
        categoryLabel: 'Accessories',
        shortDescription: 'Set of 4 stainless steel naan trays for presenting and serving bread from the tandoor. Restaurant grade.',
        description: "The Naan Bread Tray Set contains 4 restaurant-grade stainless steel trays designed for serving naan and other flatbreads fresh from the tandoor.\n\nThe raised edge retains heat and prevents bread from sliding during service. Stackable design makes storage simple. Suitable for use in restaurants, hotels, and catering buffets.",
        image: '/images/raj-tandoor-product.webp',
        images: [
            '/images/raj-tandoor-product.webp'
        ],
        price: 1800,
        currency: 'INR',
        specs: [
            {
                label: 'Material',
                value: 'Stainless Steel'
            },
            {
                label: 'Quantity',
                value: '4 trays'
            },
            {
                label: 'Design',
                value: 'Raised edge, stackable'
            },
            {
                label: 'Suitable For',
                value: 'Restaurants, hotels, buffets'
            }
        ],
        features: [
            'Set of 4 stainless steel trays',
            'Raised edge retains heat',
            'Stackable for easy storage',
            'Dishwasher safe',
            'Restaurant-grade stainless steel'
        ],
        isDemo: false,
        inStock: true
    }
];
const categories = [
    {
        slug: 'tandoors',
        label: 'Tandoors',
        description: 'Stainless-steel tandoors designed for restaurants, hotels, and commercial kitchens.',
        href: '/tandoors',
        image: '/images/raj-tandoor-product.webp',
        isDemo: false
    },
    {
        slug: 'kitchen-equipment',
        label: 'Kitchen Equipment',
        description: 'Professional kitchen equipment for commercial cooking environments.',
        href: '/kitchen-equipment',
        image: '/images/raj-tandoor-product.webp',
        isDemo: true,
        demoNote: 'Product details coming soon — contact us to enquire.'
    },
    {
        slug: 'accessories',
        label: 'Accessories',
        description: 'Accessories and consumables for tandoor operation and maintenance.',
        href: '/shop?category=accessories',
        image: '/images/raj-tandoor-product.webp',
        isDemo: true,
        demoNote: 'Product details coming soon — contact us to enquire.'
    }
];
function getProductBySlug(slug) {
    return products.find((p)=>p.slug === slug);
}
function getProductsByCategory(category) {
    return products.filter((p)=>p.category === category);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/SearchContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchProvider",
    ()=>SearchProvider,
    "useSearch",
    ()=>useSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/products.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const SearchContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function search(q) {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["products"].filter((p)=>{
        return p.name.toLowerCase().includes(term) || p.categoryLabel.toLowerCase().includes(term) || p.shortDescription.toLowerCase().includes(term) || p.features.some((f)=>f.toLowerCase().includes(term)) || p.specs.some((s)=>s.label.toLowerCase().includes(term) || s.value.toLowerCase().includes(term));
    });
}
function SearchProvider(param) {
    let { children } = param;
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SearchProvider.useMemo[results]": ()=>search(query)
    }["SearchProvider.useMemo[results]"], [
        query
    ]);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchProvider.useCallback[open]": ()=>setIsOpen(true)
    }["SearchProvider.useCallback[open]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchProvider.useCallback[close]": ()=>{
            setIsOpen(false);
            setQuery('');
        }
    }["SearchProvider.useCallback[close]"], []);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchProvider.useCallback[toggle]": ()=>setIsOpen({
                "SearchProvider.useCallback[toggle]": (v)=>!v
            }["SearchProvider.useCallback[toggle]"])
    }["SearchProvider.useCallback[toggle]"], []);
    // Close on Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchProvider.useEffect": ()=>{
            if (!isOpen) return;
            const handler = {
                "SearchProvider.useEffect.handler": (e)=>{
                    if (e.key === 'Escape') close();
                }
            }["SearchProvider.useEffect.handler"];
            window.addEventListener('keydown', handler);
            return ({
                "SearchProvider.useEffect": ()=>window.removeEventListener('keydown', handler)
            })["SearchProvider.useEffect"];
        }
    }["SearchProvider.useEffect"], [
        isOpen,
        close
    ]);
    // Lock body scroll when open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchProvider.useEffect": ()=>{
            document.body.style.overflow = isOpen ? 'hidden' : '';
            return ({
                "SearchProvider.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["SearchProvider.useEffect"];
        }
    }["SearchProvider.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchContext.Provider, {
        value: {
            isOpen,
            query,
            results,
            open,
            close,
            toggle,
            setQuery
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/store/SearchContext.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(SearchProvider, "wzd7w703787d/PrNdZbLcQpS/Wg=");
_c = SearchProvider;
function useSearch() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SearchContext);
    if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
    return ctx;
}
_s1(useSearch, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "SearchProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$WishlistContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/WishlistContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/SearchContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function Providers(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$WishlistContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WishlistProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchProvider"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/Providers.tsx",
                    lineNumber: 12,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Providers.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AnnouncementBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnnouncementBar",
    ()=>AnnouncementBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const MESSAGES = [
    {
        icon: '🔥',
        text: 'Free pan-India delivery on orders above ₹15,000',
        cta: {
            label: 'Shop Now',
            href: '/shop'
        }
    },
    {
        icon: '⚡',
        text: 'Commercial kitchen setup? Get priority support & bulk pricing.',
        cta: {
            label: 'Request a Quote',
            href: '/contact?type=quote'
        }
    },
    {
        icon: '🏆',
        text: 'Trusted by 500+ restaurants across India',
        cta: {
            label: 'Explore Range',
            href: '/shop'
        }
    },
    {
        icon: '✨',
        text: 'ISI certified tandoors — built for demanding commercial kitchens',
        cta: {
            label: 'View Products',
            href: '/shop'
        }
    }
];
function AnnouncementBar() {
    _s();
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AnnouncementBar.useState": ()=>{
            try {
                return sessionStorage.getItem('ann-dismissed') === '1';
            } catch (e) {
                return false;
            }
        }
    }["AnnouncementBar.useState"]);
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnnouncementBar.useEffect": ()=>{
            const root = document.documentElement;
            if (!dismissed) root.classList.add('has-ann');
            else root.classList.remove('has-ann');
            return ({
                "AnnouncementBar.useEffect": ()=>root.classList.remove('has-ann')
            })["AnnouncementBar.useEffect"];
        }
    }["AnnouncementBar.useEffect"], [
        dismissed
    ]);
    // Cycle through messages every 4 s with a fade transition
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnnouncementBar.useEffect": ()=>{
            if (dismissed) return;
            const id = setInterval({
                "AnnouncementBar.useEffect.id": ()=>{
                    setVisible(false);
                    setTimeout({
                        "AnnouncementBar.useEffect.id": ()=>{
                            setIndex({
                                "AnnouncementBar.useEffect.id": (i)=>(i + 1) % MESSAGES.length
                            }["AnnouncementBar.useEffect.id"]);
                            setVisible(true);
                        }
                    }["AnnouncementBar.useEffect.id"], 350);
                }
            }["AnnouncementBar.useEffect.id"], 4000);
            return ({
                "AnnouncementBar.useEffect": ()=>clearInterval(id)
            })["AnnouncementBar.useEffect"];
        }
    }["AnnouncementBar.useEffect"], [
        dismissed
    ]);
    if (dismissed) return null;
    const msg = MESSAGES[index];
    function dismiss() {
        try {
            sessionStorage.setItem('ann-dismissed', '1');
        } catch (e) {}
        setDismissed(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ann-bar",
        role: "region",
        "aria-label": "Site announcement",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ann-bar__shimmer",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ann-bar__content".concat(visible ? ' ann-bar__content--visible' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ann-bar__icon",
                        "aria-hidden": "true",
                        children: msg.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "ann-bar__text",
                        children: msg.text
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: msg.cta.href,
                        className: "ann-bar__cta",
                        children: [
                            msg.cta.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M5 12h14M12 5l7 7-7 7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ann-bar__dots",
                "aria-hidden": "true",
                children: MESSAGES.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ann-bar__dot".concat(i === index ? ' ann-bar__dot--active' : '')
                    }, i, false, {
                        fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "ann-bar__close",
                "aria-label": "Dismiss announcement",
                onClick: dismiss,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                            lineNumber: 94,
                            columnNumber: 48
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/AnnouncementBar.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(AnnouncementBar, "/XoGso//u7aUtRU99CkyUTeDBes=");
_c = AnnouncementBar;
var _c;
__turbopack_context__.k.register(_c, "AnnouncementBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/NavLink.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavLink",
    ()=>NavLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NavLink(param) {
    let { to, className, end = false, children, ...rest } = param;
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/');
    const resolvedClass = typeof className === 'function' ? className({
        isActive
    }) : className;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: to,
        className: resolvedClass,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/NavLink.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(NavLink, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavLink;
var _c;
__turbopack_context__.k.register(_c, "NavLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Site-wide configuration for Raj Tandoor & Kitchen Equipment.
 * All empty strings are intentional placeholders — fill them in before going live.
 * Never add invented values (phone, email, address, GSTIN, social handles, etc.)
 */ __turbopack_context__.s([
    "brand",
    ()=>brand,
    "contact",
    ()=>contact,
    "footerColumns",
    ()=>footerColumns,
    "nav",
    ()=>nav,
    "seo",
    ()=>seo,
    "social",
    ()=>social
]);
const brand = {
    name: 'Raj Tandoor',
    fullName: 'Raj Tandoor & Kitchen Equipment',
    tagline: 'Professional Tandoors Built for Commercial Kitchens',
    logoLine1: 'RAJ TANDOOR',
    logoLine2: '& KITCHEN EQUIPMENT',
    monogram: 'RT',
    /**
   * Path to a high-res transparent logo (PNG/WebP, ≥ 400 px wide).
   * Set this once you have the official standalone logo artwork.
   * Example: '/images/logo.png'
   * Currently only the product photo is available; the SVG emblem is used instead.
   */ logoImageUrl: '/images/raj-tandoor-logo.webp'
};
const contact = {
    /** Business email – used in the contact form and footer. */ email: 'rajtandoorequipment@gmail.com',
    /** Phone number with country code. Example: '+91 98765 43210' */ phone: '+91 9687861313',
    /** WhatsApp number with country code (may differ from phone). */ whatsapp: '+91 9687860303',
    /** Full postal address. */ address: '07, Lucky Estate, Opp. Sagar Auto Hub, Nr. Gujarat Weightbridge, Gulab Nagar, Piplaj, Pirana Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    /** Visible business hours. Example: 'Mon–Sat 9 am – 6 pm IST' */ businessHours: '',
    /** GST Identification Number. */ gstin: '',
    /** Google Maps embed URL or '' to hide the map. */ mapEmbedUrl: 'https://maps.google.com/maps?q=Raj+Tandoor+%26+Kitchen+Equipment&output=embed&z=15',
    /** Direct link to the Maps listing (share link, place URL, etc.) */ mapShareUrl: 'https://share.google/h6MyxC9CQ92BomKRL'
};
const social = {
    /** Full URL, e.g. 'https://www.instagram.com/rajtandoor/'. Leave '' to hide. */ instagram: '',
    facebook: '',
    linkedin: '',
    youtube: ''
};
const seo = {
    /** Replace with your live domain before deployment. */ siteUrl: 'https://rajtandoor.com',
    title: 'Commercial Tandoors & Kitchen Equipment | Raj Tandoor',
    description: 'Explore tandoors and professional kitchen equipment from Raj Tandoor. Discover products, review available specifications, and enquire about your kitchen requirements.',
    ogImage: '/images/raj-tandoor-product.webp'
};
const nav = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'B2B',
        href: '/b2b'
    },
    {
        label: 'About Us',
        href: '/about'
    },
    {
        label: 'Contact Us',
        href: '/contact'
    }
];
const footerColumns = [
    {
        heading: 'Cooking Equipment',
        links: [
            {
                label: 'Tandoor Equipment',
                href: '/shop?category=tandoor-equipment'
            },
            {
                label: 'Burners & Gas Stoves',
                href: '/shop?category=burners-gas-stoves'
            },
            {
                label: 'Commercial Cooking Ranges',
                href: '/shop?category=commercial-cooking-ranges'
            },
            {
                label: 'Fryers & Griddles',
                href: '/shop?category=fryers-griddles'
            },
            {
                label: 'Stainless Steel Fabrication',
                href: '/shop?category=stainless-steel-fabrication'
            },
            {
                label: 'Food Preparation Machines',
                href: '/shop?category=food-preparation-machines'
            },
            {
                label: 'Food Warming & Display',
                href: '/shop?category=food-warming-display'
            }
        ]
    },
    {
        heading: 'Kitchen Solutions',
        links: [
            {
                label: 'Refrigeration Equipment',
                href: '/shop?category=refrigeration-equipment'
            },
            {
                label: 'Exhaust & Ventilation',
                href: '/shop?category=exhaust-ventilation'
            },
            {
                label: 'Kitchen Accessories & Spare Parts',
                href: '/shop?category=kitchen-accessories-spare-parts'
            },
            {
                label: 'Bakery & Pizza Equipment',
                href: '/shop?category=bakery-pizza-equipment'
            },
            {
                label: 'Dishwashing & Cleaning',
                href: '/shop?category=dishwashing-cleaning'
            },
            {
                label: 'Storage & Material Handling',
                href: '/shop?category=storage-material-handling'
            },
            {
                label: 'Beverage Equipment',
                href: '/shop?category=beverage-equipment'
            }
        ]
    },
    {
        heading: 'Support',
        links: [
            {
                label: 'Contact Us',
                href: '/contact'
            },
            {
                label: 'Frequently Asked Questions',
                href: '/#faq'
            },
            {
                label: 'Request a Quote',
                href: '/contact?type=quote'
            }
        ]
    },
    {
        heading: 'Company',
        links: [
            {
                label: 'About Us',
                href: '/about'
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "FOOTER_CATS_LEFT",
    ()=>FOOTER_CATS_LEFT,
    "FOOTER_CATS_RIGHT",
    ()=>FOOTER_CATS_RIGHT
]);
function toSlug(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().replace(/\s+/g, '-');
}
function items(names) {
    return names.map((name)=>({
            slug: toSlug(name),
            name
        }));
}
const CATEGORIES = [
    {
        slug: 'tandoor-equipment',
        name: 'Tandoor Equipment',
        products: items([
            'Clay Tandoor',
            'Drum Tandoor',
            'Stainless Steel Tandoor',
            'Gas Tandoor',
            'Electric Tandoor',
            'Charcoal Tandoor',
            'Commercial Tandoor',
            'Portable Tandoor',
            'Round Tandoor',
            'Square Tandoor',
            'Custom-Built Tandoor'
        ])
    },
    {
        slug: 'burners-gas-stoves',
        name: 'Burners & Gas Stoves',
        products: items([
            'Single Burner Gas Stove',
            'Double Burner Gas Stove',
            'Three Burner Gas Stove',
            'Four Burner Gas Stove',
            'Heavy-Duty Gas Range',
            'High-Pressure Burner',
            'Chinese Wok Burner',
            'Stock Pot Burner',
            'Tabletop Gas Stove',
            'LPG-Compatible Burner',
            'Natural-Gas-Compatible Burner'
        ])
    },
    {
        slug: 'commercial-cooking-ranges',
        name: 'Commercial Cooking Ranges',
        products: items([
            'Indian Cooking Range',
            'Chinese Cooking Range',
            'Multi-Burner Cooking Range',
            'Stock Pot Range',
            'Commercial Hot Plate',
            'Commercial Griddle Range',
            'Heavy-Duty Cooking Range',
            'Gas Cooking Range',
            'Electric Cooking Range'
        ])
    },
    {
        slug: 'fryers-griddles',
        name: 'Fryers & Griddles',
        products: items([
            'Gas Deep Fryer',
            'Electric Deep Fryer',
            'Single-Tank Fryer',
            'Double-Tank Fryer',
            'Flat-Top Griddle',
            'Commercial Hot Plate',
            'Charbroiler',
            'Commercial Grill',
            'Sandwich Griller',
            'Barbecue Grill'
        ])
    },
    {
        slug: 'stainless-steel-fabrication',
        name: 'Stainless Steel Fabrication',
        products: items([
            'Stainless Steel Work Table',
            'Food Preparation Table',
            'Wall Shelf',
            'Storage Rack',
            'Storage Cabinet',
            'Single-Bowl Sink',
            'Double-Bowl Sink',
            'Dish Landing Table',
            'Drain Table',
            'Exhaust Hood',
            'Utility Trolley',
            'Custom Stainless Steel Fabrication'
        ])
    },
    {
        slug: 'food-preparation-machines',
        name: 'Food Preparation Machines',
        products: items([
            'Vegetable Cutting Machine',
            'Potato Peeler',
            'Dough Kneader',
            'Planetary Mixer',
            'Wet Grinder',
            'Food Processor',
            'Meat Mincer',
            'Commercial Slicer',
            'Juicer',
            'Commercial Mixer Grinder'
        ])
    },
    {
        slug: 'food-warming-display',
        name: 'Food Warming & Display',
        products: items([
            'Bain-Marie',
            'Food Warmer',
            'Hot Display Case',
            'Buffet Counter',
            'Soup Kettle',
            'Chapati Warmer',
            'Serving Counter',
            'Heated Display Cabinet'
        ])
    },
    {
        slug: 'refrigeration-equipment',
        name: 'Refrigeration Equipment',
        products: items([
            'Commercial Refrigerator',
            'Deep Freezer',
            'Undercounter Refrigerator',
            'Display Chiller',
            'Beverage Cooler',
            'Cold Room',
            'Refrigerated Prep Counter',
            'Upright Freezer',
            'Ice Maker'
        ])
    },
    {
        slug: 'exhaust-ventilation',
        name: 'Exhaust & Ventilation',
        products: items([
            'Commercial Exhaust Hood',
            'Kitchen Chimney',
            'Exhaust Ducting',
            'Fresh-Air System',
            'Grease Filter',
            'Ventilation Fan',
            'Make-Up Air Unit',
            'Ventilation Accessories'
        ])
    },
    {
        slug: 'kitchen-accessories-spare-parts',
        name: 'Kitchen Accessories & Spare Parts',
        products: items([
            'Tandoor Seekh / Skewer',
            'Tandoor Cooking Tools',
            'Commercial Cooking Pot',
            'Commercial Frying Pan',
            'Kitchen Utensil Set',
            'Burner Replacement Part',
            'Gas Connector / Hose',
            'Approved Gas Regulator',
            'Tandoor Spare Parts',
            'Replacement Filter',
            'Other Compatible Spare Parts'
        ])
    },
    {
        slug: 'bakery-pizza-equipment',
        name: 'Bakery & Pizza Equipment',
        products: items([
            'Commercial Pizza Oven',
            'Deck Oven',
            'Convection Oven',
            'Dough Mixer',
            'Dough Sheeter',
            'Proofing Cabinet',
            'Bakery Work Table',
            'Baking Tray'
        ])
    },
    {
        slug: 'dishwashing-cleaning',
        name: 'Dishwashing & Cleaning',
        products: items([
            'Commercial Dishwasher',
            'Glass Washer',
            'Pre-Rinse Spray Unit',
            'Pot Washing Sink',
            'Dish Rack',
            'Hand Wash Sink',
            'Cleaning Trolley'
        ])
    },
    {
        slug: 'storage-material-handling',
        name: 'Storage & Material Handling',
        products: items([
            'Wall-Mounted Storage Shelf',
            'Four-Tier Storage Rack',
            'Ingredient Bin',
            'Heavy-Duty Storage Rack',
            'Platform Trolley',
            'Service Trolley',
            'LPG Cylinder Cage Storage'
        ])
    },
    {
        slug: 'beverage-equipment',
        name: 'Beverage Equipment',
        products: items([
            'Commercial Tea Coffee Urn',
            'Hot Water Dispenser',
            'Commercial Coffee Machine',
            'Juice Dispenser',
            'Milkshake Mixer',
            'Beverage Blender'
        ])
    }
];
const FOOTER_CATS_LEFT = CATEGORIES.slice(0, 7);
const FOOTER_CATS_RIGHT = CATEGORIES.slice(7);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * All page copy, links and CTA destinations live here.
 * Change text or URLs in this file — components read from it and contain no hard-coded copy.
 *
 * Only facts visible in the product reference are stated. Do not add specifications,
 * ratings, certifications or warranty claims here unless they are verified.
 */ __turbopack_context__.s([
    "brand",
    ()=>brand,
    "chapters",
    ()=>chapters,
    "contact",
    ()=>contact,
    "heroGlassCards",
    ()=>heroGlassCards,
    "links",
    ()=>links,
    "nav",
    ()=>nav,
    "productFeatures",
    ()=>productFeatures,
    "productImage",
    ()=>productImage
]);
const links = {
    /** Destination of every "Explore Tandoors" button. */ exploreTandoors: '/tandoors',
    /** Destination of every "Request a Quote" / "Enquire" button. */ requestQuote: '/contact'
};
const contact = {
    /**
   * Email address the enquiry form sends to (opens the visitor's mail app).
   * Leave empty until the real address is known — the form then shows a friendly notice instead.
   */ email: '',
    /** Optional phone number, e.g. '+91 00000 00000'. Shown only when set. */ phone: ''
};
const brand = {
    name: 'Raj Tandoor',
    fullName: 'Raj Tandoor & Kitchen Equipment',
    logoLine1: 'RAJ TANDOOR',
    logoLine2: 'AND KITCHEN EQUIPMENT',
    monogram: 'RT',
    /**
   * Optional: path to the official emblem artwork (square PNG/WebP with transparent background,
   * ideally 1024×1024) placed in /public. When set, it is used on the 3D model instead of the
   * redrawn emblem. Example: '/images/raj-tandoor-emblem.png'
   */ emblemTextureUrl: ''
};
const productImage = {
    src: '/images/raj-tandoor-product.webp',
    width: 941,
    height: 1672,
    alt: 'Raj Tandoor stainless-steel commercial tandoor with cream clay rim, removable lid with raised handle, side carrying handles and front firebox opening'
};
const nav = [
    {
        label: 'Home',
        href: '#top'
    },
    {
        label: 'Tandoors',
        href: '#tandoors'
    },
    {
        label: 'Kitchen Equipment',
        href: '#kitchen-equipment'
    },
    {
        label: 'About Us',
        href: '#about'
    },
    {
        label: 'Contact',
        href: '#contact'
    }
];
const chapters = [
    {
        id: 'reveal',
        navLabel: 'Reveal',
        eyebrow: 'Raj Tandoor & Kitchen Equipment',
        heading: 'Built for the\nHeat of Service.',
        body: 'Commercial tandoors and professional kitchen equipment, crafted for restaurants, caterers and hospitality kitchens that demand authentic performance.',
        mobileBody: 'Commercial tandoors crafted for restaurants, caterers and hospitality kitchens.',
        ctas: [
            {
                label: 'View Tandoors',
                href: links.exploreTandoors,
                variant: 'primary'
            },
            {
                label: 'Get a Quote',
                href: links.requestQuote,
                variant: 'ghost'
            }
        ]
    },
    {
        id: 'craft',
        navLabel: 'Craftsmanship',
        eyebrow: 'Crafted for professional kitchens',
        heading: 'Stainless steel,\nprecision in every weld.',
        body: 'A fully welded stainless-steel body built for the demands of professional kitchen service, with an authentic refractory-clay cooking chamber.',
        mobileBody: 'Fully welded stainless steel with an authentic refractory-clay cooking chamber.',
        features: [
            {
                id: 'steel',
                index: '01',
                label: 'Stainless-Steel Construction'
            },
            {
                id: 'clay',
                index: '02',
                label: 'Refractory-Clay Cooking Chamber'
            },
            {
                id: 'design',
                index: '03',
                label: 'Practical Commercial Design'
            }
        ]
    },
    {
        id: 'chamber',
        navLabel: 'Cooking chamber',
        eyebrow: 'Inside the tandoor',
        heading: 'Authentic clay.\nEngineered to last.',
        body: 'The traditional refractory-clay cooking chamber retains heat with precision, delivering authentic tandoor cooking at commercial scale, service after service.',
        mobileBody: 'Refractory-clay chamber for authentic tandoor cooking at commercial scale.',
        tag: 'Explore the cooking chamber'
    },
    {
        id: 'details',
        navLabel: 'Details',
        eyebrow: 'Built from the details',
        heading: 'Every detail\nhas a purpose.',
        body: 'From the front firebox opening to the stable supporting base — each design decision serves the demands of a working professional kitchen.',
        mobileBody: 'Every design detail built for a working professional kitchen.',
        features: [
            {
                id: 'firebox',
                label: 'Front Firebox Access'
            },
            {
                id: 'body',
                label: 'Stainless-Steel Body'
            },
            {
                id: 'handles',
                label: 'Side Carrying Handles'
            },
            {
                id: 'base',
                label: 'Stable Supporting Base'
            }
        ]
    },
    {
        id: 'complete',
        navLabel: 'Enquire',
        eyebrow: 'Raj Tandoor & Kitchen Equipment',
        heading: 'The right tandoor\nfor your kitchen.',
        body: 'From single-kitchen restaurants to large catering operations — explore our tandoor collection and find the right equipment for the way you work.',
        mobileBody: 'Find the right tandoor for your restaurant, catering or hospitality operation.',
        ctas: [
            {
                label: 'View Our Tandoors',
                href: links.exploreTandoors,
                variant: 'primary'
            },
            {
                label: 'Get a Quote',
                href: links.requestQuote,
                variant: 'ghost'
            }
        ]
    }
];
const productFeatures = [
    'Brushed stainless-steel cylindrical body',
    'Cream refractory-clay rim and dark cooking chamber',
    'Removable stainless-steel lid with raised handle',
    'Side carrying handles',
    'Front firebox opening',
    'Supporting feet'
];
const heroGlassCards = [
    {
        index: '01',
        title: 'Stainless-steel body',
        note: 'Brushed cylindrical finish',
        pos: 'top-left',
        tilt: -3
    },
    {
        index: '02',
        title: 'Clay-lined chamber',
        note: 'Cream refractory-clay rim',
        pos: 'mid-right',
        tilt: 2.5
    },
    {
        index: '03',
        title: 'Front firebox',
        note: 'Opening at the base',
        pos: 'bottom-left',
        tilt: -1.5
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BrandMark.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandEmblem",
    ()=>BrandEmblem,
    "BrandLockup",
    ()=>BrandLockup,
    "BrandMark",
    ()=>BrandMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/content.ts [app-client] (ecmascript)");
'use client';
;
;
const LOGO_SRC = '/images/raj-tandoor-logo.webp';
function BrandMark(param) {
    let { size = 'sm' } = param;
    const height = size === 'lg' ? 64 : size === 'md' ? 44 : 36;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "bm",
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: LOGO_SRC,
            alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].fullName,
            height: height,
            style: {
                height,
                width: 'auto',
                maxWidth: size === 'lg' ? 320 : size === 'md' ? 220 : 170,
                objectFit: 'contain',
                display: 'block',
                borderRadius: 4
            },
            onError: (e)=>{
                e.currentTarget.style.display = 'none';
            }
        }, void 0, false, {
            fileName: "[project]/src/components/BrandMark.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/BrandMark.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = BrandMark;
function BrandEmblem(param) {
    let { size = 40 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: LOGO_SRC,
        alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].name,
        width: size * 4,
        height: size,
        style: {
            width: 'auto',
            height: size,
            objectFit: 'contain'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/BrandMark.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c1 = BrandEmblem;
function BrandLockup() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandMark, {}, void 0, false, {
        fileName: "[project]/src/components/BrandMark.tsx",
        lineNumber: 55,
        columnNumber: 10
    }, this);
}
_c2 = BrandLockup;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BrandMark");
__turbopack_context__.k.register(_c1, "BrandEmblem");
__turbopack_context__.k.register(_c2, "BrandLockup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart/CartDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartDrawer",
    ()=>CartDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/CartContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CartDrawer(param) {
    let { isOpen, onClose } = param;
    _s();
    const { items, removeItem, updateQuantity, itemCount, subtotal, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartDrawer.useEffect": ()=>{
            if (!isOpen) return;
            const handler = {
                "CartDrawer.useEffect.handler": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["CartDrawer.useEffect.handler"];
            window.addEventListener('keydown', handler);
            return ({
                "CartDrawer.useEffect": ()=>window.removeEventListener('keydown', handler)
            })["CartDrawer.useEffect"];
        }
    }["CartDrawer.useEffect"], [
        isOpen,
        onClose
    ]);
    // Lock body scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartDrawer.useEffect": ()=>{
            document.body.style.overflow = isOpen ? 'hidden' : '';
            return ({
                "CartDrawer.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["CartDrawer.useEffect"];
        }
    }["CartDrawer.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cart-backdrop ".concat(isOpen ? 'cart-backdrop--open' : ''),
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: drawerRef,
                className: "cart-drawer ".concat(isOpen ? 'cart-drawer--open' : ''),
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Shopping cart",
                "aria-hidden": !isOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cart-drawer__header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "cart-drawer__title",
                                children: [
                                    "Cart",
                                    itemCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "cart-drawer__count",
                                        children: [
                                            " (",
                                            itemCount,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 55,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "cart-drawer__close",
                                "aria-label": "Close cart",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 59,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cart-drawer__body",
                        children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cart-drawer__empty",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Your cart is empty."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/shop",
                                    className: "btn btn--outline btn--sm",
                                    onClick: onClose,
                                    children: "Browse products"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "cart-drawer__items",
                            role: "list",
                            children: items.map((param)=>{
                                let { product, quantity } = param;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "cart-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: product.image,
                                            alt: product.name,
                                            className: "cart-item__img",
                                            width: 64,
                                            height: 64,
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 77,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cart-item__details",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/products/".concat(product.slug),
                                                    className: "cart-item__name",
                                                    onClick: onClose,
                                                    children: product.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cart-item__cat",
                                                    children: product.categoryLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "cart-item__price",
                                                    children: product.price ? "₹".concat((product.price * quantity).toLocaleString('en-IN')) : 'Price on enquiry'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cart-item__actions",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "cart-item__qty",
                                                    role: "group",
                                                    "aria-label": "Quantity for ".concat(product.name),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-label": "Decrease quantity",
                                                            onClick: ()=>updateQuantity(product.id, quantity - 1),
                                                            children: "−"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-live": "polite",
                                                            children: quantity
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-label": "Increase quantity",
                                                            onClick: ()=>updateQuantity(product.id, quantity + 1),
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "cart-item__remove",
                                                    "aria-label": "Remove ".concat(product.name),
                                                    onClick: ()=>removeItem(product.id),
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, product.id, true, {
                                    fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                    lineNumber: 76,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/CartDrawer.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cart-drawer__footer",
                        children: [
                            subtotal !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cart-drawer__subtotal",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "₹",
                                            subtotal.toLocaleString('en-IN')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/checkout",
                                className: "btn btn--gold btn--block",
                                onClick: onClose,
                                children: "Checkout"
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "btn btn--outline btn--sm btn--block cart-drawer__view-cart",
                                onClick: onClose,
                                children: "View Cart"
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "cart-drawer__clear",
                                onClick: clearCart,
                                children: "Clear cart"
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/cart/CartDrawer.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/cart/CartDrawer.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CartDrawer, "J6p6Kb382XwOHoM7V210pUo+gIU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CartDrawer;
var _c;
__turbopack_context__.k.register(_c, "CartDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/LoginModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginModal",
    ()=>LoginModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LoginModal(param) {
    let { forceOpen, onClose } = param;
    _s();
    const { login, register, isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('login');
    // Form fields
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const emailId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const pwId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const nameId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const dialogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // External trigger (clicking Login in header)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginModal.useEffect": ()=>{
            if (forceOpen) {
                setOpen(true);
                setMode('login');
            }
        }
    }["LoginModal.useEffect"], [
        forceOpen
    ]);
    // Focus trap + Escape key + body scroll lock
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginModal.useEffect": ()=>{
            var _dialogRef_current;
            if (!open) return;
            const handler = {
                "LoginModal.useEffect.handler": (e)=>{
                    if (e.key === 'Escape') handleClose();
                }
            }["LoginModal.useEffect.handler"];
            window.addEventListener('keydown', handler);
            document.body.style.overflow = 'hidden';
            (_dialogRef_current = dialogRef.current) === null || _dialogRef_current === void 0 ? void 0 : _dialogRef_current.focus();
            return ({
                "LoginModal.useEffect": ()=>{
                    window.removeEventListener('keydown', handler);
                    document.body.style.overflow = '';
                }
            })["LoginModal.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["LoginModal.useEffect"], [
        open
    ]);
    function handleClose() {
        setOpen(false);
        setError('');
        setSuccess('');
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }
    function resetFields() {
        setError('');
        setSuccess('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
    }
    function switchMode(m) {
        resetFields();
        setMode(m);
    }
    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setSubmitting(true);
        try {
            await login(email.trim(), password);
            handleClose();
        } catch (err) {
            setError(err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? err.message : 'Login failed. Please try again.');
        } finally{
            setSubmitting(false);
        }
    }
    async function handleRegister(e) {
        e.preventDefault();
        setError('');
        if (!name.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setSubmitting(true);
        try {
            await register(name.trim(), email.trim(), password, phone.trim() || undefined);
            handleClose();
        } catch (err) {
            setError(err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? err.message : 'Registration failed. Please try again.');
        } finally{
            setSubmitting(false);
        }
    }
    async function handleForgot(e) {
        e.preventDefault();
        setError('');
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase()
                })
            });
            const json = await res.json();
            setSuccess(json.message || 'If that address is registered, a reset link has been sent.');
        } catch (e) {
            setSuccess('If that address is registered, a reset link has been sent.');
        } finally{
            setSubmitting(false);
        }
    }
    if (!open || isLoggedIn) return null;
    const EyeIcon = (param)=>{
        let { open: o } = param;
        return o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 126,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1",
                    y1: "1",
                    x2: "23",
                    y2: "23"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginModal.tsx",
            lineNumber: 125,
            columnNumber: 5
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 131,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "12",
                    r: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginModal.tsx",
            lineNumber: 130,
            columnNumber: 5
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lm-backdrop",
        role: "presentation",
        onClick: (e)=>{
            if (e.target === e.currentTarget) handleClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
            ref: dialogRef,
            className: "lm",
            open: true,
            "aria-modal": "true",
            "aria-labelledby": "lm-title",
            tabIndex: -1,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "lm__close",
                    "aria-label": "Close",
                    onClick: handleClose,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "18",
                                y1: "6",
                                x2: "6",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "6",
                                y1: "6",
                                x2: "18",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                lineNumber: 143,
                                columnNumber: 51
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/LoginModal.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lm__body",
                    children: [
                        mode !== 'forgot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lm__tabs",
                            role: "tablist",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    "aria-selected": mode === 'login',
                                    className: "lm__tab".concat(mode === 'login' ? ' lm__tab--active' : ''),
                                    onClick: ()=>switchMode('login'),
                                    children: "Sign in"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 152,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    "aria-selected": mode === 'register',
                                    className: "lm__tab".concat(mode === 'register' ? ' lm__tab--active' : ''),
                                    onClick: ()=>switchMode('register'),
                                    children: "Create account"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this),
                        mode === 'login' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "lm-title",
                                    className: "lm__title",
                                    children: "Welcome back"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__subtitle",
                                    children: "Sign in to manage your enquiries and saved products."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__error",
                                    role: "alert",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "lm__form",
                                    onSubmit: handleLogin,
                                    noValidate: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: emailId,
                                                    className: "lm__label",
                                                    children: "Email address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: emailId,
                                                    type: "email",
                                                    className: "lm__input",
                                                    placeholder: "you@example.com",
                                                    value: email,
                                                    autoComplete: "email",
                                                    onChange: (e)=>setEmail(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: pwId,
                                                    className: "lm__label",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lm__input-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: pwId,
                                                            type: showPassword ? 'text' : 'password',
                                                            className: "lm__input",
                                                            placeholder: "••••••••",
                                                            value: password,
                                                            autoComplete: "current-password",
                                                            onChange: (e)=>setPassword(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "lm__show-pw",
                                                            "aria-label": showPassword ? 'Hide password' : 'Show password',
                                                            onClick: ()=>setShowPassword((v)=>!v),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EyeIcon, {
                                                                open: showPassword
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "lm__forgot-link",
                                            onClick: ()=>switchMode('forgot'),
                                            children: "Forgot password?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "btn btn--gold btn--block lm__submit",
                                            disabled: submitting,
                                            children: submitting ? 'Signing in…' : 'Sign in'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        mode === 'register' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "lm-title",
                                    className: "lm__title",
                                    children: "Create an account"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__subtitle",
                                    children: "Save your wishlist, track enquiries, and manage your orders."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__error",
                                    role: "alert",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "lm__form",
                                    onSubmit: handleRegister,
                                    noValidate: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: nameId,
                                                    className: "lm__label",
                                                    children: "Full name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: nameId,
                                                    type: "text",
                                                    className: "lm__input",
                                                    placeholder: "Your name",
                                                    value: name,
                                                    autoComplete: "name",
                                                    onChange: (e)=>setName(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: emailId,
                                                    className: "lm__label",
                                                    children: "Email address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: emailId,
                                                    type: "email",
                                                    className: "lm__input",
                                                    placeholder: "you@example.com",
                                                    value: email,
                                                    autoComplete: "email",
                                                    onChange: (e)=>setEmail(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: pwId,
                                                    className: "lm__label",
                                                    children: [
                                                        "Password ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "lm__label-hint",
                                                            children: "min. 8 characters"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 30
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lm__input-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: pwId,
                                                            type: showPassword ? 'text' : 'password',
                                                            className: "lm__input",
                                                            placeholder: "••••••••",
                                                            value: password,
                                                            autoComplete: "new-password",
                                                            onChange: (e)=>setPassword(e.target.value)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "lm__show-pw",
                                                            "aria-label": showPassword ? 'Hide password' : 'Show password',
                                                            onClick: ()=>setShowPassword((v)=>!v),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EyeIcon, {
                                                                open: showPassword
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "lm__label",
                                                    children: "Confirm password"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    className: "lm__input",
                                                    placeholder: "••••••••",
                                                    value: confirmPassword,
                                                    autoComplete: "new-password",
                                                    onChange: (e)=>setConfirmPassword(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "lm__label",
                                                    children: [
                                                        "Phone ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "lm__label-hint",
                                                            children: "(optional)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    className: "lm__input",
                                                    placeholder: "+91 00000 00000",
                                                    value: phone,
                                                    autoComplete: "tel",
                                                    onChange: (e)=>setPhone(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "btn btn--gold btn--block lm__submit",
                                            disabled: submitting,
                                            children: submitting ? 'Creating account…' : 'Create account'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        mode === 'forgot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "lm-title",
                                    className: "lm__title",
                                    children: "Reset password"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__subtitle",
                                    children: "Enter your email and we'll send a reset link if the address is registered."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__error",
                                    role: "alert",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 226,
                                    columnNumber: 25
                                }, this),
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lm__success",
                                    role: "status",
                                    children: success
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 227,
                                    columnNumber: 27
                                }, this),
                                !success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "lm__form",
                                    onSubmit: handleForgot,
                                    noValidate: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "lm__field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: emailId,
                                                    className: "lm__label",
                                                    children: "Email address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: emailId,
                                                    type: "email",
                                                    className: "lm__input",
                                                    placeholder: "you@example.com",
                                                    value: email,
                                                    autoComplete: "email",
                                                    onChange: (e)=>setEmail(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "btn btn--gold btn--block lm__submit",
                                            disabled: submitting,
                                            children: submitting ? 'Sending…' : 'Send reset link'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                                            lineNumber: 234,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 229,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "lm__forgot-link",
                                    style: {
                                        marginTop: '1.25rem',
                                        alignSelf: 'center'
                                    },
                                    onClick: ()=>switchMode('login'),
                                    children: "← Back to sign in"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lm__divider",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "or"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                lineNumber: 241,
                                columnNumber: 40
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "btn btn--outline btn--block lm__skip",
                            onClick: handleClose,
                            children: "Continue as guest"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this),
                        mode === 'login' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lm__admin-access",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "lm__admin-btn",
                                onClick: async ()=>{
                                    setError('');
                                    setSubmitting(true);
                                    try {
                                        await login('admin@rajtandoor.com', 'Admin@1234');
                                        handleClose();
                                    } catch (err) {
                                        setError(err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? err.message : 'Admin login failed.');
                                    } finally{
                                        setSubmitting(false);
                                    }
                                },
                                disabled: submitting,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "13",
                                        height: "13",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "3",
                                                y: "11",
                                                width: "18",
                                                height: "11",
                                                rx: "2",
                                                ry: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M7 11V7a5 5 0 0 1 10 0v4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/auth/LoginModal.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this),
                                    "Login as Admin"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/LoginModal.tsx",
                                lineNumber: 247,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/LoginModal.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/LoginModal.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginModal.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/auth/LoginModal.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(LoginModal, "NhdbmkAPsbSEAi9sjBIjOv6Alis=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c = LoginModal;
var _c;
__turbopack_context__.k.register(_c, "LoginModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SiteHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NavLink.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$WishlistContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/WishlistContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/SearchContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrandMark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BrandMark.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$CartDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart/CartDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/LoginModal.tsx [app-client] (ecmascript)");
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
;
;
;
;
const MEGA_COLS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].slice(0, 4),
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].slice(4, 8),
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].slice(8, 12),
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].slice(12)
];
function SiteHeader() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cartOpen, setCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loginOpen, setLoginOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [megaOpen, setMegaOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileProdOpen, setMobileProdOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const megaTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const { itemCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { count: wishlistCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$WishlistContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"])();
    const { open: openSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearch"])();
    const { isLoggedIn, user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [accountOpen, setAccountOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const accountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isHome = pathname === '/';
    const mobileNavRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const handler = {
                "SiteHeader.useEffect.handler": ()=>setScrolled(window.scrollY > 40)
            }["SiteHeader.useEffect.handler"];
            window.addEventListener('scroll', handler, {
                passive: true
            });
            handler();
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener('scroll', handler)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            setMobileOpen(false);
            setAccountOpen(false);
            setMegaOpen(false);
        }
    }["SiteHeader.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            if (!accountOpen) return;
            const handler = {
                "SiteHeader.useEffect.handler": (e)=>{
                    if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
                }
            }["SiteHeader.useEffect.handler"];
            document.addEventListener('mousedown', handler);
            return ({
                "SiteHeader.useEffect": ()=>document.removeEventListener('mousedown', handler)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], [
        accountOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            const handler = {
                "SiteHeader.useEffect.handler": (e)=>{
                    if (e.key === 'Escape') {
                        setMobileOpen(false);
                        setMegaOpen(false);
                    }
                }
            }["SiteHeader.useEffect.handler"];
            window.addEventListener('keydown', handler);
            return ({
                "SiteHeader.useEffect": ()=>window.removeEventListener('keydown', handler)
            })["SiteHeader.useEffect"];
        }
    }["SiteHeader.useEffect"], []);
    const openMega = ()=>{
        clearTimeout(megaTimerRef.current);
        setMegaOpen(true);
    };
    const closeMega = ()=>{
        megaTimerRef.current = setTimeout(()=>setMegaOpen(false), 150);
    };
    const userInitial = user ? user.name[0].toUpperCase() : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sh ".concat(scrolled || !isHome ? 'sh--scrolled' : '', " ").concat(mobileOpen ? 'sh--open' : ''),
                role: "banner",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sh__inner container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "sh__logo",
                                "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].fullName,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrandMark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandMark"], {
                                    size: "lg",
                                    theme: "light"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "sh__nav",
                                "aria-label": "Primary navigation",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    role: "list",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "sh__mega-trigger".concat(megaOpen ? ' sh__mega-trigger--active' : ''),
                                            onMouseEnter: openMega,
                                            onMouseLeave: closeMega,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "sh__link sh__link--mega",
                                                "aria-expanded": megaOpen,
                                                "aria-haspopup": "true",
                                                children: [
                                                    "Products",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sh__link-caret",
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "12",
                                                            height: "12",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2.5",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "6 9 12 15 18 9"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavLink"], {
                                                    href: item.href,
                                                    className: (param)=>{
                                                        let { isActive } = param;
                                                        return isActive ? 'sh__link sh__link--active' : 'sh__link';
                                                    },
                                                    end: item.href === '/',
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this)
                                            }, item.href, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 110,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sh__actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "sh__icon-btn",
                                        "aria-label": "Open search",
                                        onClick: openSearch,
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "11",
                                                    cy: "11",
                                                    r: "8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "m21 21-4.3-4.3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/wishlist",
                                        className: "sh__icon-btn sh__icon-btn--badge sh__wishlist",
                                        "aria-label": "Wishlist".concat(wishlistCount ? ", ".concat(wishlistCount, " item").concat(wishlistCount !== 1 ? 's' : '') : ''),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "20",
                                                height: "20",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 134,
                                                columnNumber: 15
                                            }, this),
                                            wishlistCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sh__badge",
                                                "aria-hidden": "true",
                                                children: wishlistCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 137,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "sh__icon-btn sh__icon-btn--badge sh__cart-btn",
                                        "aria-label": "Shopping cart".concat(itemCount ? ", ".concat(itemCount, " item").concat(itemCount !== 1 ? 's' : '') : ''),
                                        onClick: ()=>setCartOpen(true),
                                        type: "button",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "20",
                                                height: "20",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "3",
                                                        y1: "6",
                                                        x2: "21",
                                                        y2: "6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M16 10a4 4 0 0 1-8 0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 54
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            itemCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sh__badge",
                                                "aria-hidden": "true",
                                                children: itemCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 146,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sh__account",
                                        ref: accountRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "sh__avatar",
                                                "aria-label": "Account: ".concat(user === null || user === void 0 ? void 0 : user.name),
                                                "aria-expanded": accountOpen,
                                                "aria-haspopup": "menu",
                                                onClick: ()=>setAccountOpen((v)=>!v),
                                                children: userInitial
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this),
                                            accountOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sh__account-menu",
                                                role: "menu",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "sh__account-name",
                                                        children: user === null || user === void 0 ? void 0 : user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/account",
                                                        role: "menuitem",
                                                        className: "sh__account-item",
                                                        children: "My Account"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/account/orders",
                                                        role: "menuitem",
                                                        className: "sh__account-item",
                                                        children: "My Orders"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/wishlist",
                                                        role: "menuitem",
                                                        className: "sh__account-item",
                                                        children: "My Wishlist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/account/addresses",
                                                        role: "menuitem",
                                                        className: "sh__account-item",
                                                        children: "Addresses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sh__account-divider"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        role: "menuitem",
                                                        className: "sh__account-item sh__account-item--danger",
                                                        onClick: ()=>{
                                                            logout();
                                                            setAccountOpen(false);
                                                        },
                                                        children: "Sign out"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn btn--outline sh__login-btn",
                                        onClick: ()=>setLoginOpen(true),
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact?type=quote",
                                        className: "btn btn--gold sh__quote-btn",
                                        children: "Request a Quote"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "sh__burger",
                                        "aria-label": mobileOpen ? 'Close menu' : 'Open menu',
                                        "aria-expanded": mobileOpen,
                                        "aria-controls": "sh-mobile-nav",
                                        onClick: ()=>setMobileOpen((v)=>!v),
                                        type: "button",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sh__burger-bar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 198,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sh__burger-bar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 199,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sh-mega ".concat(megaOpen ? 'sh-mega--open' : ''),
                        onMouseEnter: openMega,
                        onMouseLeave: closeMega,
                        "aria-hidden": !megaOpen,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sh-mega__inner container",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sh-mega__grid",
                                children: MEGA_COLS.map((col, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sh-mega__col",
                                        children: col.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sh-mega__section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/shop?category=".concat(cat.slug),
                                                        className: "sh-mega__title",
                                                        onClick: ()=>setMegaOpen(false),
                                                        children: [
                                                            cat.name,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "sh-mega__arrow",
                                                                "aria-hidden": "true",
                                                                children: "→"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "sh-mega__list",
                                                        children: cat.products.slice(0, 4).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/products/".concat(p.slug),
                                                                    className: "sh-mega__item",
                                                                    onClick: ()=>setMegaOpen(false),
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, p.slug, false, {
                                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 23
                                                    }, this),
                                                    cat.products.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/shop?category=".concat(cat.slug),
                                                        className: "sh-mega__more",
                                                        onClick: ()=>setMegaOpen(false),
                                                        children: [
                                                            "+",
                                                            cat.products.length - 4,
                                                            " more"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, cat.slug, true, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this))
                                    }, ci, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sh__overlay",
                        onClick: ()=>setMobileOpen(false),
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "sh-mobile-nav",
                        ref: mobileNavRef,
                        className: "sh__mobile",
                        "aria-hidden": !mobileOpen,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sh__mobile-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrandMark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandMark"], {
                                        size: "lg",
                                        theme: "light"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "sh__mobile-close",
                                        "aria-label": "Close menu",
                                        onClick: ()=>setMobileOpen(false),
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                "aria-label": "Mobile navigation",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    role: "list",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "sh__mobile-link sh__mobile-link--btn sh__mobile-prod-toggle",
                                                    tabIndex: mobileOpen ? 0 : -1,
                                                    onClick: ()=>setMobileProdOpen((v)=>!v),
                                                    "aria-expanded": mobileProdOpen,
                                                    children: [
                                                        "Products",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "sh__mobile-prod-caret".concat(mobileProdOpen ? ' sh__mobile-prod-caret--open' : ''),
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "6 9 12 15 18 9"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sh__mobile-cats".concat(mobileProdOpen ? ' sh__mobile-cats--open' : ''),
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/shop?category=".concat(cat.slug),
                                                            className: "sh__mobile-cat-link",
                                                            tabIndex: mobileOpen && mobileProdOpen ? 0 : -1,
                                                            onClick: ()=>setMobileOpen(false),
                                                            children: cat.name
                                                        }, cat.slug, false, {
                                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavLink"], {
                                                    href: item.href,
                                                    className: (param)=>{
                                                        let { isActive } = param;
                                                        return isActive ? 'sh__mobile-link sh__mobile-link--active' : 'sh__mobile-link';
                                                    },
                                                    end: item.href === '/',
                                                    tabIndex: mobileOpen ? 0 : -1,
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this)
                                            }, item.href, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "sh__mobile-divider"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/wishlist",
                                                className: "sh__mobile-link",
                                                tabIndex: mobileOpen ? 0 : -1,
                                                children: [
                                                    "Wishlist ",
                                                    wishlistCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sh__mobile-badge",
                                                        children: wishlistCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 50
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 326,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this),
                                        isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/account",
                                                        className: "sh__mobile-link",
                                                        tabIndex: mobileOpen ? 0 : -1,
                                                        children: [
                                                            "My Account (",
                                                            user === null || user === void 0 ? void 0 : user.name,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/account/orders",
                                                        className: "sh__mobile-link",
                                                        tabIndex: mobileOpen ? 0 : -1,
                                                        children: "My Orders"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "sh__mobile-link sh__mobile-link--btn",
                                                        tabIndex: mobileOpen ? 0 : -1,
                                                        onClick: ()=>{
                                                            logout();
                                                            setMobileOpen(false);
                                                        },
                                                        children: "Sign out"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "sh__mobile-link sh__mobile-link--btn",
                                                tabIndex: mobileOpen ? 0 : -1,
                                                onClick: ()=>{
                                                    setMobileOpen(false);
                                                    setLoginOpen(true);
                                                },
                                                children: "Login / Sign in"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                            lineNumber: 341,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                    lineNumber: 279,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sh__mobile-cta",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact?type=quote",
                                    className: "sh__quote-btn",
                                    style: {
                                        width: '100%',
                                        justifyContent: 'center'
                                    },
                                    tabIndex: mobileOpen ? 0 : -1,
                                    children: "Request a Quote"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SiteHeader.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$CartDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartDrawer"], {
                isOpen: cartOpen,
                onClose: ()=>setCartOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoginModal"], {
                forceOpen: loginOpen,
                onClose: ()=>setLoginOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SiteHeader.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(SiteHeader, "gCZ8mAwjqx7UQcw1fXZumawmtD0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$WishlistContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SiteFooter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrandMark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BrandMark.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SocialIcon(param) {
    let { name } = param;
    const icons = {
        instagram: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "2",
                    width: "20",
                    height: "20",
                    rx: "5",
                    ry: "5"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 12,
                    columnNumber: 66
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "17.5",
                    y1: "6.5",
                    x2: "17.51",
                    y2: "6.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 12,
                    columnNumber: 126
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/SiteFooter.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this),
        facebook: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/SiteFooter.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this),
        linkedin: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "9",
                    width: "4",
                    height: "12"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 22,
                    columnNumber: 100
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "4",
                    cy: "4",
                    r: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 22,
                    columnNumber: 142
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/SiteFooter.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this),
        youtube: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 27,
                    columnNumber: 285
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/SiteFooter.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    };
    var _icons_name;
    return (_icons_name = icons[name]) !== null && _icons_name !== void 0 ? _icons_name : null;
}
_c = SocialIcon;
function SiteFooter() {
    _s();
    const [openCol, setOpenCol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const year = new Date().getFullYear();
    const hasContact = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].phone || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].email || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].address;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "sf",
        role: "contentinfo",
        children: [
            hasContact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sf__strip",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container sf__strip-inner",
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "tel:".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].phone),
                            className: "sf__strip-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sf__strip-label",
                                    children: "Phone"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sf__strip-value",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].phone
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 47,
                            columnNumber: 15
                        }, this),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "mailto:".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].email),
                            className: "sf__strip-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sf__strip-label",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 54,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sf__strip-value",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].email
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 53,
                            columnNumber: 15
                        }, this),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sf__strip-item sf__strip-item--addr",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sf__strip-label",
                                    children: "Address"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("address", {
                                    className: "sf__strip-value",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].address,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].city && ", ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].city),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].state && ", ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contact"].state)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 61,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 59,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sf__main container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sf__brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].fullName,
                                className: "sf__logo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BrandMark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandMark"], {
                                    size: "md",
                                    theme: "light"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sf__desc",
                                children: "Professional tandoors and kitchen equipment for restaurants, hotels, catering businesses, and commercial kitchens."
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/contact?type=quote",
                                className: "btn btn--gold btn--sm sf__cta",
                                children: "Request a Quote"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["social"]).some((param)=>{
                                let [, v] = param;
                                return v;
                            }) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "sf__social",
                                role: "list",
                                "aria-label": "Social media links",
                                children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["social"]).map((param)=>{
                                    let [key, url] = param;
                                    return url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            "aria-label": key.charAt(0).toUpperCase() + key.slice(1),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialIcon, {
                                                name: key
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                                lineNumber: 90,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                            lineNumber: 89,
                                            columnNumber: 21
                                        }, this)
                                    }, key, false, {
                                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                        lineNumber: 88,
                                        columnNumber: 19
                                    }, this) : null;
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["footerColumns"].map((col, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sf__col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "sf__col-toggle",
                                    type: "button",
                                    "aria-expanded": openCol === i,
                                    onClick: ()=>setOpenCol((v)=>v === i ? null : i),
                                    "aria-controls": "sf-col-".concat(i),
                                    children: [
                                        col.heading,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "sf__chevron ".concat(openCol === i ? 'sf__chevron--open' : ''),
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "6 9 12 15 18 9"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "sf__col-heading",
                                    children: col.heading
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    id: "sf-col-".concat(i),
                                    className: "sf__links ".concat(openCol === i ? 'sf__links--open' : ''),
                                    role: "list",
                                    children: col.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        }, link.href, false, {
                                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, col.heading, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sf__bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container sf__bottom-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "sf__copy",
                            children: [
                                "© ",
                                year,
                                " ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brand"].fullName,
                                ". All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "sf__legal",
                            role: "list",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/privacy-policy",
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/terms",
                                        children: "Terms & Conditions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/shipping-policy",
                                        children: "Shipping Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/return-policy",
                                        children: "Returns"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/SiteFooter.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/SiteFooter.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/SiteFooter.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/SiteFooter.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(SiteFooter, "l0bbUeyeG+HlO6FTOljC6czgJb0=");
_c1 = SiteFooter;
var _c, _c1;
__turbopack_context__.k.register(_c, "SocialIcon");
__turbopack_context__.k.register(_c1, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WhatsAppFAB.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhatsAppFAB",
    ()=>WhatsAppFAB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function WhatsAppFAB() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: "https://wa.me/919687860303",
        className: "wa-fab",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Chat with us on WhatsApp",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "28",
                height: "28",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
                }, void 0, false, {
                    fileName: "[project]/src/components/WhatsAppFAB.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/WhatsAppFAB.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "wa-fab__label",
                children: "Chat on WhatsApp"
            }, void 0, false, {
                fileName: "[project]/src/components/WhatsAppFAB.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WhatsAppFAB.tsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = WhatsAppFAB;
var _c;
__turbopack_context__.k.register(_c, "WhatsAppFAB");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/SearchOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchOverlay",
    ()=>SearchOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/SearchContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const RECENT_KEY = 'rt-recent-searches';
const MAX_RECENT = 5;
const QUICK_SEARCHES = [
    'Tandoor',
    'Gas Tandoor',
    'Commercial',
    'Clay Tandoor',
    'Accessories',
    'Restaurant'
];
const CATEGORIES = [
    {
        label: 'Tandoors',
        slug: 'tandoors',
        icon: '🔥'
    },
    {
        label: 'Kitchen Equipment',
        slug: 'kitchen-equipment',
        icon: '🍳'
    },
    {
        label: 'Accessories',
        slug: 'accessories',
        icon: '🔧'
    }
];
function getRecent() {
    try {
        return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (e) {
        return [];
    }
}
function saveRecent(term) {
    if (!term.trim()) return;
    const list = [
        term,
        ...getRecent().filter((r)=>r !== term)
    ].slice(0, MAX_RECENT);
    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (e) {}
}
function removeRecent(term) {
    const list = getRecent().filter((r)=>r !== term);
    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (e) {}
}
function SearchOverlay() {
    _s();
    const { isOpen, query, results, close, setQuery } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearch"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [recent, setRecent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [focused, setFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (isOpen) {
                setRecent(getRecent());
                setFocused(-1);
                setTimeout({
                    "SearchOverlay.useEffect": ()=>{
                        var _inputRef_current;
                        return (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                    }
                }["SearchOverlay.useEffect"], 50);
            }
        }
    }["SearchOverlay.useEffect"], [
        isOpen
    ]);
    const handleSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleSelect]": (term)=>{
            var _inputRef_current;
            setQuery(term);
            (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        }
    }["SearchOverlay.useCallback[handleSelect]"], [
        setQuery
    ]);
    const handleResultClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleResultClick]": (name)=>{
            saveRecent(name);
            setRecent(getRecent());
            close();
        }
    }["SearchOverlay.useCallback[handleResultClick]"], [
        close
    ]);
    const handleRemoveRecent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleRemoveRecent]": (e, term)=>{
            e.preventDefault();
            e.stopPropagation();
            removeRecent(term);
            setRecent(getRecent());
        }
    }["SearchOverlay.useCallback[handleRemoveRecent]"], []);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleKeyDown]": (e)=>{
            if (!results.length) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocused({
                    "SearchOverlay.useCallback[handleKeyDown]": (f)=>Math.min(f + 1, results.length - 1)
                }["SearchOverlay.useCallback[handleKeyDown]"]);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocused({
                    "SearchOverlay.useCallback[handleKeyDown]": (f)=>Math.max(f - 1, -1)
                }["SearchOverlay.useCallback[handleKeyDown]"]);
            }
            if (e.key === 'Enter' && focused >= 0) {
                const r = results[focused];
                saveRecent(r.name);
                close();
                window.location.href = "/products/".concat(r.slug);
            }
        }
    }["SearchOverlay.useCallback[handleKeyDown]"], [
        results,
        focused,
        close
    ]);
    if (!isOpen) return null;
    const hasQuery = query.trim().length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "so",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Search products",
        onKeyDown: handleKeyDown,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "so__backdrop",
                onClick: close,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "so__panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "so__header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "so__input-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "so__search-icon",
                                        width: "22",
                                        height: "22",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2.2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "11",
                                                cy: "11",
                                                r: "8"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m21 21-4.3-4.3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 85,
                                                columnNumber: 47
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "so-input",
                                        className: "sr-only",
                                        children: "Search products"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "so-input",
                                        ref: inputRef,
                                        type: "search",
                                        className: "so__input",
                                        placeholder: "Search tandoors, equipment, accessories…",
                                        value: query,
                                        onChange: (e)=>{
                                            setQuery(e.target.value);
                                            setFocused(-1);
                                        },
                                        autoComplete: "off",
                                        spellCheck: false,
                                        "aria-autocomplete": "list",
                                        "aria-controls": "so-results"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    hasQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "so__clear",
                                        "aria-label": "Clear search",
                                        onClick: ()=>{
                                            var _inputRef_current;
                                            setQuery('');
                                            (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "14",
                                            height: "14",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "18",
                                                    y1: "6",
                                                    x2: "6",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 57
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "so__close-btn",
                                onClick: close,
                                "aria-label": "Close search",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "18",
                                                y1: "6",
                                                x2: "6",
                                                y2: "18"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "6",
                                                y1: "6",
                                                x2: "18",
                                                y2: "18"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 111,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Esc"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "so__body",
                        id: "so-results",
                        role: "region",
                        "aria-label": "Search results",
                        children: [
                            !hasQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    recent.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__section-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "13",
                                                        height: "13",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        "aria-hidden": "true",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "12 6 12 12 16 14"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 55
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Recent searches"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__chips",
                                                children: recent.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "so__chip so__chip--recent",
                                                        onClick: ()=>handleSelect(r),
                                                        children: [
                                                            r,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "so__chip-remove",
                                                                role: "button",
                                                                "aria-label": "Remove ".concat(r),
                                                                onClick: (e)=>handleRemoveRecent(e, r),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "10",
                                                                    height: "10",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2.5",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                            x1: "18",
                                                                            y1: "6",
                                                                            x2: "6",
                                                                            y2: "18"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                            lineNumber: 138,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                            x1: "6",
                                                                            y1: "6",
                                                                            x2: "18",
                                                                            y2: "18"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                            lineNumber: 138,
                                                                            columnNumber: 66
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 137,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, r, true, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__section-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "13",
                                                        height: "13",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                            points: "22 12 18 12 15 21 9 3 6 12 2 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Popular searches"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__chips",
                                                children: QUICK_SEARCHES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "so__chip",
                                                        onClick: ()=>handleSelect(s),
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__section-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "13",
                                                        height: "13",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        "aria-hidden": "true",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: "2",
                                                                y: "7",
                                                                width: "20",
                                                                height: "14",
                                                                rx: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 70
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Browse by category"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "so__categories",
                                                children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/shop?category=".concat(cat.slug),
                                                        className: "so__cat-card",
                                                        onClick: close,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "so__cat-icon",
                                                                children: cat.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "so__cat-label",
                                                                children: cat.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "14",
                                                                height: "14",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                    points: "9 18 15 12 9 6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, cat.slug, true, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            hasQuery && results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "so__section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "13",
                                                height: "13",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "11",
                                                        cy: "11",
                                                        r: "8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "m21 21-4.3-4.3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 50
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            results.length,
                                            " result",
                                            results.length !== 1 ? 's' : '',
                                            ' for "',
                                            query,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "so__results",
                                        role: "listbox",
                                        "aria-label": "Product results",
                                        children: results.slice(0, 8).map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                role: "option",
                                                "aria-selected": focused === i,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/products/".concat(p.slug),
                                                    className: "so__result".concat(focused === i ? ' so__result--focused' : ''),
                                                    onClick: ()=>handleResultClick(p.name),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "so__result-img-wrap",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: p.image,
                                                                alt: "",
                                                                className: "so__result-img",
                                                                loading: "lazy",
                                                                width: 64,
                                                                height: 64
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                lineNumber: 201,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "so__result-info",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "so__result-cat",
                                                                    children: p.categoryLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 204,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "so__result-name",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "so__result-desc",
                                                                    children: p.shortDescription
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "so__result-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "so__result-price",
                                                                    children: p.price ? "₹".concat(p.price.toLocaleString('en-IN')) : 'Request Quote'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 209,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "16",
                                                                    height: "16",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    "aria-hidden": "true",
                                                                    className: "so__result-arrow",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                        points: "9 18 15 12 9 6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                        lineNumber: 213,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, this)
                                            }, p.id, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 194,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            hasQuery && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "so__empty",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__empty-icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "40",
                                            height: "40",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "11",
                                                    cy: "11",
                                                    r: "8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "m21 21-4.3-4.3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "8",
                                                    y1: "11",
                                                    x2: "14",
                                                    y2: "11"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                            lineNumber: 227,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "so__empty-title",
                                        children: [
                                            'No results for "',
                                            query,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "so__empty-sub",
                                        children: "Try a different spelling, or browse by category below."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "so__chips so__chips--center",
                                        children: QUICK_SEARCHES.slice(0, 4).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "so__chip",
                                                onClick: ()=>handleSelect(s),
                                                children: s
                                            }, s, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "so__footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/shop",
                                className: "so__browse-all",
                                onClick: close,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "2",
                                                y: "7",
                                                width: "20",
                                                height: "14",
                                                rx: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                                lineNumber: 248,
                                                columnNumber: 64
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    "Browse all products"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "so__kbd-hint",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                        children: "↑↓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    " navigate   ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                        children: "↵"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 253,
                                        columnNumber: 43
                                    }, this),
                                    " select   ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                        children: "Esc"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                        lineNumber: 253,
                                        columnNumber: 70
                                    }, this),
                                    " close"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/SearchOverlay.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/SearchOverlay.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/SearchOverlay.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(SearchOverlay, "EuV9T3SQ8GTvCSW37p6iSLZGsSk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$SearchContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearch"]
    ];
});
_c = SearchOverlay;
var _c;
__turbopack_context__.k.register(_c, "SearchOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/three/tAnim.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Shared mutable state that GSAP tweens; R3F useFrame reads this directly. */ __turbopack_context__.s([
    "tAnim",
    ()=>tAnim
]);
const tAnim = {
    posX: 5,
    rotY: 0,
    cameraZ: 4.5
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useEnvironment.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYOUT_QUERIES",
    ()=>LAYOUT_QUERIES,
    "hasWebGL",
    ()=>hasWebGL,
    "useLayoutMode",
    ()=>useLayoutMode,
    "useReducedMotion",
    ()=>useReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
function useMediaQuery(query) {
    _s();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMediaQuery.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return window.matchMedia(query).matches;
        }
    }["useMediaQuery.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaQuery.useEffect": ()=>{
            const mq = window.matchMedia(query);
            const onChange = {
                "useMediaQuery.useEffect.onChange": ()=>setMatches(mq.matches)
            }["useMediaQuery.useEffect.onChange"];
            onChange();
            mq.addEventListener('change', onChange);
            return ({
                "useMediaQuery.useEffect": ()=>mq.removeEventListener('change', onChange)
            })["useMediaQuery.useEffect"];
        }
    }["useMediaQuery.useEffect"], [
        query
    ]);
    return matches;
}
_s(useMediaQuery, "2cAPa5EnrjDRO0JmqLZtY0f/zK4=");
const LAYOUT_QUERIES = {
    desktop: '(min-width: 1200px) and (min-aspect-ratio: 1/1)',
    tablet: '(min-width: 820px) and (min-aspect-ratio: 1/1)'
};
function useLayoutMode() {
    _s1();
    const desktop = useMediaQuery(LAYOUT_QUERIES.desktop);
    const tablet = useMediaQuery(LAYOUT_QUERIES.tablet);
    if (desktop) return 'desktop';
    if (tablet) return 'tablet';
    return 'stacked';
}
_s1(useLayoutMode, "AQ3kGlN9WPIPZDjB84lbPxUipGA=", false, function() {
    return [
        useMediaQuery,
        useMediaQuery
    ];
});
function useReducedMotion() {
    _s2();
    const prefers = useMediaQuery('(prefers-reduced-motion: reduce)');
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return prefers || new URLSearchParams(window.location.search).has('reduced-motion');
}
_s2(useReducedMotion, "qVg4T90aXjGY/PUsbKYBjr+jvB0=", false, function() {
    return [
        useMediaQuery
    ];
});
let webglCache = null;
function hasWebGL() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (webglCache !== null) return webglCache;
    if (new URLSearchParams(window.location.search).has('static')) return webglCache = false;
    try {
        var _getExtension, _this;
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        webglCache = !!gl;
        (_this = gl) === null || _this === void 0 ? void 0 : (_getExtension = _this.getExtension('WEBGL_lose_context')) === null || _getExtension === void 0 ? void 0 : _getExtension.loseContext();
    } catch (e) {
        webglCache = false;
    }
    return webglCache;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transitions/PageTransitionOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTransitionOverlay",
    ()=>PageTransitionOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/three/tAnim.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useEnvironment.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const TransitionScene = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/src/three/TransitionScene.tsx [app-client] (ecmascript, async loader)").then((m)=>({
            default: m.TransitionScene
        })));
_c = TransitionScene;
function PageTransitionOverlay() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const prevPathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(pathname);
    const hideTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const webgl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useEnvironment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasWebGL"])();
    const reduced = "object" !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransitionOverlay.useEffect": ()=>{
            // Fire on every route change (but not on initial mount)
            if (pathname === prevPathRef.current) return;
            prevPathRef.current = pathname;
            const overlay = overlayRef.current;
            const text = textRef.current;
            if (!overlay) return;
            // Clear any previous hide timer
            clearTimeout(hideTimerRef.current);
            // Reset and start 3D model animation
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"].posX = 5;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"].rotY = 0;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"].cameraZ = 4.5;
            activeRef.current = true;
            if (webgl && !reduced) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"], {
                    posX: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                    delay: 0.1
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"], {
                    rotY: Math.PI * 1.85,
                    duration: 0.65,
                    ease: 'power1.inOut',
                    delay: 0.25
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"], {
                    cameraZ: 3.9,
                    duration: 0.45,
                    ease: 'power1.inOut',
                    delay: 0.3
                });
            }
            // Show overlay — drive pointer-events via inline style (beats CSS specificity issues)
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            if (text) text.classList.add('ptov__text--visible');
            // Start exit after a brief hold
            hideTimerRef.current = setTimeout({
                "PageTransitionOverlay.useEffect": ()=>{
                    if (webgl && !reduced) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$three$2f$tAnim$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tAnim"], {
                            posX: -5,
                            duration: 0.3,
                            ease: 'power3.in'
                        });
                    }
                    if (text) text.classList.remove('ptov__text--visible');
                    setTimeout({
                        "PageTransitionOverlay.useEffect": ()=>{
                            overlay.style.opacity = '0';
                            overlay.style.pointerEvents = 'none';
                            activeRef.current = false;
                        }
                    }["PageTransitionOverlay.useEffect"], 300);
                }
            }["PageTransitionOverlay.useEffect"], 600);
        }
    }["PageTransitionOverlay.useEffect"], [
        pathname,
        webgl,
        reduced
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: overlayRef,
        className: "ptov",
        "aria-hidden": "true",
        style: {
            opacity: 0,
            pointerEvents: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ptov__glow",
                style: {
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            webgl && !reduced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransitionScene, {
                    activeRef: activeRef
                }, void 0, false, {
                    fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: textRef,
                className: "ptov__text",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ptov__tagline",
                    children: "Engineered for Excellence"
                }, void 0, false, {
                    fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transitions/PageTransitionOverlay.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(PageTransitionOverlay, "8bz734jqePhKwlX8MeLtxe3zBCc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = PageTransitionOverlay;
var _c, _c1;
__turbopack_context__.k.register(_c, "TransitionScene");
__turbopack_context__.k.register(_c1, "PageTransitionOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6e3c6d65._.js.map