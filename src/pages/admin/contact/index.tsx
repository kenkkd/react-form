import { useEffect, useState } from 'react';
import {
  Paper,
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

const Contact = () => {
  // ダミーデータ
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);

  // useEffect(() => {
  //   getContacts().then((res) => {
  //     setContacts(res);
  //   });
  // }, []);

  return (
    <Layout>
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
    </Layout>
  );
};

export default Contact;
