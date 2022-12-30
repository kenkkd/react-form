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

const tableHeadCells = ['姓', '名', '会社名'];

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then((res) => {
      console.log(res);
      setContacts(res);
    });
  }, []);

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadCells.map((tableHeadCell) => (
                <TableCell>{tableHeadCell}</TableCell>
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
