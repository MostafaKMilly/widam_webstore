export type User = {
  token: string;
  user_id: string;
  user_name: string;
  email: string;
  mobile_no: string;
  profile_details: {
    first_name: string;
    last_name: string;
    customer_details: {
      customer_name: string;
      salutation: string;
      nationality: string;
    };
  };
};
