import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCreditTransactionById, updateCreditTransactionById } from 'apiSdk/credit-transactions';
import { Error } from 'components/error';
import { creditTransactionValidationSchema } from 'validationSchema/credit-transactions';
import { CreditTransactionInterface } from 'interfaces/credit-transaction';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClientInterface } from 'interfaces/client';
import { getClients } from 'apiSdk/clients';

function CreditTransactionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CreditTransactionInterface>(
    () => (id ? `/credit-transactions/${id}` : null),
    () => getCreditTransactionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CreditTransactionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCreditTransactionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/credit-transactions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CreditTransactionInterface>({
    initialValues: data,
    validationSchema: creditTransactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Credit Transaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="amount" mb="4" isInvalid={!!formik.errors?.amount}>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                name="amount"
                value={formik.values?.amount}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.amount && <FormErrorMessage>{formik.errors?.amount}</FormErrorMessage>}
            </FormControl>
            <FormControl id="transaction_date" mb="4">
              <FormLabel>Transaction Date</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.transaction_date ? new Date(formik.values?.transaction_date) : null}
                  onChange={(value: Date) => formik.setFieldValue('transaction_date', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="transaction_type" mb="4" isInvalid={!!formik.errors?.transaction_type}>
              <FormLabel>Transaction Type</FormLabel>
              <Input
                type="text"
                name="transaction_type"
                value={formik.values?.transaction_type}
                onChange={formik.handleChange}
              />
              {formik.errors.transaction_type && <FormErrorMessage>{formik.errors?.transaction_type}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ClientInterface>
              formik={formik}
              name={'client_id'}
              label={'Select Client'}
              placeholder={'Select Client'}
              fetcher={getClients}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.credit_balance}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'credit_transaction',
  operation: AccessOperationEnum.UPDATE,
})(CreditTransactionEditPage);
