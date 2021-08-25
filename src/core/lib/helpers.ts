class helpers {
  static dataIsoTo(dataVal: string, format: 'data' | 'time' | 'data&time') {
    if (format === 'data') {
      return dataVal.split('T')[0]
    } else if (format === 'time') {
      return dataVal.split('T')[1].replace('Z', '')
    } else if (format === 'data&time') {
      return `${dataVal.split('T')[0]} ${dataVal.split('T')[1].replace('Z', '')}`
    }
  }

  static waitFor(delay: number) { return new Promise(resolve => setTimeout(resolve, delay)) };
}

import { Notify } from 'quasar'
class helpQuasar {
  static Notify(msg: string) {
    if (!msg)
      return
    Notify.create({
      icon: 'mdi-information-variant',
      progress: true,
      message: msg,
      position: 'top',
      timeout: 1500,
      textColor: 'white',
      color: '',
      actions: [{ icon: 'close', color: 'white' }]
    })
  }
}


export { helpers, helpQuasar }