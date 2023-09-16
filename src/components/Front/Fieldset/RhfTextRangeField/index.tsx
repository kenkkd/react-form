import { Box, Stack, TextField, Typography } from '@mui/material';
import { BaseFieldSet } from '../BaseFieldset';
import { useController, useFormContext } from 'react-hook-form';
import { FormSchema } from '~/pages';

export type RhfTextFieldProps = BaseFieldSet & {
  start: { name: string };
  end: { name: string };
};

const RhfTextRangeField = ({
  start,
  end,
  label,
  name,
  ...props
}: RhfTextFieldProps) => {
  const { control } = useFormContext<FormSchema<'text'>>();
  const { field: startField } = useController({ control, name: start.name });
  const { field: endField } = useController({ control, name: end.name });

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ width: 180, minWidth: 180 }}>
        <Typography>{label}</Typography>
      </Box>
      <TextField {...startField} {...props} />
      <Typography>〜</Typography>
      <TextField {...endField} {...props} />
    </Stack>
  );
};

export default RhfTextRangeField;
