import moment from 'moment';

// moment.locale('ru');

export const timeFormat = 'HH:mm [at] DD/MM/YYYY';
export const timeFormatWSec = 'HH:mm:ss [at] DD/MM/YYYY';
export const timeEventFormat = 'HH:mm [at] DD/MM';

export const timeEventFormatter = (time: string) =>
  moment(time).local().format(timeEventFormat);

export default function (time, format): string {
  return moment(time).format(format || timeFormat);
}
