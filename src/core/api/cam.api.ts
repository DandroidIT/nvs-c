
import { eCamsApiname, icam, icamProbe, inameCamOption, iresponseServer, tPhoto } from '../interfaces'
import apiWs from './ws.api'


class CamService {
  getCams(): Promise<iresponseServer<icam[]>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<icam[]>) => {
        res(data)
      }
      apiWs.bindAndsend({ name: eCamsApiname.Cam_List, cb: _cb })
    })

  }

  _objMove(idcam: string, direction: string, timeout = 100, presetN = '0'): string {
    if (direction === 'STOP') {
      return JSON.stringify({ type: eCamsApiname.Cam_Controll, payload: { tagcam: idcam, cmd: 'move_stop' } })
    }

    const ObjSendMove = {
      tagcam: idcam,
      speed: { x: '', y: '', z: '' },
      timeout: timeout,
      cmd: 'move',
      preset: presetN

    }
    const objMove = ObjSendMove
    if (direction === 'UP') {
      objMove.speed = { x: '0', y: '1.0', z: '0' } // 0,1.0
    } else if (direction === 'UPLEFT') {
      objMove.speed = { x: '-1.0', y: '1.0', z: '0' }
    } else if (direction === 'UPRIGHT') {
      objMove.speed = { x: '1.0', y: '1.0', z: '0' }
    } else if (direction === 'DOWN') {
      objMove.speed = { x: '0', y: '-1.0', z: '0' }
    } else if (direction === 'DOWNLEFT') {
      objMove.speed = { x: '-1.0', y: '-1.0', z: '0' }
    } else if (direction === 'DOWNRIGHT') {
      objMove.speed = { x: '1.0', y: '-1.0', z: '0' }
    } else if (direction === 'LEFT') {
      objMove.speed = { x: '-1.0', y: '0', z: '0' }
    } else if (direction === 'RIGHT') {
      objMove.speed = { x: '1.0', y: '0', z: '0' }
    } else if (direction === 'ZOOMIN') {
      objMove.speed = { x: '0', y: '0', z: '1.0' }
    } else if (direction === 'ZOOMOUT') {
      objMove.speed = { x: '0', y: '0', z: '-1.0' }
    } else if (direction === 'preset' || direction === 'save_preset') {
      objMove.speed = { x: '1', y: '1', z: '1' }
      objMove.cmd = direction
    }

    return JSON.stringify({ type: eCamsApiname.Cam_Controll, payload: objMove })
  }


  move(idcam: string, direction: string, presetN = '1', timeout = 100): Promise<iresponseServer<boolean>> {
    return new Promise((res) => {
      const _cb = (data: Promise<iresponseServer<boolean>>) => {
        res(data)
      }
      apiWs.bindAndsend({ name: eCamsApiname.Cam_Controll, cb: _cb },
        { name: eCamsApiname.Cam_Controll, msg: this._objMove(idcam, direction, timeout, presetN) })
    })


  }

  screenshot(idcam: string): Promise<iresponseServer<tPhoto>> {
    return new Promise((res) => {
      const _cb = (data: iresponseServer<tPhoto>) => {
        res(data)
      }
      const jsonData = JSON.stringify({ payload: { tagcam: idcam } })
      apiWs.bindAndsend({ name: eCamsApiname.Cam_Screenshot, cb: _cb }, { msg: jsonData })
    })
  }

  setOptionCam(idcam: string, cmdoption: inameCamOption, data: boolean, checkonly = false): Promise<iresponseServer<boolean>> {
    return new Promise((res) => {
      const jsonData = JSON.stringify({ payload: { tagcam: idcam, option: cmdoption, data, checkonly } })
      apiWs.bindAndsend({ name: eCamsApiname.Cam_Setoption, cb: (data: iresponseServer<boolean>) => { res(data) } }, { msg: jsonData })
    })
  }

  probeCams(): Promise<iresponseServer<icamProbe[]>> {

    return new Promise((res) => {
      const _cb = (data: iresponseServer<icamProbe[]>) => {
        res(data)
      }
      apiWs.bindAndsend({ name: eCamsApiname.radarCams, cb: _cb })
    })
  }

  saveProbeCam(cam: icamProbe): Promise<iresponseServer<boolean>> {
    return new Promise((res) => {
      const jsonData = JSON.stringify({ payload: { cam } })
      const _cb = (data: iresponseServer<boolean>) => {
        res(data)
      }
      apiWs.bindAndsend({ name: eCamsApiname.saveRadarCam, cb: _cb }, { msg: jsonData })
    })

  }


}

export default new CamService()