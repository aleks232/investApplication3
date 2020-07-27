import { Moment } from 'moment';
import { IPayments } from 'app/shared/model/payments.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrders {
  id?: number;
  startDate?: string;
  endDate?: string;
  price?: number;
  paymentType?: PaymentType;
  orderStatus?: OrderStatus;
  employeeId?: number;
  payments?: IPayments[];
  lotId?: number;
}

export const defaultValue: Readonly<IOrders> = {};
