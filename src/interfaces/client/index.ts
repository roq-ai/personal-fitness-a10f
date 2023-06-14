import { CreditTransactionInterface } from 'interfaces/credit-transaction';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  user_id: string;
  organization_id: string;
  credit_balance?: number;
  created_at?: any;
  updated_at?: any;
  credit_transaction?: CreditTransactionInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    credit_transaction?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
