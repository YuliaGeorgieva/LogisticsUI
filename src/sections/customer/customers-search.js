import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ props }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder={props.placeholder}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
          sx={{cursor: 'pointer'}}
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon sx={{cursor: 'pointer'}} />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
