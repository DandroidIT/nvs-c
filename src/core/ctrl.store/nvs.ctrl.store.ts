
import { reactive, ref } from 'vue'
import nvrApi from '../api/nvs.api'
import { iAlarm, iDayAndAlarmCount, istatectrl, nameOptionsNvs } from '../interfaces'


const _state = reactive<istatectrl>({ success: true, msgError: '', msgSuccess: '' })
const _listDateAlarms = reactive<iDayAndAlarmCount[]>([])
const _listDateAlarmsString = ref([''])
const _listAlarmsDet = reactive<iAlarm[]>([])


const _setOptions = async <T>(typeOption: nameOptionsNvs, data: string, checkOnly?: boolean) => {
  const checkresp = await nvrApi.setOptions<T>(typeOption, data, checkOnly)
  return checkresp
}

const _IpBlock = async (checkOnly = false) => {
  const iRespServer = await _setOptions<boolean>('ipblock', '', checkOnly)
  _state.success = iRespServer.dataResult
  if (!_state.success) {
    _state.msgError = 'error get Ip Block'
  }
  return _state.success
}


const _getAlarmsCount = async (idcam = '', filterDate = { start: '', end: '' }) => {
  const irespServer = await nvrApi.AlarmsCount(idcam, filterDate)
  if (!irespServer.inError) { //&& irespServer.dataResult.length
    _listDateAlarms.splice(0, _listDateAlarms.length)
    _listDateAlarmsString.value = []
    irespServer.dataResult.map(alarm => {
      _listDateAlarms.push(alarm)
      _listDateAlarmsString.value.push(
        alarm.stamptime.split('T')[0].split('-').join('/')
      )
    })
  }
}

const _getAlarmsDet = async (idcam = '', filterDate = { start: '', end: '' }) => {
  const irespServer = await nvrApi.AlarmsDet(idcam, filterDate)
  if (!irespServer.inError) {
    _listAlarmsDet.splice(0, _listAlarmsDet.length)
    irespServer.dataResult.map(alarmDet => {
      _listAlarmsDet.push(alarmDet)
    })
  }
}

const _getAlarmDet = async (idalarm: string) => {
  const irespServer = await nvrApi.AlarmDet(idalarm)
  if (!irespServer.inError) {
    return irespServer.dataResult
  }
}

const nvs_ctrl_store = () => {
  return {
    state: _state,
    listDateAlarms: _listDateAlarms,
    listAlarmsDet: _listAlarmsDet,
    listDateAlarmsString: _listDateAlarmsString,
    getAlarmsCount: _getAlarmsCount,
    getAlarmsDet: _getAlarmsDet,
    getAlarmDet: _getAlarmDet,
    checkIpPublicBlock: _IpBlock,
  }
}

export default nvs_ctrl_store