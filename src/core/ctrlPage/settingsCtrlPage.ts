import { ref, onMounted } from 'vue'
import { nvsManager } from '../store/nvs.store'
import { userAuth } from '../store/auth.store'


const tabN = ref('options');

const _userAuthManager = userAuth()
const _nvsManager = nvsManager()
const _userAccount = _userAuthManager.userAccount
const _userAuthStatus = _userAuthManager.status

const _getIpBlock = _nvsManager.getIpBlock

const cSaveUser = () => {
  void _userAuthManager.updateUser()
}

export const settingsCtrlPage = () => {
  onMounted(() => {
    void _getIpBlock(true)
  })
  return {
    tabN, blockIpPublic: _nvsManager.ipPublicBlock, notifyAlarm: _nvsManager.notifyAlarm, getIpBlock: _getIpBlock,
    account: _userAccount, clickSaveUser: cSaveUser, userAuthStatus: _userAuthStatus
  }
}