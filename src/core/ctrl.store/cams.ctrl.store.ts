
import { reactive, readonly } from 'vue'
import CamService from '../api/cam.api'
import { icams, inameCamOption, istatectrl } from '../interfaces'
import { base } from '../setting'
/*eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-var-requires*/
const Buffer = require('buffer').Buffer;

const _cams = reactive<icams>({})
const _state = reactive<istatectrl>({ success: true, msgError: '', msgSuccess: '' })
const _screenshots = reactive<Array<string>>([])


export const cams_ctrl_store = () => {
    const _urlplayer = (id: string) => { return `${base.wss}/stream/${id}`; }

    const _getCams = async (reload = false) => {
        if (reload)
            _cams.list = []
        if (_cams.list?.length)
            return
        const resp = await CamService.getCams()
        if (resp.inError === false) {
            _cams.list = resp.dataResult
        } else {
            _state.msgError = resp.msg
        }
        _state.success = !resp.inError

    }

    const _getCam = (id: string) => {
        const c = _cams.list?.find(cam => { return cam?.id == id })
        if (c)
            return c
    }

    const _deleteCam = async (idcam: string) => {
        await _setOptions(idcam, 'delete', true)
        if (_state.success) {
            await _getCams(true)
        }
    }

    const _setOptions = async (id: string, cmdoption: inameCamOption, data: boolean, checkonly = false) => {
        const resp = await CamService.setOptionCam(id, cmdoption, data, checkonly)
        if (resp.inError === true) {
            _state.msgError = resp.msg
        }
        _state.success = !resp.inError
    }

    const _getScreenshot = async (id: string) => {
        const resp = await CamService.screenshot(id)
        if (resp.inError === false) {
            /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-plus-operands,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call*/
            const image = `data:image/jpg;base64, ${Buffer.from(resp.dataResult.data).toString('base64')}`
            _screenshots.push(image)
        } else {
            _state.msgError = resp.msg
        }
        _state.success = !resp.inError
    }
    const _panMove = async (id: string, direction: string, presetN?: string) => {
        const resp = await CamService.move(id, direction, presetN)
        if (resp.inError) {
            _state.msgError = resp.msg
        }
        _state.success = resp.dataResult
    }

    return {
        state: _state,
        cams: readonly(_cams),
        screenshots: _screenshots,
        urlplayer: _urlplayer,
        getCam: _getCam,
        getCams: _getCams,
        deleteCam: _deleteCam,
        getScreenshot: _getScreenshot,
        panMove: _panMove,
        setOptions: _setOptions
    }
}

export default cams_ctrl_store