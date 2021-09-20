
import { reactive, onMounted } from 'vue';
import { Router } from 'vue-router'
import { base } from '../setting';
import { istate } from '../interfaces'
import AuthCS from '../ctrl.store/auth.ctrl.store'

const { postLogin, userState } = AuthCS()
export const mlogin = (router: Router /* props: any, context: SetupContext */) => {
  const _router = router
  const _userForm = reactive({ username: '', password: '', ip: base.http })
  const _state = reactive<istate>({ isawait: false, success: true, msgError: '', msgSuccess: '' })

  onMounted(() => {
    if (userState.isAuth && userState.isAuthWss) {
      void _router.push({ path: '/' })
    }
  })

  const _ValidateForm = () => {
    if (!_userForm.username || !_userForm.password)
      return false

    return true
  }
  const _sendlogin = async () => {
    if (!_ValidateForm()) {
      _state.success = false
      _state.msgError = 'username or passoword is empty'
    } else {
      _state.isawait = true
      void await postLogin(_userForm.username, _userForm.password)
      _state.success = true
      _state.isawait = false
      void _router.push({ path: '/' })
    }


  }

  return { userForm: _userForm, sendlogin: _sendlogin, state: _state }
}

export default mlogin