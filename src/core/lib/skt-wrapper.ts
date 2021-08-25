/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */


type Functioncallback = ((data: any) => void)
class websocket_wrapper {
    _isconnect = false
    private conn!: WebSocket
    callbacks: Map<string, Functioncallback> = new Map
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    get rawWebSocket() {
        return this.conn
    }
    async connect(url: string, token: string): Promise<boolean> {
        return new Promise((res, rej) => {
            try {
                this.conn = new WebSocket(url, [token])
                this.conn.onopen = () => {
                    this._isconnect = true
                    res(true)
                }
                this.conn.onerror = () => {
                    rej(false)
                }
                this.conn.onmessage = (msg: any) => {
                    //console.log('SOCKET MESSAGE FROM SERVER:', msg)
                    const { type, payload } = JSON.parse(msg.data)
                    this.dispatch(type, payload)
                }
            } catch (error) {
                rej(error)
            }

        })
    }
    bind(event_name: string, callback: (data: any) => any) {
        this.callbacks.set(event_name, callback)
    }

    dispatch(event_name: string, msg: any) {
        if (this.callbacks.has(event_name)) {
            const fun = this.callbacks.get(event_name)
            if (fun)
                fun(msg)
        } else {
            console.log('no callback ');
        }
    }
    send(event_name: string, msg: any) {
        if (!this._isconnect) {
            return new Error('socket not connect');
        }
        const sendJSON = JSON.stringify({ type: event_name, payload: msg })
        this.conn.send(sendJSON)
    }

    /* sendraw (event_name: string, data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        let sendJSON = JSON.stringify({ type: event_name, payload: data })
        this.conn.send(sendJSON)
    } */

    close() {
        if (this._isconnect)
            this.conn.close()
    }
}

export { websocket_wrapper }