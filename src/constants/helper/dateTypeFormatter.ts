import moment from 'moment';

export default function dateTypeFormatter(myDate) {
  const sameDayDate = 'Today';
  const lastDayDate = 'Yesterday';
  const nextDayDate = 'Tomorrow';
  return moment(myDate).calendar(null, {
    sameDay: `[${sameDayDate}]`,
    nextDay: `[${nextDayDate}]`,
    lastDay: `[${lastDayDate}]`,
    lastWeek: 'D MMMM',
    nextWeek: 'D MMMM',
    sameElse: 'D MMMM',
  });
}
