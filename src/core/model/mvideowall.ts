import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import AuthCS from '../ctrl.store/auth.ctrl.store';
import CamsCS from '../ctrl.store/cams.ctrl.store'
import { istate, icam } from '../interfaces';
import JSMpeg from '@cycjimmy/jsmpeg-player';

export const mVideoWall = ( /* props: any, context: SetupContext */) => {
  const { userState } = AuthCS();
  const { cams, urlplayer, getScreenshot, panMove } = CamsCS()
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })
  const _players = reactive([{ val: { destroy: () => undefined, volume: 10, } }]);
  const _listCanvas = ref([])
  const _cam = ref<icam>()
  const _selection = ref('')


  onMounted(() => {
    _state.isawait = true
    _initPlayer()
    _state.isawait = false
  })

  const _initPlayer = () => {

    cams.list?.map((cam) => {
      const canvas: HTMLElement | null = document.getElementById(`canvas${cam.id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const player = new JSMpeg.Player(urlplayer(cam.id), { canvas: canvas, protocols: userState.user?.token });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      _players.push({ val: player })
    })
  }

  const _setCam = (cam: icam) => {
    _cam.value = cam
    _selection.value = cam.id
  }

  const _clickMove = async (direction: string, presetN?: string) => {
    if (_cam.value) {
      if (direction === 'screenshot') {
        _state.isawait = true
        await getScreenshot(_cam.value.id)
        _state.isawait = false
      } else {
        await panMove(_cam.value.id, direction, presetN);
      }
    }
  };

  onBeforeUnmount(() => {
    try {
      _players.forEach(player => {
        player.val.destroy()
      })
    } catch (error) {
      console.log('error in camview beforeDestroy:', error);
    }
  })

  return {
    state: _state, selection: _selection,
    cam: computed(() => _cam), cams, listCanvas: _listCanvas,
    setCam: _setCam, clickMove: _clickMove,
  }
}
export default mVideoWall
