import citationStyles, { MlaStyle } from './citationStyles';
import { CitationStylePicker } from './CitationStylePicker';

/** */
export const citationHandlerFor = (citationStyle) => citationStyles[citationStyle] || MlaStyle;

export { CitationStylePicker };
