import moment from 'moment';

const translate = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miercoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sabado',
  Sunday: 'Domingo',
};

export const shortTime = date => moment(date).format("HH:mm")

export const shortDate = date => {
  const m = moment(date);
  if (m.isBefore(moment().endOf('day'))) {
    return 'Hoy';
  }
  if (
    m.isBefore(
      moment()
        .add(1, 'day')
        .endOf('day'),
    )
  ) {
    return 'Mañana';
  }
  if (
    m.isBefore(
      moment()
        .add(6, 'day')
        .endOf('day'),
    )
  ) {
    return translate[m.format('dddd')];
  }
  return m.format('DD/MM');
};
