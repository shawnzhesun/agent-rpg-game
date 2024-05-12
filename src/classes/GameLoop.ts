export class GameLoop {
  onStep: () => void;
  refCallback: number;

  constructor(onStep: () => void) {
    this.onStep = onStep;
    this.refCallback = -1;
    this.start();
  }

  start() {
    let previousMs: number;
    const step = 1 / 60;
    const tick = (timestampMs: number) => {
      if (previousMs === undefined) {
        previousMs = timestampMs;
      }
      let elapsedSeconds = (timestampMs - previousMs) / 1000;
      while (elapsedSeconds >= step) {
        this.onStep();
        elapsedSeconds -= step;
      }
      previousMs = timestampMs - elapsedSeconds * 1000;
      this.refCallback = requestAnimationFrame(tick);
    };
    this.refCallback = requestAnimationFrame(tick);
  }

  stop() {
    cancelAnimationFrame(this.refCallback);
  }
}
