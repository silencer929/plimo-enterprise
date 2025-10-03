import * as server from '../entries/pages/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/4.Bp2yjsHm.js","_app/immutable/chunks/DdVW4jDa.js","_app/immutable/chunks/wDxQVGTC.js","_app/immutable/chunks/BnwxKrON.js","_app/immutable/chunks/CUpf9j8A.js","_app/immutable/chunks/PDFgVChV.js","_app/immutable/chunks/M3e0NY8s.js","_app/immutable/chunks/JU4XpPaF.js"];
export const stylesheets = ["_app/immutable/assets/4.EKAZFmIL.css"];
export const fonts = [];
