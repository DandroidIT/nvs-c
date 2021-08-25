import { reactive, readonly, watch } from 'vue';
import { useApiAxPost } from '../api/web.api'
import nvsService from '../api/nvs.api'
import { iauthState, iuser, irespUser, iaccount, istatus } from '../interfaces'
import apiWs from '../api/ws.api'
import { base } from '../setting'
import { LocalStorage } from 'quasar'
import { useRouterCustom } from './app.store'
import { helpQuasar } from '../lib/helpers';

const userState = reactive<iauthState>({ isAuth: false, user: undefined, isAuthWss: false })
const userAccount = reactive<iaccount>({ username: '', password: '', newpassword: '', checknewpassword: '' })
const _status = reactive<istatus>({ isawait: false, success: true, error: '', msgcb: '' })

watch(_status, (selection: istatus) => {
  if (!selection.isawait && selection.msgcb) {
    helpQuasar.Notify(selection.msgcb);
    selection.msgcb = ''
  }
});
export const userAuth = () => {
  const localStorage = LocalStorage
  const _useRouterCustom = useRouterCustom()

  const _checkWssConnect = async () => {
    try {
      if (userState.user) {
        const checkConn = await apiWs.connect(userState.user?.token)
        userState.isAuthWss = checkConn
      }
      else {
        userState.isAuthWss = false
      }
      return userState.isAuthWss
    } catch (error) {
      userState.isAuthWss = false
      return false
    }

  }

  const _getLocalUser = () => {
    try {
      const rawUser: string | null = localStorage.getItem(base.cookie_base)
      if (rawUser) {
        const u: iuser = JSON.parse(rawUser) as iuser
        userState.user = u
        userState.isAuth = true
        userAccount.username = userState.user.username
      } else {
        userState.isAuth = false
        userState.user = undefined
        userState.error = 'no user in local'
        userAccount.username = ''
        _useRouterCustom.goToPage('/', true)
      }


    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      userState.error = `${error}`
      userState.isAuth = false
      userState.user = undefined
    }
  }
  _getLocalUser()

  const login = async (username: string, password: string) => {
    try {
      const response_login = await useApiAxPost<irespUser>('/login', { username, password })
      if (response_login.success && response_login.data) {
        await setUser(response_login.data)
      } else {
        userState.error = response_login.error
        userState.isAuth = false
      }
    } catch (error) {
      userState.error = 'Login catch error'
      userState.isAuth = false
      userState.user = undefined
    }
  }

  const logout = async () => {
    try {
      const resp_logout = await useApiAxPost<boolean>('/logout', { token: userState.user?.token })
      if (resp_logout) {
        localStorage.remove(base.cookie_base)
        void _getLocalUser()

      }

    } catch (error) {

    }
  }

  const _isValidUserAccount = () => {
    _status.error = ''
    if ((userAccount.newpassword !== userAccount.checknewpassword)) {
      _status.error = 'password not match'
    } else if (userAccount.password === userAccount.newpassword) {
      _status.error = 'change the new password'
    }
    return _status.success = _status.error.length === 0 ? true : false
  }

  const updateUser = async () => {
    try {
      _status.isawait = true
      if (_isValidUserAccount()) {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain */
        const checkResponse = await nvsService.userUpdate(userState.user?.username!, userAccount.password, userAccount.username, userAccount.newpassword)
        if (checkResponse.inError === true) {
          _status.error = checkResponse.msg
          _status.success = false
        } else {
          _status.msgcb = checkResponse.msg
          userAccount.password = ''
          userAccount.newpassword = ''
          userAccount.checknewpassword = ''
          _status.success = true
        }
      }
    } catch (error) {
      _status.error = 'error catch update user'
      _status.success = false
    } finally {
      _status.isawait = false
    }



  }

  const setUser = async (data: iuser) => {
    localStorage.set(base.cookie_base, JSON.stringify(data))
    _getLocalUser()
    await _checkWssConnect()

  }

  return { updateUser, setUser, login, userState: readonly(userState), status: readonly(_status), userAccount, logout }
}