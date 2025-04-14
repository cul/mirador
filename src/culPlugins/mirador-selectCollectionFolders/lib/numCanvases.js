/** return the count of canvases for a manifesto resource, or zero if indeterminate */
export default function numCanvases(resource) {
  if (resource === null || typeof resource !== 'object') return 0;

  /** is this a typed Sequence from manifesto, or an anonymous wrapper for canvases? */
  const isSequence = (sequence) => sequence.isSequence && sequence.isSequence();
  if (resource.isManifest && resource.isManifest()) {
    // the anonymous "sequence" of canvases manifesto.js produces from an array of canvases does not have type
    return resource.getSequences().reduce(
      (total, seq) => total + (isSequence(seq) ? numCanvases(seq) : seq.getTotalCanvases()),
      0,
    );
  }
  if (resource.isRange && resource.isRange()) {
    const canvasCount = resource.getCanvasIds().length;
    return resource.getRanges().reduce((total, range) => total + numCanvases(range), canvasCount);
  }
  if (isSequence(resource)) return resource.getTotalCanvases();
  if (resource.isCanvas && resource.isCanvas()) return 1;
  return 0; // unsupported type
}
