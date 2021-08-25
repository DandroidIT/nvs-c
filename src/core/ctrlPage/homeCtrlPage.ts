import {
  onMounted,
} from 'vue';
import { useCamsManager } from '../store/cams.store';

import { useRouter, Router } from 'vue-router';
const _camsManager = useCamsManager();
const _status = _camsManager.status
const _listCams = _camsManager.cams
let router: Router

const clickgotoCam = (id: string) => {
  void router.push({ path: `/cam/${id}` })
};
const clickDeleteCam = async (id: string) => {
  await _camsManager.deleteCam(id)
}
export const homeCtrlPage = () => {
  onMounted(async () => {
    router = useRouter()
    await _camsManager.load();
  })

  return {
    clickgotoCam,
    clickDeleteCam,
    cams: _listCams,
    status: _status
  }
}