
import { eNvsApiname, iresponseServer, nameOptionsNvs } from '../interfaces'
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

}

export default new nvsService()