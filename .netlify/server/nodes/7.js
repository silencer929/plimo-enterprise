import * as server from '../entries/pages/search/_collection_/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search/_collection_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/search/[collection]/+page.server.js";
export const imports = ["_app/immutable/nodes/7.DGJaZ3uF.js","_app/immutable/chunks/DdVW4jDa.js","_app/immutable/chunks/wDxQVGTC.js","_app/immutable/chunks/BnwxKrON.js","_app/immutable/chunks/PDFgVChV.js","_app/immutable/chunks/JU4XpPaF.js","_app/immutable/chunks/CUpf9j8A.js","_app/immutable/chunks/M3e0NY8s.js","_app/immutable/chunks/DYRaJfvx.js","_app/immutable/chunks/BC8gJonK.js","_app/immutable/chunks/Djt980em.js"];
export const stylesheets = [];
export const fonts = [];
