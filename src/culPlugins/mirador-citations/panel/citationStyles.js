import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledCitationData = styled('div')(() => ({
  '& .MuiPaper-root': {
    background: 'transparent',
  },
  padding: (theme) => theme.spacing(2),
}));

/** */
const presentString = (text) => (text && text.length > 0);

/** */
const ensureEndsWithDot = (text) => {
  if (!presentString(text)) return '';
  return text.endsWith('.') ? text : `${text}.`;
};

/** */
const ensureQuoted = (text) => {
  if (!presentString(text)) return '';
  const re = /^(['"]).*(['"])$/;
  const match = text.match(re);
  if (!match) return `"${text}"`;
  if (match[1] === match[2]) return text;
  return `${text}${match[1]}`;
};

/** */
const ensureDoiUrl = (doi) => {
  if (!presentString(doi)) return '';
  const unprefixedDoi = (doi.startsWith('doi:')) ? doi.slice(4, -1) : doi;
  return (unprefixedDoi.startsWith('10.')) ? `https://doi.org/${unprefixedDoi}` : unprefixedDoi;
};

/**
 * APA citation per DLC implementation
 */
export function ApaStyle(citationProps, classes) {
  const {
    collectionName, doi, format, nameForCitation, providers, repositoryName, textualDate, title,
  } = citationProps;

  const location = [];
  if (presentString(collectionName)) location.push(collectionName);
  if (presentString(repositoryName)) location.push(repositoryName);
  const providerInfo = [];
  if (presentString(providers[0])) providerInfo.push(providers[0]);
  if (presentString(providers[1])) providerInfo.push(`[${providers[1]}]`);

  const { section } = classes;
  return (
    <StyledCitationData className={section}>
      <Box sx={{ typography: 'body2' }} className="citationName">{ensureEndsWithDot(nameForCitation)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationDate">{ensureEndsWithDot(textualDate)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationTitle">{ensureEndsWithDot(ensureQuoted(title))}</Box>
      <Box sx={{ fontStyle: 'italic', typography: 'body2' }} className="citationProvider">{ensureEndsWithDot(providerInfo.join(' '))}</Box>
      <Box sx={{ typography: 'body2' }} className="citationFormat">{ensureEndsWithDot(format)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationUrl">{`Retrieved from ${ensureDoiUrl(doi)}`}</Box>
    </StyledCitationData>
  );
}

/**
 * Chicago citation per DLC implementation
 */
export function ChicagoStyle(citationProps, classes) {
  const {
    collectionName, doi, format, nameForCitation, providers, repositoryName, textualDate, title,
  } = citationProps;

  const location = [];
  if (presentString(collectionName)) location.push(collectionName);
  if (presentString(repositoryName)) location.push(repositoryName);
  const providerInfo = [];
  if (presentString(providers[0])) providerInfo.push(providers[0]);
  if (presentString(providers[1])) providerInfo.push(`[${providers[1]}]`);

  const { section } = classes;
  return (
    <StyledCitationData className={section}>
      <Box sx={{ typography: 'body2' }} className="citationName">{ensureEndsWithDot(nameForCitation)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationTitle">{ensureEndsWithDot(ensureQuoted(title))}</Box>
      <Box sx={{ typography: 'body2' }} className="citationFormat">{ensureEndsWithDot(format)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationDate">{ensureEndsWithDot(textualDate)}</Box>
      <Box sx={{ fontStyle: 'italic', typography: 'body2' }} className="citationProvider">{ensureEndsWithDot(providerInfo.join(' '))}</Box>
      <Box sx={{ typography: 'body2' }} className="citationAccessed">{`Accessed ${new Date().toDateString()}.`}</Box>
      <Box sx={{ typography: 'body2' }} className="citationUrl">{ensureDoiUrl(doi)}</Box>
    </StyledCitationData>
  );
}

/**
 * MLA citation per DLC implementation
 */
export function MlaStyle(citationProps, classes) {
  const {
    collectionName, doi, format, nameForCitation, providers, repositoryName, textualDate, title,
  } = citationProps;

  const location = [];
  if (presentString(collectionName)) location.push(collectionName);
  if (presentString(repositoryName)) location.push(repositoryName);
  const providerInfo = [];
  if (presentString(providers[0])) providerInfo.push(providers[0]);
  if (presentString(ensureDoiUrl(doi))) providerInfo.push(ensureDoiUrl(doi));

  const { section } = classes;
  return (
    <StyledCitationData className={section}>
      <Box sx={{ typography: 'body2' }} className="citationName">{ensureEndsWithDot(nameForCitation)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationTitle">{ensureEndsWithDot(ensureQuoted(title))}</Box>
      <Box sx={{ typography: 'body2' }} className="citationDate">{ensureEndsWithDot(textualDate)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationFormat">{ensureEndsWithDot(format)}</Box>
      <Box sx={{ typography: 'body2' }} className="citationLocation">{ensureEndsWithDot(location.join(', '))}</Box>
      <Box sx={{ fontStyle: 'italic', typography: 'body2' }} className="citationProvider">{ensureEndsWithDot(providerInfo.join(', '))}</Box>
      <Box sx={{ typography: 'body2' }} className="citationAccessed">{`Accessed ${new Date().toDateString()}`}</Box>
    </StyledCitationData>
  );
}

export default {
  apa: ApaStyle,
  chicago: ChicagoStyle,
  mla: MlaStyle,
};
