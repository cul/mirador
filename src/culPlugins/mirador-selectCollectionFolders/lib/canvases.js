/** is this a typed Sequence from manifesto, or an anonymous wrapper for canvases? */
const isSequence = (sequence) => sequence.isSequence && sequence.isSequence();

/** stateful counter to enable reuse of someCanvases to count canvases */
class Counter {
  /** */
  constructor(start = 0) {
    this.count = start;
  }

  /** */
  increment() {
    this.count += 1;
  }
}

/** return the result of calling some() with f for all canvases for a manifesto resource, or false if indeterminate */
export function someCanvases(resource, f = (c) => true) {
  if (resource === null || typeof resource !== 'object') return false;

  if (resource.isManifest && resource.isManifest()) {
    // the anonymous "sequence" of canvases manifesto.js produces from an array of canvases does not have type
    const seqFound = resource.getSequences().reduce(
      (found, seq) => found || (isSequence(seq) ? someCanvases(seq, f) : seq.getCanvases().some(f)),
      false,
    );
    if (seqFound) return true;
  }

  if (resource.isRange && resource.isRange()) {
    if (resource.canvases.some(f)) return true;
    const rangeFound = resource.getRanges().reduce((found, range) => found || someCanvases(range, f), false);
  }
  if (isSequence(resource)) return resource.getCanvases().some(f);
  if (resource.isCanvas && resource.isCanvas()) return f(resource);
  return false; // unsupported type
}

/** return the count of canvases for a manifesto resource, or zero if indeterminate */
export function numCanvases(resource) {
  const counter = new Counter();
  someCanvases(resource, (c) => counter.increment() && false);

  return counter.count;
}
