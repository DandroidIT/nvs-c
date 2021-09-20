


import { reactive, ref, onMounted, onBeforeUnmount, readonly, computed } from 'vue';

import { istate, icam } from '../interfaces';
import CamsCS from '../ctrl.store/cams.ctrl.store'
import AuthCS from '../ctrl.store/auth.ctrl.store'
import { QNotify } from '../quasar_element'
import { useRoute } from 'vue-router';
import JSMpeg from '@cycjimmy/jsmpeg-player';

type camReact = {
  val?: icam
}

const { userState } = AuthCS()
const { state: stateCamsCS, screenshots, getCam, urlplayer, getScreenshot, panMove, setOptions } = CamsCS()


export const mCams = ( /* router?: Router -  props: any, context: SetupContext */) => {
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })
  const _cam = reactive<camReact>({}) //reactive<{ value?: icam }>({ });
  const _player = reactive({ val: { destroy: () => undefined, volume: 10 } });
  const id = ref('')
  const _tab = ref('home');
  /* const _setup = () => {} */

  const _loadPlayer = (id: string) => { // prototype - passare in componenete
    const canvas: HTMLElement | null = document.getElementById('videostream');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    _player.val = new JSMpeg.Player(urlplayer(id), {
      canvas: canvas,
      protocols: userState.user?.token,
    });
    _player.val.volume = 10
  }


  onMounted(() => {
    const route = useRoute();
    id.value = route.params.id as string;
    _cam.val = getCam(id.value)
    _loadPlayer(id.value)
  })

  onBeforeUnmount(() => {
    try {
      if (_player) {
        _player.val.destroy();
      }
    } catch (error) {
      console.log('error in camview beforeDestroy:', error);
    }
  });


  const clickMove = async (direction: string, presetN?: string) => {
    if (direction === 'screenshot') {
      _state.isawait = true
      await getScreenshot(id.value)
      _state.isawait = false
    } else {
      await panMove(id.value, direction, presetN);
    }
  };

  const changeSetting = async (cmdoption: string, setdata: boolean) => {
    _state.isawait = true
    await setOptions(id.value, cmdoption, setdata)
    _state.success = stateCamsCS.success
    if (_state.success) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      QNotify(`${cmdoption} set: ${setdata} ok!`)
    } else {
      _state.msgError = stateCamsCS.msgError
    }
    _state.isawait = false
  }
  return { /* setup: _setup, */
    state: readonly(_state), tab: _tab,
    JSMpegPlayer: computed(() => _player.val),
    screenshots, cam: computed(() => _cam.val),
    getScreenshot, clickMove, changeSetting
  }

}

export default mCams