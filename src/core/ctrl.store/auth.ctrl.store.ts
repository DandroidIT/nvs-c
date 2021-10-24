// conotroller + store

import { reactive, } from 'vue';

import { iauthState, iuser, irespUser, istatectrl } from '../interfaces'
import nvsService from '../api/nvs.api'
import { useApiAxPost } from '../api/web.api'
import { LocalStorage } from 'quasar'
import { base } from '../setting'
import apiWs from '../api/ws.api'

const _userState = reactive<iauthState>({ isAuth: false, user: undefined, isAuthWss: false })
const _state = reactive<istatectrl>({ success: true, msgError: '', msgSuccess: '' })

const LS = LocalStorage

const _getWssConnect = async () => {
  try {
    if (_userState.user) {
      const checkConn = await apiWs.connect(_userState.user?.token)
      _userState.isAuthWss = checkConn
    }
    else {
      _userState.isAuthWss = false
    }
    return _userState.isAuthWss
  } catch (error) {
    _userState.isAuthWss = false
    return false
  }

}

const _checkAuth = async (userData?: iuser) => {
  if (userData) {
    LS.set(base.cookie_base, JSON.stringify(userData))
  }
  const rawUser: string | null = LS.getItem(base.cookie_base)
  if (rawUser) {
    const u: iuser = JSON.parse(rawUser) as iuser
    _userState.user = u
    _userState.isAuth = true
    const loginWss = await _getWssConnect()
    if (!loginWss) {
      _userDestroy()
    }
  } else {
    _userDestroy()
    _userState.error = 'no user in local'

  }
}

const _userDestroy = () => {
  LS.remove(base.cookie_base)
  _userState.isAuth = false
  _userState.isAuthWss = false
  _userState.user = undefined
  apiWs.disconnect() //_wssClose()
}

//void _checkAuth()
export const ctrl_store_Auth = () => {

  const _isLogged = async () => {
    await _checkAuth()
    return _userState.isAuth && _userState.isAuthWss ? true : false
  }

  const _updateUser = async (password: string, newUsername: string, newPassword: string) => {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain */
      const resp = await nvsService.userUpdate(_userState.user?.username!, password, newUsername, newPassword)
      if (resp.inError) {
        _state.msgError = resp.msg
      }
      _state.success = resp.dataResult
    } catch (error) {
      _state.msgError = 'error catch update user'
      _state.success = false
    }
  }

  const _postLogin = async (username: string, password: string) => {
    try {
      const response_login = await useApiAxPost<irespUser>('/login', { username, password })
      if (response_login.success && response_login.data) {
        await _checkAuth(response_login.data)
      } else {
        _userState.error = response_login.error
        _userState.isAuth = false
      }
    } catch (error) {
      _userState.error = 'Login catch error'
      _userState.isAuth = false
      _userState.user = undefined
    }
  }

  const _postLogout = async () => {
    try {
      await useApiAxPost<boolean>('/logout', { token: _userState.user?.token })
      _userDestroy()
    } catch (error) {

    }
  }
  return {
    state: _state,
    userState: _userState,
    postLogin: _postLogin,
    postLogout: _postLogout,
    updateUser: _updateUser, isLogged: _isLogged
  }
}

export default ctrl_store_Auth