
import { reactive } from 'vue'
import CamService from '../api/cam.api'
import { icamProbe, istatectrl } from '../interfaces'


const _state = reactive<istatectrl>({ success: true, msgError: '', msgSuccess: '' })
const _probeCams = reactive<icamProbe[]>([])

export const cams_wizard_ctrl_store = () => {

    const _radarProbeCams = async () => {
        _probeCams.splice(0, _probeCams.length)
        const resp = await CamService.probeCams()
        if (resp.inError === true) {
            _state.msgError = resp.msg
        } else {
            resp.dataResult.map((c) => { _probeCams.push(c) })
        }
        _state.success = !resp.inError
    }

    const _saveProbeCam = async (cam: icamProbe) => {
        if (!cam.name || !cam.username || !cam.password) {
            _state.msgError = 'All fields is required'
            _state.success = false
            return
        }
        const resp = await CamService.saveProbeCam(cam)
        if (resp.inError === false) {
            _probeCams.map((camP) => {
                if (camP.urn === cam.urn)
                    cam.exist = true
                _state.success = true
            })
        } else {
            _state.msgError = resp.msg
            _state.success = false
        }
    }

    return {
        state: _state, probeCams: _probeCams,
        radarProbeCams: _radarProbeCams, saveProbeCam: _saveProbeCam
    }
}

export default cams_wizard_ctrl_store