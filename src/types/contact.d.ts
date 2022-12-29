declare type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
};

declare type CreateContactParams = {
  firstName: string;
  lastName: string;
  companyName: string;
};

declare type CreateContactParams = Contact;
