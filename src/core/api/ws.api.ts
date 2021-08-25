
import { websocket_wrapper } from '../lib/skt-wrapper'
import { base } from '../setting';


class apiWs {
  skt: websocket_wrapper = new websocket_wrapper()
  async connect(tokenAuth: string) {

    return new Promise<boolean>((res, rej) => {
      try {
        if (this.skt._isconnect) {
          res(true)
          return
        }
        this.skt.bind('connect', () => {
          res(true)
        })
        this.skt.connect(`${base.wss}/apievent`, tokenAuth)
          .catch((err) => { rej(err) }) //
      } catch (error) {
        console.log('apiWs connect error:', error)
        rej(false)
      }
    })
  }

  bindAndsend(bind: { name: string, cb: (data: any) => any }, send?: { name?: string, msg: any }) {
    this.skt.bind(bind.name, bind.cb)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (send === undefined) {
      send = { name: bind.name, msg: '' }
    }
    this.skt.send(send.name === undefined ? bind.name : send.name, send.msg)
  }


}

export default new apiWs()