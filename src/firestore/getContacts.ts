import { getDocs, collection } from 'firebase/firestore';
import { db } from '~/firebase';
import { Collection } from '~/constants/firestore';

export const getContacts = async (): Promise<Contact[]> => {
  const res = await getDocs(collection(db, Collection.contacts)).then(
    (querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          companyName: doc.data().companyName,
        };
      });
    }
  );

  return res;
};
