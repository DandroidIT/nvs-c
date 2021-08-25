
import { reactive, ref } from 'vue'
import nvrApi from '../api/nvs.api'
import { istatus, nameOptionsNvs } from '../interfaces'

const _status = reactive<istatus>({ isawait: false, success: false, error: '', msgcb: '' })
const _ipPublicBlock = ref(false)
const _notifyAlarm = ref(false)

const _setOptions = async <T>(typeOption: nameOptionsNvs, data: string, checkOnly?: boolean) => {
  const checkresp = await nvrApi.setOptions<T>(typeOption, data, checkOnly)
  return checkresp
}

const _IpBlock = async (checkOnly = false) => {
  const iRespServer = await _setOptions<boolean>('ipblock', '', checkOnly)
  if (iRespServer.inError === false) {
    _ipPublicBlock.value = iRespServer.dataResult
    _status.msgcb = ''
    _status.success = true
  } else {
    _status.error = 'error get Ip Block'
    _status.success = false
  }
}

void _IpBlock(true)

export const nvsManager = () => {
  return { ipPublicBlock: _ipPublicBlock, getIpBlock: _IpBlock, notifyAlarm: _notifyAlarm }
}