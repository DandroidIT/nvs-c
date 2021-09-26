


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
  let canvas: HTMLCanvasElement | null
  let videocam: HTMLVideoElement | null
  /* const _setup = () => {} */

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

  const _loadPlayer = (id: string) => {
    canvas = document.getElementById('videostream') as HTMLCanvasElement;
    videocam = document.getElementById('videocam') as HTMLVideoElement;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    _player.val = new JSMpeg.Player(urlplayer(id), {
      canvas: canvas,
      protocols: userState.user?.token,
      onSourceEstablished: (/* source: any */) => {
        _initHtmlVideo()
      },
      /* onStalled: (player: any) => {}, */
      /* onSourceCompleted: (source: any) => {}, */
    })
    _player.val.volume = 10
  }


  const _initHtmlVideo = () => {
    try {
      if (canvas) {
        /*   const ctx = canvas.getContext('experimental-webgl')*/
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
        const stream = canvas.captureStream()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (videocam) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          videocam.srcObject = stream
          canvas.style.display = 'none'
          canvas.remove()
        }
      }
    } catch (error) {

    }


  }

  const _clickPiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await document.exitPictureInPicture()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await videocam?.requestPictureInPicture()
      }
    } catch (error) {
      QNotify('Picture-in-Picture Web API is not supported')
    }
  }

  const _volume = () => {
    _player.val.volume = _player.val.volume === 0 ? 10 : 0

  }



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
    getScreenshot, clickMove, changeSetting,
    clickPiP: _clickPiP, volume: _volume,
  }

}

export default mCams