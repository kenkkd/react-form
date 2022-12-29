import React from 'react';
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
  getContacts();

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
          <TableRow>
            <TableCell>yamada</TableCell>
            <TableCell>taro</TableCell>
          </TableRow>
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
