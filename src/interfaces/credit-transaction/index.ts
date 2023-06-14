import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface CreditTransactionInterface {
  id?: string;
  client_id: string;
  amount: number;
  transaction_date: any;
  transaction_type: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface CreditTransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
  transaction_type?: string;
}
