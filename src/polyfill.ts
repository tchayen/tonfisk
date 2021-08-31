(window as any).global = window;

import * as Buffer from "buffer";
window.Buffer = Buffer.Buffer;

window.process = {
  env: {},
  nextTick: function () {
    return null;
  },
};

export {};
