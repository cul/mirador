/**
 * MiradorManifest - adds additional, testable logic around Manifesto's Manifest
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class MiradorManifest {
  /** */
  constructor(manifest, canvasResourceTypes = {}) {
    this.manifest = manifest;
    this.canvasResourceTypes = canvasResourceTypes;
  }

  /**
   * Returns the starting canvas specified in the manifest
   * @param {object} manifest manifesto instance
   * @param {number} canvasIndexFromState
   * @return {Canvas}
   */
  get startCanvas() {
    let canvasId;

    const sequence = this.manifest.getSequences()[0];

    if (!sequence) return undefined;

    // IIIF v2
    canvasId = sequence.getProperty('startCanvas');

    if (!canvasId) {
      // IIIF v3
      const start = this.manifest.getProperty('start')
      || sequence.getProperty('start');

      canvasId = start && (start.id || start.source);
    }

    return (canvasId && sequence.getCanvasById(canvasId, this.canvasResourceTypes)) || undefined;
  }

  /** */
  canvasAt(index) {
    const sequence = this.manifest.getSequences()[0];
    const canvases = sequence && sequence.getCanvases(this.canvasResourceTypes);

    return canvases && canvases[index];
  }
}
