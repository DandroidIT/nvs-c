

import { reactive, readonly, watch } from 'vue'
import { helpQuasar } from '../lib/helpers';
import CamService from '../api/cam.api'
import { icams, istatusCam, inameCamOption, icamProbe, iresponseServer, istatus } from '../interfaces'
import { base } from '../setting'

/*eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-var-requires*/
const Buffer = require('buffer').Buffer;
const _status = reactive<istatus>({ isawait: false, success: false, error: '', msgcb: '' })
const _cams = reactive<icams>({})

const _screenshots = reactive<Array<string>>([])
const _probeCams = reactive<icamProbe[]>([])

watch(_status, (selection: istatusCam) => {
  if (!selection.isawait && selection.msgcb) {
    helpQuasar.Notify(selection.msgcb);
    selection.msgcb = ''
  }
});


const load = async () => {
  _status.isawait = true
  if (!_cams.list?.length)
    _cams.list = await CamService.getCams()
  if (!_cams.list.length) {
    _status.msgcb = 'No cams list';
  } else {
    _status.msgcb = 'Cams load';
  }
  _status.success = true
  _status.isawait = false

}

const setupCams = async () => {
  _status.isawait = true
  _probeCams.splice(0, _probeCams.length)
  const resp = await CamService.probeCams()
  _status.isawait = false
  if (resp.inError === false) {
    _status.msgcb = 'Loading completed';
    resp.dataResult.map((c) => { _probeCams.push(c) })
    _status.success = true
  } else {
    _status.success = false
    _status.error = resp.msg
  }


}

const deleteCam = async (idcam: string) => {
  await setOptions(idcam, 'delete', true)
  if (_status.success) {
    _cams.list = []
    await load()
  }
}

const saveProbeCams = async (cam: icamProbe) => {
  if (!cam.name || !cam.username || !cam.password) {
    _status.error = 'All fields is required'
    _status.success = false
    return
  }
  _status.isawait = true

  const resp = await CamService.saveProbeCam(cam)
  if (resp.inError === false) {
    _status.msgcb = 'Save cam completed';
    _probeCams.map((camP) => {
      if (camP.urn === cam.urn)
        cam.exist = true
      _status.success = true
    })
    _cams.list = []
  } else {
    _status.error = resp.msg
    _status.success = false
  }
  _status.isawait = false
}

const getCam = (id: string) => {
  const c = _cams.list?.find(cam => { return cam?.id == id })
  if (c)
    return c
}

const urlwssCam = (id: string) => { return `${base.wss}/stream/${id}`; }

const move = async (id: string, direction: string, presetN?: string) => {
  _status.isawait = true
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const resp: iresponseServer<boolean> = await CamService.move(id, direction, presetN)
  if (resp.inError === false) {
    _status.success = true
  } else {
    _status.error = resp.msg
    _status.success = false
  }
  _status.isawait = false
}

const screenshot = async (id: string) => {
  _status.isawait = true
  const resp = await CamService.screenshot(id)
  if (resp.inError === false) {
    _status.msgcb = 'Screenshot completed';
    /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-plus-operands,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call*/
    const image = `data:image/jpg;base64, ${Buffer.from(resp.dataResult.data).toString('base64')}`
    _screenshots.push(image)
    _status.success = true
  } else {
    _status.error = resp.msg
    _status.success = false
  }
  _status.isawait = false
}
const setOptions = async (idcam: string, cmdoption: inameCamOption, data: boolean, checkonly = false) => {
  _status.isawait = true
  const resp = await CamService.setOptionCam(idcam, cmdoption, data, checkonly)
  if (resp.inError === false) {
    _status.msgcb = `Options: ${cmdoption} completed`;
    _status.success = true
  } else {
    _status.error = resp.msg
    _status.success = false
  }
  _status.isawait = false

}


export const useCamsManager = () => {

  return { screenshots: _screenshots, setupCams, load, getCam, screenshot, urlwssCam, cams: readonly(_cams), status: readonly(_status), probeCams: _probeCams, move, setOptions, saveProbeCams, deleteCam }
}