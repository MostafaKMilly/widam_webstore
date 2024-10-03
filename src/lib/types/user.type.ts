export type User = {
  mobile_no: string;
  salutation: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  nationality: {
    country_id: string;
    country_name: string;
  };
};
