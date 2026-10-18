export type ArtifactHashes = Record<string, string>;

/** Compare reproducible files while explicitly excluding run metadata and PDFs. */
export function compareArtifactHashes(
  generated: ArtifactHashes,
  reference: ArtifactHashes,
): string[] {
  const comparable = (path: string) =>
    !path.endsWith(".pdf") && !path.endsWith("/run.json") && path !== "run.json";
  const generatedPaths = Object.keys(generated).filter(comparable).sort();
  const referencePaths = Object.keys(reference).filter(comparable).sort();
  if (JSON.stringify(generatedPaths) !== JSON.stringify(referencePaths))
    throw new Error("Reproducible artifact file lists differ");
  for (const path of generatedPaths)
    if (generated[path] !== reference[path])
      throw new Error(`Reproducible artifact differs: ${path}`);
  return generatedPaths;
}

export const REPRODUCIBILITY_EXCLUSIONS = [
  "run.json file bytes (summary, input hashes and source hashes are compared separately)",
  "PDF files entirely (content and metadata are not compared)",
];
