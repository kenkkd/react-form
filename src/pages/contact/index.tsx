import React, { SyntheticEvent, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '~/firebase';
import { createContact } from '~/firestore/createContact';
import { useSnackbar } from '~/hooks/useSnackbar';

type FormInput = {
  lastName: string;
  firstName: string;
  companyName: string;
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Contact = () => {
  const snackbar = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen(!isOpen);

  const yupValidation = yup.object({
    lastName: yup.string().required('必須項目です'),
    firstName: yup.string().required('必須項目です'),
    companyName: yup.string().required('必須項目です'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    // 初期値の設定がしたいとき
    // defaultValues: {
    //   lastName: '山田',
    //   firstName: '太郎',
    //   companyName: 'ダミー会社',
    // },
    resolver: yupResolver(yupValidation),
  });

  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
    handleModal();
  };

  const onSubmit: SubmitHandler<FormInput> = (formInput) => {
    createContact(formInput)
      .then(() => {
        snackbar.success('送信しました。');
        reset();
      })
      .catch(() => {
        snackbar.error('送信中にエラーが発生しました。');
      });
  };

  // const getCollection = async () => {
  //   getDocs(collection(db, 'contacts')).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc);
  //     });
  //   });
  //   console.log('getCollection Response');
  //   // console.log(res);
  // };
  //
  // useEffect(() => {
  //   void getCollection();
  // }, []);

  return (
    <Container>
      <h2>フォーム</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Stack spacing={3}>
            <TextField
              id="filled-basic"
              label="姓"
              variant="filled"
              required
              {...register('lastName')}
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message}
            />
            <TextField
              id="filled-basic"
              label="名"
              variant="filled"
              {...register('firstName')}
              error={!!errors.firstName?.message}
              helperText={errors.firstName?.message}
            />
            <TextField
              id="filled-basic"
              label="会社名"
              variant="filled"
              {...register('companyName', { required: true })}
              error={!!errors.companyName?.message}
              helperText={errors.companyName?.message}
            />
            <Stack direction="row" spacing="auto">
              <Button color="inherit" variant="contained" onClick={handleModal}>
                クリア
              </Button>
              <Button type="submit" color="info" variant="contained">
                送信
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </form>
      <Modal
        open={isOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Stack>
              <Typography>入力値をクリアしますか？</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button color="inherit" variant="contained" onClick={handleModal}>
                キャンセル
              </Button>
              <Button color="info" variant="contained" onClick={onReset}>
                はい
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default Contact;
