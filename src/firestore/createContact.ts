import { addDoc, collection } from 'firebase/firestore';
import { db } from '~/firebase';
import { Collection } from '~/constants/firestore';

export const createContact = async (params: CreateContactParams) => {
  const { firstName, lastName, companyName } = params;
  await addDoc(collection(db, Collection.contacts), {
    firstName,
    lastName,
    companyName,
  });
};
