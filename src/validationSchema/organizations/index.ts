import * as yup from 'yup';
import { clientValidationSchema } from 'validationSchema/clients';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  client: yup.array().of(clientValidationSchema),
});
