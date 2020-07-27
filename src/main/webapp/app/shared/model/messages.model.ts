import { Moment } from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface IMessages {
  id?: number;
  message?: string;
  notificationType?: NotificationType;
  createDate?: string;
  confirmDate?: string;
  employeeId?: number;
  lotId?: number;
}

export const defaultValue: Readonly<IMessages> = {};
