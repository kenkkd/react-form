import * as yup from 'yup';
import { Paper, Grid, Box, TextField, Button, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '~/firebase';
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { useSnackbar } from '~/hooks/useSnackbar';
import { Link, useNavigate } from 'react-router-dom';

type FormInput = {
  email: string;
  password: string;
};

const yupValidation = yup.object({
  email: yup.string().required('必須項目です'),
  password: yup.string().required('必須項目です'),
});

const UserRegistration = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(yupValidation),
  });

  const onSubmit: SubmitHandler<FormInput> = (formInput) => {
    const { email, password } = formInput;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        snackbar.success('会員登録が完了しました。');
        navigate('/admin/login');
      })
      .catch((e) => {
        console.error(e);
        snackbar.error(
          '会員登録中にエラーが発生しました。もう一度やり直してください。'
        );
      });
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" mt={4} mb={1}>
          管理画面ユーザー登録
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3 }}
          >
            ユーザー登録
          </Button>
        </Box>
        <Link
          to="/admin/login"
          style={{ color: '#000000DE', marginBottom: 20 }}
        >
          ログイン
        </Link>
      </Box>
    </Grid>
  );
};

export default UserRegistration;
