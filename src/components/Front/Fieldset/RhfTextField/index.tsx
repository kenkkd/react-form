import { Box, Stack, TextField, Typography } from '@mui/material';
import { BaseFieldSet } from '../BaseFieldset';
import { useController, useFormContext } from 'react-hook-form';
import { FormSchema } from '~/pages';

export type RhfTextFieldProps = BaseFieldSet;

const RhfTextField = ({ label, name, ...props }: RhfTextFieldProps) => {
  const { control } = useFormContext<FormSchema<'text'>>();
  const { field } = useController({ control, name });
  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ width: 180, minWidth: 180 }}>
        <Typography>{label}</Typography>
      </Box>
      <TextField {...field} {...props} />
    </Stack>
  );
};

export default RhfTextField;
