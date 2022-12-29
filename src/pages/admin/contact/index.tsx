import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableContext from '@mui/material/Table/TableContext';
import { getContacts } from '~/firestore/getContacts';

const Contact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then((res) => {
      console.log(res);
      setContacts(res);
    });
  }),
    [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>姓</TableCell>
            <TableCell>名</TableCell>
            <TableCell>会社名</TableCell>
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
    // <Drawer variant="permanent" open={true}>
    //   <List>
    //     <ListItem>
    //       <ListItemButton>aaa</ListItemButton>
    //     </ListItem>
    //   </List>
    // </Drawer>
  );
};

export default Contact;
