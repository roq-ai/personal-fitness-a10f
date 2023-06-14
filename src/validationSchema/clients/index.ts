import * as yup from 'yup';
import { creditTransactionValidationSchema } from 'validationSchema/credit-transactions';

export const clientValidationSchema = yup.object().shape({
  credit_balance: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
  credit_transaction: yup.array().of(creditTransactionValidationSchema),
});
