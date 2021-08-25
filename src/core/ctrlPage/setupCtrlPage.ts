import { ref } from 'vue'
import { icamProbe } from '../interfaces';
import { useCamsManager } from '../store/cams.store';

const stepN = ref(1);
const _camsManager = useCamsManager();
const _status = _camsManager.status
const probeCams = _camsManager.probeCams

const clickProbe = async () => {
  await _camsManager.setupCams();
  if (probeCams.length) {
    _camsManager.probeCams = probeCams.sort((a, b) => {
      return a.exist === b.exist ? 0 : b ? -1 : 1;
    });
    navTabs();
  }
};
const navTabs = (direction: 'prev' | 'next' = 'next') => {
  if (direction === 'prev') {
    stepN.value--;
  } else {
    stepN.value++;
  }
};
const clickSave = async (cam: icamProbe) => {
  await _camsManager.saveProbeCams(cam)
}

export const setupCtrlPage = () => {
  return { stepN, probeCams, clickProbe, navTabs, clickSave, status: _status }
}