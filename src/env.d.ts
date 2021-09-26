declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

interface HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

interface HTMLVideoElement {
  requestPictureInPicture(): Promise<PictureInPictureWindow>
}

interface DocumentOrShadowRoot {
  readonly pictureInPictureElement: Element | null;
  exitPictureInPicture(): Promise<void>;
}

interface Document {
  exitPictureInPicture(): Promise<void>
}