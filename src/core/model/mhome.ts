

import { reactive, onMounted, watch, readonly } from 'vue';
import { Router } from 'vue-router'
import { istate } from '../interfaces';
import CamsCS from '../ctrl.store/cams.ctrl.store'
import { QNotify } from '../quasar_element'

const { state: stateCS, cams, getCams, deleteCam } = CamsCS()
export const mHome = (router: Router /* props: any, context: SetupContext */) => {
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })

  watch(_state, (selection: istate) => {
    if (!selection.isawait && selection.msgSuccess) {
      QNotify(selection.msgSuccess);
      selection.msgSuccess = ''
    }
  });

  onMounted(async () => {
    _state.isawait = true
    await getCams()
    if (!stateCS.success)
      _state.msgError = stateCS.msgError
    else
      _state.msgSuccess = 'Cams load'

    _state.success = stateCS.success
    _state.isawait = false
  })

  const clickgotoCam = (id: string) => {
    void router.push({ path: `/cam/${id}` })
  };

  const clickDeleteCam = async (id: string) => {
    _state.isawait = true
    await deleteCam(id)
    _state.success = stateCS.success
    _state.isawait = false
  }
  return {
    state: readonly(_state),
    cams: cams,
    clickgotoCam,
    clickDeleteCam,
  }
}

export default mHome