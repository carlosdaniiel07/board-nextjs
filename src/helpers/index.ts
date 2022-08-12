import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br')

export const format = (date?: Date | string, format?: string): string => {
  return dayjs(date).format(format);
};

const helpers = {
  format,
};

export default helpers;
