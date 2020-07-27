import { Moment } from 'moment';

export interface IPayments {
  id?: number;
  sendDate?: string;
  paymentDate?: string;
  price?: number;
  employeeId?: number;
  orderId?: number;
}

export const defaultValue: Readonly<IPayments> = {};
