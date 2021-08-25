
import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  computed,
} from 'vue';
import { useRoute } from 'vue-router';
import { icam } from '../interfaces'
import { userAuth } from '../store/auth.store';
import { useCamsManager } from '../store/cams.store';

import JSMpeg from '@cycjimmy/jsmpeg-player';
type camReact = {
  val?: icam
}
const id = ref('')
const _camsManager = useCamsManager();
const _player = ref({ destroy: () => undefined });
const _cam = reactive<camReact>({});
const _status = _camsManager.status
const _screenshots = _camsManager.screenshots

let _dectiveLoading = false

const loadPage = () => {
  const route = useRoute();
  id.value = route.params.id as string;
  _cam.val = _camsManager.getCam(id.value);
}

const clickMove = async (direction: string) => {
  if (direction === 'screenshot') {
    await _camsManager.screenshot(id.value);
  } else {
    _dectiveLoading = true;
    await _camsManager.move(id.value, direction);
    _dectiveLoading = false;
  }
};

const clickPresets = async (nameAction: string, n: string) => {
  await _camsManager.move(id.value, nameAction, n);
};

const changeSetting = async (type: string, dataVal: boolean) => {
  await _camsManager.setOptions(id.value, type, dataVal);
};

const isLoading = computed(() => {
  return _status.isawait && _dectiveLoading === false;
});
export const camCtrlPage = () => {
  onMounted(() => {
    const canvas: HTMLElement | null = document.getElementById('videostream');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    _player.value = new JSMpeg.Player(_camsManager.urlwssCam(id.value), {
      canvas: canvas,
      protocols: userAuth().userState.user?.token,
    });

  })

  onBeforeUnmount(() => {
    try {
      if (_player.value) {
        _player.value.destroy();
      }
    } catch (error) {
      console.log('error in camview beforeDestroy:', error);
    }
  });

  return {
    loadPage, clickMove, clickPresets, changeSetting,
    isLoading, status: _status, JSMpegPlayer: _player, cam: _cam, screenshots: _screenshots
  }
}


