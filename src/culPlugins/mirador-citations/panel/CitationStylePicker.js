import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

/**
 * Provide a citation style picker
 */
export function CitationStylePicker({
  availableCitationStyles = ['apa', 'chicago', 'mla'],
  citationStyle = 'mla',
  setCitationStyle = undefined,
}) {
  if (!setCitationStyle || availableCitationStyles.length < 2) return null;
  return (
    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
      <Select
        MenuProps={{
          anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
          },
        }}
        displayEmpty
        value={citationStyle}
        onChange={(e) => { setCitationStyle(e.target.value); }}
        name="citationStyle"
      >
        {
          availableCitationStyles.map(l => (
            <MenuItem key={l} value={l}><Typography variant="body2">{ l }</Typography></MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

CitationStylePicker.propTypes = {
  availableCitationStyles: PropTypes.arrayOf(PropTypes.string),
  citationStyle: PropTypes.string,
  setCitationStyle: PropTypes.func,
};
