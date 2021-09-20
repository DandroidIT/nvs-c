
import { onMounted, ref, reactive, watch } from 'vue';
import { iAlarm, istate } from '../interfaces'
import NvsCS from '../ctrl.store/nvs.ctrl.store'
import CamsCS from '../ctrl.store/cams.ctrl.store'

import { helpers } from '../lib/helpers';
import { daysInMonth } from '../quasar_element'

const { listDateAlarms, listDateAlarmsString, listAlarmsDet, getAlarmsCount, getAlarmsDet, getAlarmDet } = NvsCS()
const { cams } = CamsCS()
export const mAlarms = (/* props: any, context: SetupContext */) => {

  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })
  const _listCams = reactive([{ label: 'All', value: '' }]);
  const _selectDay = ref('');
  const _selectCam = ref('');
  const _alarmDet = ref<iAlarm>()
  const _openDialog = ref(false)
  const filterDate = { start: '', end: '' }
  const _prevNextAlarm: string[] = []


  watch(_selectCam, async () => {
    await getAlarmsCount(_selectCam.value, filterDate)
    //listAlarmsDet.splice(0, listAlarmsDet.length)
    await getAlarmsDet(_selectCam.value, { start: _selectDay.value, end: '' })
  })


  onMounted(async () => {
    _selectDay.value = new Date().toISOString().split('T')[0]
    cams.list?.map((cam) => {
      _listCams.push({ label: cam.name, value: cam.id });
    });
    await getAlarmsCount()
    filterDate.start = new Date().toISOString().split('T')[0]
    await getAlarmsDet(_selectCam.value, filterDate)
  });

  const _clickDay = async (value: string, reason: string, details: { year: number, month: number, day: number }) => {
    if (reason === 'add-day') {
      _state.isawait = true
      filterDate.start = value
      await getAlarmsDet(_selectCam.value, filterDate)
      _state.isawait = false
    } else if (reason === 'remove-day') {
      listAlarmsDet.splice(0, listAlarmsDet.length)
    } else if (reason === 'month' || reason === 'year') {
      const lastday = daysInMonth(details.year, details.month, details.day)
      filterDate.start = `${value.split('-')[0]}-${value.split('-')[1]}-01`
      filterDate.end = `${value.split('-')[0]}-${value.split('-')[1]}-${lastday}`
      await getAlarmsCount(_selectCam.value, filterDate)
      await getAlarmsDet(_selectCam.value, { start: _selectDay.value, end: '' })
    }
  };

  const _viewDet = async (idalarm: any) => {
    _state.isawait = true
    _alarmDet.value = await getAlarmDet(idalarm)
    if (_alarmDet.value) {
      _alarmDet.value.stamptime = helpers.dataIsoTo(_alarmDet.value.stamptime, 'data&time');
      _prevNext()
      _openDialog.value = true
    }
    _state.isawait = false

  }

  const _prevNext = () => {
    _prevNextAlarm.splice(0, _prevNextAlarm.length)
    listAlarmsDet?.map((alarm, index) => {
      if (alarm.id === _alarmDet.value?.id) {
        _prevNextAlarm.push(listAlarmsDet[index - 1] ? listAlarmsDet[index - 1].id : 'end')
        _prevNextAlarm.push(listAlarmsDet[index + 1] ? listAlarmsDet[index + 1].id : 'end')
      }
    })
  }

  const _navigateAlarms = async (dir: 'left' | 'right') => {
    const idalarm = dir === 'left' ? _prevNextAlarm[0] : _prevNextAlarm[1];
    if (Number(idalarm))
      await _viewDet(idalarm)
    else
      _openDialog.value = false
  };

  return {
    state: _state, openDialog: _openDialog, selectDay: _selectDay,
    selectCam: _selectCam, listCams: _listCams, alarmDet: _alarmDet,
    AlarmsDetlist: listAlarmsDet,
    navigateAlarms: _navigateAlarms, viewDet: _viewDet,
    listDateAlarms, listDateAlarmsString, clickDay: _clickDay,
  }
}

export default mAlarms