import * as server from '../entries/pages/product/_handle_/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/product/_handle_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/product/[handle]/+page.server.js";
export const imports = ["_app/immutable/nodes/5.CJHTCtcw.js","_app/immutable/chunks/DdVW4jDa.js","_app/immutable/chunks/wDxQVGTC.js","_app/immutable/chunks/BnwxKrON.js","_app/immutable/chunks/PDFgVChV.js","_app/immutable/chunks/JU4XpPaF.js","_app/immutable/chunks/M3e0NY8s.js","_app/immutable/chunks/CUpf9j8A.js","_app/immutable/chunks/CzmpvIfj.js","_app/immutable/chunks/BEmPcZUM.js"];
export const stylesheets = ["_app/immutable/assets/5.BnBdtbPy.css"];
export const fonts = [];
