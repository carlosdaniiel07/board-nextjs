import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export const format = (date?: Date | string, format?: string): string => {
  return dayjs(date).format(format);
};

export const scrollToTop = (): void => {
  if (!window) {
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const helpers = {
  format,
  scrollToTop,
};

export default helpers;
