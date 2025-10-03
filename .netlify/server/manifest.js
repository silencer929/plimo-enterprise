export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","heart_icon.svg","plimo-enterprise-shop-logo.png","shopping-bag.png","svelte_logo.png","Vercel_Logo.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DVGopa3b.js",app:"_app/immutable/entry/app.BFe1sVZ4.js",imports:["_app/immutable/entry/start.DVGopa3b.js","_app/immutable/chunks/BC8gJonK.js","_app/immutable/chunks/wDxQVGTC.js","_app/immutable/chunks/Djt980em.js","_app/immutable/entry/app.BFe1sVZ4.js","_app/immutable/chunks/wDxQVGTC.js","_app/immutable/chunks/BnwxKrON.js","_app/immutable/chunks/DdVW4jDa.js","_app/immutable/chunks/PDFgVChV.js","_app/immutable/chunks/Djt980em.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cart.json",
				pattern: /^\/cart\.json\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/cart.json/_server.js'))
			},
			{
				id: "/product/[handle]",
				pattern: /^\/product\/([^/]+?)\/?$/,
				params: [{"name":"handle","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/search/[collection]",
				pattern: /^\/search\/([^/]+?)\/?$/,
				params: [{"name":"collection","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
