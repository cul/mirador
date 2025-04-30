import { numCanvases, someCanvases } from './canvases';

/** stateful type value watcher to detect whether canvases are of uniform type for labeling */
class CanvasTypeWatcher {
  /** */
  constructor(type = null) {
    this.type = type;
  }

  /** */
  match(type) {
    if (type && !this.type) {
      this.type = type.toLowerCase();
      this.matcher = new RegExp(this.type, 'i');
      return true;
    }
    if (!type) return !!this.type;
    return type.match(this.matcher);
  }
}

/** */
const titelize = (s) => `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`;

/** return a list item label for the manifesto resource */
export default function listItemLabel(manifesto) {
  if (!manifesto) return null;

  const itemCount = (manifesto.isCollection() && manifesto.items)?.length;
  if (itemCount) return `${itemCount} Item${itemCount === 1 ? '' : 's'}`;

  const canvasCount = numCanvases(manifesto);
  if (!canvasCount) return null;
  const suffix = canvasCount === 1 ? '' : 's';
  if (manifesto.getBehavior && manifesto.getBehavior()?.includes('paged')) return `${canvasCount} Page${suffix}`;

  const typeWatcher = new CanvasTypeWatcher();
  const hasVaryingCanvases = someCanvases(manifesto, (c) => {
    /** does the annotation body have a consistent type? */
    const f = anno => {
      const bodies = anno?.getBody && anno.getBody();
      if (bodies && bodies[0]) return bodies?.some(b => !typeWatcher.match(b.getType ? b.getType() : null));
      const resource = anno?.getResource && anno.getResource();
      if (resource) return !typeWatcher.match(resource.getType ? resource.getType() : null);
      return typeWatcher.type === null;
    };
    // run for the content (v3) bodies and the image (v2) bodies
    c.getContent()?.some(f);
    c.getImages()?.some(f);
  });
  if (hasVaryingCanvases) return `${canvasCount} Asset${suffix}`;
  const typeLabel = (typeWatcher.type || 'asset');
  return `${canvasCount} ${titelize(typeLabel)}${suffix}`;
}
