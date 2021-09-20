
import { ref, reactive, onMounted } from 'vue'
import { icamProbe, istate } from '../interfaces'
import CamsWCS from '../ctrl.store/cams.wizard.ctrl.store'
import { QNotify } from '../quasar_element'

const { state: stateCamsWCS, probeCams, radarProbeCams, saveProbeCam } = CamsWCS()
export const mSetup = ( /* props: any, context: SetupContext */) => {
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })
  const _stepN = ref(1);

  onMounted(() => { probeCams.splice(0, probeCams.length) })

  const _navTabs = (direction: 'prev' | 'next' = 'next') => {
    if (direction === 'prev') {
      _stepN.value--;
    } else {
      _stepN.value++;
    }
  };

  const _startRadar = async () => {
    _state.isawait = true
    await radarProbeCams()
    _state.success = stateCamsWCS.success
    if (_state.success) {
      QNotify('Radar stop!')
      probeCams.sort((a, b) => {
        return a.exist === b.exist ? 0 : b ? -1 : 1;
      });
      _navTabs()
    } else {
      _state.msgError = stateCamsWCS.msgError
    }
    _state.isawait = false
  }

  const _saveCamProbe = async (cam: icamProbe) => {
    _state.isawait = true
    await saveProbeCam(cam)
    _state.success = stateCamsWCS.success
    if (_state.success) {
      QNotify(`${cam.name} save!`)
    } else {
      _state.msgError = stateCamsWCS.msgError
    }
    _state.isawait = false
  }



  return { state: _state, stepN: _stepN, probeCams, navTabs: _navTabs, startRadar: _startRadar, saveCamProbe: _saveCamProbe }
}

export default mSetup


