
import { ref, reactive, onMounted, } from 'vue'
import { iaccount, istate } from '../interfaces'
import AuthCS from '../ctrl.store/auth.ctrl.store'
import nvsCS from '../ctrl.store/nvs.ctrl.store'
import { QNotify } from '../quasar_element'
const { state: stateAuth, userState, updateUser, } = AuthCS()
const { checkIpPublicBlock } = nvsCS()
const _ipPublicBlock = ref(false)
export const mSettings = ( /* props: any, context: SetupContext*/) => {
  const _userAccount = reactive<iaccount>({ newusername: '', password: '', newpassword: '', checknewpassword: '' })
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })

  const tabN = ref('options');
  const notifyAlarm = ref(false)//????

  onMounted(async () => {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion , @typescript-eslint/no-non-null-asserted-optional-chain */
    _userAccount.newusername = userState.user?.username!
    _state.isawait = true
    _ipPublicBlock.value = await checkIpPublicBlock(true)
    _state.isawait = false

  })

  const _isValidUserAccount = () => {
    _state.msgError = ''
    if ((_userAccount.newpassword !== _userAccount.checknewpassword)) {
      _state.msgError = 'password not match'
    } else if (_userAccount.password === _userAccount.newpassword) {
      _state.msgError = 'change the new password'
    }
    return _state.success = _state.msgError.length === 0 ? true : false
  }

  const _saveUser = async () => {
    if (_isValidUserAccount()) {
      _state.isawait = true
      await updateUser(_userAccount.password, _userAccount.newusername, _userAccount.newpassword)
      _state.success = stateAuth.success
      if (_state.success) {
        _userAccount.password = ''
        _userAccount.newpassword = ''
        _userAccount.checknewpassword = ''
        QNotify('User update!', 2000)
      } else {
        _state.msgError = stateAuth.msgError
      }
      _state.isawait = false
    }
  }

  const clickipPublicBlock = async () => {
    _state.isawait = true
    _ipPublicBlock.value = await checkIpPublicBlock()
    _state.isawait = false
  }

  return {
    state: _state, userAccount: _userAccount, tabN,
    ipPublicBlock: _ipPublicBlock, notifyAlarm,
    saveUser: _saveUser, clickipPublicBlock
  }
}

export default mSettings