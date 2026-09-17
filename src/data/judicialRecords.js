import loaders from "./judicial/generated/loaders.js";

/** Detailed evidence is loaded only when a person's page is opened. */
export async function loadJudicialRecord(id) {
  if (!Object.hasOwn(loaders, id)) return null;
  const module = await loaders[id]();
  return module.default;
}
