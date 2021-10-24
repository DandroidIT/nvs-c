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



export type istate = {
  isawait: boolean
  success: boolean
  msgError: string
  msgSuccess: string
}
export type istatectrl = {
  success: boolean
  msgError: string
  msgSuccess: string
}

export type iresponseServer<T> = { inError: boolean; msg: string; dataResult: T }

export type irespUser = { success: boolean, data?: iuser, error?: string }

export type icam = {
  id: string; information?: [string, any][], name: string; asPTZ?: boolean; inerror?: boolean, screeshots: string[],
  liveH24?: boolean, motion?: boolean, icon?: string, color?: string, color2?: string //arrAllarm: string[],
}
export type icamProbe = { urn: string; name: string; xaddrs: string[]; username: string; password: string, exist: boolean }

export type icams = { list?: Array<icam>, cam?: icam }

export type inameCamOption = 'live24' | 'livemotion' | 'delete' | 'altro'

export type nameOptionsNvs = 'ipblock' | 'other';
export type ialarmMethod = 'getAlarmCam' | 'getAlarmCamList' | 'getDayAndAlarmList' | 'getDayAndAlarmCount';

export type iDayAndAlarmCount = { stamptime: string; count: string }

export type iAlarm = { id: string, idcam: string, namecam: string, stamptime: string, datarif: string,  /*  msg: string */ }

export type iaccount = { newusername: string, password: string, newpassword: string, checknewpassword: string }


export enum eNvsApiname {
  user_update = 'userupdate',
  set_options = 'set_options',
  manager_alarms = 'manageralarms',

  alarms_count = 'alarmscount',

  alarms_det = 'alarmsdet',
  alarm_det = 'alarmdet'
}

export enum eCamsApiname {
  Cam_List = 'camlist',
  Cam_Controll = 'camcontroll',
  Cam_Screenshot = 'camscreenshot',
  Cam_Setoption = 'setcamoption',

  radarCams = 'radarcams',
  saveRadarCam = 'saveradarcam',
}
export type tPhoto = { type: string, data: any }
