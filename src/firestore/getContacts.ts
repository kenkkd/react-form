import { getDocs, collection } from 'firebase/firestore';
import { db } from '~/firebase';
import { Collection } from '~/constants/firestore';

export const getContacts = async () => {
  const res = await getDocs(collection(db, Collection.contacts)).then(
    (querySnapshot) => {
      console.log(querySnapshot.size);
      console.log(querySnapshot.empty);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        console.log(doc.exists());
      });
    }
  );
  console.log(res);
};
