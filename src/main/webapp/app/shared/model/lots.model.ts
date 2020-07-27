import { Moment } from 'moment';
import { IMessages } from 'app/shared/model/messages.model';
import { IOrders } from 'app/shared/model/orders.model';
import { IPackages } from 'app/shared/model/packages.model';

export interface ILots {
  id?: number;
  description?: string;
  minPrice?: number;
  startDate?: string;
  endDate?: string;
  messages?: IMessages[];
  orders?: IOrders[];
  packages?: IPackages[];
}

export const defaultValue: Readonly<ILots> = {};
