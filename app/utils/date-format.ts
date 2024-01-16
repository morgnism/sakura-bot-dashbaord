import { format } from 'date-fns';

export const nowDateFormat = format(new Date(), "'Today at' HH:mm a");
