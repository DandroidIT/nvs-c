export interface iuser {
  username: string
  //password: string
  token: string
}

export interface iauthState {
  user?: iuser
  isAuth: boolean
  isAuthWss: boolean
  error?: string
}

export type istatusCam = {
  isawait: boolean
  success: boolean
  error: string
  msgcb: any
}
export type istatus = {
  isawait: boolean
  success: boolean
  error: string
  msgcb: any
}

export type iresponseServer<T> = { inError: boolean; msg: string; dataResult: T }

export type irespUser = { success: boolean, data?: iuser, error?: string }

export type icam = {
  id?: string; information?: [string, any][], name?: string; asPTZ?: boolean; inerror?: boolean,
  liveH24?: boolean, motion?: boolean, icon?: string, color?: string, color2?: string //arrAllarm: string[],
}
export type icamProbe = { urn: string; name: string; xaddrs: string[]; username: string; password: string, exist: boolean }

export type icams = { list?: Array<icam>, cam?: icam }

export type inameCamOption = 'live24' | 'livemotion' | 'delete' | 'altro' | string

export type nameOptionsNvs = 'ipblock' | 'other';

export type iaccount = { username: string, password: string, newpassword: string, checknewpassword: string }


export enum eNvsApiname {
  user_update = 'userupdate',
  set_options = 'set_options'
}

export enum eCamsApiname {
  Cam_List = 'camlist',
  Cam_Controll = 'camcontroll',
  Cam_Screenshot = 'camscreenshot',
  Cam_Setoption = 'setcamoption',
  MANAGER_ALARMS = 'manageralarms',
  radarCams = 'radarcams',
  saveRadarCam = 'saveradarcam',
}
export type tPhoto = { type: string, data: any }
