
import { useRouterCustom } from '../store/app.store'
import { userAuth } from '../store/auth.store'
import { istatus } from '../interfaces'
import { reactive, onMounted } from 'vue';
import { base } from '../setting';


const loginCtrl = () => {
  const status = reactive<istatus>({ isawait: false, success: false, error: '', msgcb: '' })
  const userForm = reactive({ username: '', password: '', ip: base.http })
  const { goToPage } = useRouterCustom()
  const { login, logout, userState } = userAuth()

  onMounted(() => {
    if (userState.isAuth && userState.isAuthWss) {
      goToPage()
    }


  })

  const sendlogin = async () => {
    try {
      if (!userForm.username || !userForm.password) {
        status.success = false;
        status.error = 'Input required';
      } else {
        status.isawait = true
        void await login(userForm.username, userForm.password)
        status.isawait = false
        status.success = userState.isAuth
        status.error = userState.error === undefined ? '' : userState.error
        goToPage()
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      status.error = `${error}`
      status.isawait = false
      status.success = false
    }
  }

  return {
    status,
    sendlogin,
    userForm,
    logout, userState
  }
}

export { loginCtrl }

