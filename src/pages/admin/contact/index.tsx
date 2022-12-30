import { useEffect, useState } from 'react';
import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Layout from '~/components/Admin/Layout';
import { getContacts } from '~/firestore/getContacts';
import { v4 as uuidv4 } from 'uuid';

const tableHeadCells = ['姓', '名', '会社名'];

// ダミーデータ
const dummyContacts: Contact[] = [];
for (let i = 1; i < 100; i++) {
  dummyContacts.push({
    id: uuidv4(),
    lastName: `Dummy-${i}`,
    firstName: `Testaro-${i}`,
    companyName: `Company-${i}`,
  });
}

// 1ページに表示する件数
const limit = 10;

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);

  // ダミーデータをページネーション用に加工
  const getPaginateContacts = (page: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return [...dummyContacts.slice(start, end)];
  };

  // useEffect(() => {
  //   getContacts().then((res) => {
  //     setContacts(res);
  //   });
  // }, []);

  useEffect(() => {
    setContacts(getPaginateContacts(page));
  }, [page]);

  return (
    <Layout>
      <Stack mt={2} spacing={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeadCells.map((tableHeadCell, key) => (
                  <TableCell key={key}>{tableHeadCell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.companyName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={contacts.length}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(_, page) => setPage(page)}
          page={page}
        />
      </Stack>
    </Layout>
  );
};

export default Contact;
