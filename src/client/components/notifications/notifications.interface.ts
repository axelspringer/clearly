export enum NOTIFICATION_TYPE {
  INFO,
  WARN,
  ERROR,
};

export interface INotification {
  read: boolean;
  subject: string;
  message: string;
  type: NOTIFICATION_TYPE;
};

export type Notification = INotification;
