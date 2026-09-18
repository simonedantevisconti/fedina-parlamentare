import fs from "node:fs/promises";
import { getCoverage, readJudicialData, root } from "./lib/judicialData.mjs";

const { groups, counts, total } = getCoverage(await readJudicialData());
const sections = [
  ["complete", "controlli completi"],
  ["preliminary", "controlli preliminari"],
  ["follow-up", "con approfondimenti aperti"],
  ["not-started", "ancora da iniziare"],
];
const content = [
  "# Stato dei controlli parlamentari",
  "",
  `Totale: ${total}. Elenco generato dai file in \`src/data/judicial/people\`. Le categorie descrivono il lavoro di verifica, non l'esito giudiziario delle persone.`,
  "",
  ...sections.flatMap(([key, title]) => [
    `## ${counts[key]} ${title}`,
    "",
    groups[key].map(({ name }) => name).join(", ") + ".",
    "",
  ]),
].join("\n");

await fs.writeFile(new URL("parlamentari-stato.md", root), content, "utf8");
