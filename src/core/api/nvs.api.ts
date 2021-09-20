
import { eNvsApiname, iresponseServer, nameOptionsNvs, ialarmMethod, iDayAndAlarmCount, iAlarm } from '../interfaces'
import apiWs from './ws.api'
class nvsService {
  userUpdate(username: string, password: string, newUsername: string, newPassword: string): Promise<iresponseServer<boolean>> {
    return new Promise((res) => {
      const jsonData = JSON.stringify({
        payload: {
          username: username, password: password,
          newUsername: newUsername,
          newPassword: newPassword
        }
      })
      const _cb = (data: iresponseServer<boolean>) => {
        res(data)
      }
      apiWs.bindAndsend({ name: eNvsApiname.user_update, cb: _cb }, { msg: jsonData })
    })
  }

  setOptions<T>(typeOption: nameOptionsNvs, data: string, checkOnly = false): Promise<iresponseServer<T>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<T>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ type: eNvsApiname.set_options, payload: { typeOption, data, checkOnly } })
      apiWs.bindAndsend({ name: eNvsApiname.set_options, cb: _cb }, { msg: jsonData })
    })
  }


  AlarmsCount(idcam = '', filterDate = { start: '', end: '' }): Promise<iresponseServer<iDayAndAlarmCount[]>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<iDayAndAlarmCount[]>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ type: eNvsApiname.alarms_count, payload: { tagcam: idcam, dataFilter: filterDate } })
      apiWs.bindAndsend({ name: eNvsApiname.alarms_count, cb: _cb }, { msg: jsonData })
    })
  }

  AlarmsDet(idcam = '', filterDate = { start: '', end: '' }): Promise<iresponseServer<iAlarm[]>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<iAlarm[]>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ type: eNvsApiname.alarms_det, payload: { tagcam: idcam, dataFilter: filterDate } })
      apiWs.bindAndsend({ name: eNvsApiname.alarms_det, cb: _cb }, { msg: jsonData })
    })
  }

  AlarmDet(idalarm: string): Promise<iresponseServer<iAlarm>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<iAlarm>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ type: eNvsApiname.alarm_det, payload: { idalarm } })
      apiWs.bindAndsend({ name: eNvsApiname.alarm_det, cb: _cb }, { msg: jsonData })
    })
  }
  managerAlarms<T>(typeMethod: ialarmMethod, idcam = ''): Promise<iresponseServer<T>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<T>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ type: eNvsApiname.manager_alarms, payload: { typeMethod, tagcam: idcam } })
      apiWs.bindAndsend({ name: eNvsApiname.manager_alarms, cb: _cb }, { msg: jsonData })
    })
  }
}

export default new nvsService()