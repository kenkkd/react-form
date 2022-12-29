import { useSnackbar as useNotistackSnackbar } from 'notistack';
export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const success = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  const error = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };

  return {
    success,
    error,
  };
};
