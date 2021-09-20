import { Notify, date } from 'quasar'
export const QNotify = (msg: string, timeout = 1500) => {
  if (!msg)
    return
  Notify.create({
    icon: 'mdi-information-variant',
    progress: true,
    message: msg,
    position: 'top',
    timeout: timeout,
    textColor: 'white',
    color: '',
    actions: [{ icon: 'close', color: 'white' }]
  })
}

export const daysInMonth = (year: number, month: number, day: number) => {
  const newDate = new Date(year, month - 1, day)
  return date.daysInMonth(newDate)
}