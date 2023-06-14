import * as yup from 'yup';

export const creditTransactionValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  transaction_date: yup.date().required(),
  transaction_type: yup.string().required(),
  client_id: yup.string().nullable().required(),
});
