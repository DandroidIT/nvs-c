//import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { userAuth } from '../core/store/auth.store';
import AuthCS from '../core/ctrl.store/auth.ctrl.store'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default (function (/* { store, ssrContext } */) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Router.beforeEach(async (to, from, next) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userState, isLogged } = AuthCS() //const userState = userAuth().userState
    //console.log('Router.beforeEach userState.isAuth:', userState.isAuth, 'userState.isAuthWss:', userState.isAuthWss);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      //console.log('check userState.isAuth:', userState.isAuth, 'userState.isAuthWss:', userState.isAuthWss);
      if (!await isLogged()) { //if (userState.isAuth === false || userState.isAuthWss === false) {
        //console.log('Router.beforeEach userState.isAuth:', userState.isAuth, 'userState.isAuthWss:', userState.isAuthWss);
        next({
          path: '/login',
        })
      } else {
        next()
      }
    } else {
      next()
    }
    /* next() */
  })
  return Router;
});
