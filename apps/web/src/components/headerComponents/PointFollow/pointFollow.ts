function getPointOnLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  d: number,
) {
  const L = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dx = (x2 - x1) / L;
  const dy = (y2 - y1) / L;
  const x = x1 + dx * d;
  const y = y1 + dy * d;
  return {
    x,
    y,
  };
}

class Uhuhuh {
  private readonly canvasEl: HTMLCanvasElement;
  private readonly target: HTMLElement;
  private $: CanvasRenderingContext2D | null;
  private readonly wrapW: number;
  private readonly wrapH: number;
  private radius: number;
  private radiusPow: number;
  private pointObj: any[];
  private canvasRect: DOMRect;
  private lastRenderTime: number;
  private fpsInterval: number;
  private fps: number;
  private readonly mouseListenerBind: OmitThisParameter<
    (e: MouseEvent) => void
  >;
  private readonly resizeListenerBind: OmitThisParameter<() => void>;
  private readonly renderFnBind: OmitThisParameter<() => void>;
  private animationFrameId: number;

  constructor(w: number, h: number, target: HTMLElement) {
    this.canvasEl = document.createElement("canvas");
    this.$ = this.canvasEl.getContext("2d");
    this.target = target;

    this.wrapW = w;
    this.wrapH = h;
    this.canvasEl.width = w;
    this.canvasEl.height = h;

    this.target.innerHTML = "";

    this.target.insertBefore(this.canvasEl, null);

    this.mouseListenerBind = this.mouseListener.bind(this);
    this.resizeListenerBind = this.default.bind(this);
    this.renderFnBind = this.renderFn.bind(this);

    this.init();
  }

  init() {
    this.radius = 300;
    this.radiusPow = Math.pow(this.radius, 2);

    this.default();

    document.addEventListener("mousemove", this.mouseListenerBind);

    window.addEventListener("resize", this.resizeListenerBind);
  }

  mouseListener(e: MouseEvent) {
    for (let i = 0, len = this.pointObj.length; i < len; i++) {
      let distance =
        Math.pow(this.pointObj[i].xByWindows - e.x, 2) +
        Math.pow(this.pointObj[i].yByWindows - e.y, 2);
      if (distance < this.radiusPow) {
        this.pointObj[i].distance = 1 - distance / this.radiusPow;
        this.pointObj[i].toLine = true;
        this.pointObj[i].toPos = {
          x: e.x - this.canvasRect.left,
          y: e.y - this.canvasRect.top,
        };
      } else {
        this.pointObj[i].toLine = false;
      }
    }
  }

  default() {
    let color =
      (localStorage.getItem("theme") || "light") === "light"
        ? "#1d4ed8"
        : "#60a5fa";
    this.pointObj = [];
    // 四周留白20px
    let w = Math.floor((this.wrapW - 30) / 30);
    let h = Math.floor((this.wrapH - 30) / 30);

    this.canvasRect = this.canvasEl.getBoundingClientRect();

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let x = (j * 30 + (j * 30 + 30)) / 2 + 15;
        let y = (i * 30 + (i * 30 + 30)) / 2 + 15;
        this.pointObj.push({
          x,
          y,
          color,
          r: 1.5,
          xByWindows: this.canvasRect.left + x,
          yByWindows: this.canvasRect.top + y,

          toLine: false,
          distance: 0,
          lineW: 0,
          toPos: null,
        });
      }
    }
  }

  renderFn() {
    this.animationFrameId = window.requestAnimationFrame(this.renderFnBind);

    let renderTime = new Date().getTime();
    let elapsed = renderTime - this.lastRenderTime;

    if (elapsed > this.fpsInterval) {
      this.lastRenderTime = renderTime - (elapsed % this.fpsInterval);

      this.$.clearRect(0, 0, this.wrapW, this.wrapH);
      for (const it of this.pointObj) {
        if (it.toLine) {
          this.$.beginPath();
          let lineW = 8 * it.distance;

          // this.$.lineTo(it.x + lineW, it.y + lineW)
          let { x, y } = getPointOnLine(
            it.x,
            it.y,
            it.toPos.x,
            it.toPos.y,
            lineW,
          );
          let tO = getPointOnLine(it.x, it.y, it.toPos.x, it.toPos.y, -lineW);
          this.$.moveTo(tO.x, tO.y);
          // this.$.lineTo(it.x - sX, it.y - sY)
          this.$.lineTo(x, y);
          this.$.lineWidth = 2.2;
          this.$.strokeStyle = it.color;
          this.$.stroke();
        } else {
          this.$.beginPath();
          this.$.arc(it.x, it.y, 1.6, 0, 2 * Math.PI);
          this.$.fillStyle = it.color;
          this.$.fill();
        }
      }
    }
  }

  render(fps = 60) {
    this.lastRenderTime = new Date().getTime();
    this.fps = fps;
    this.fpsInterval = 1000 / this.fps;

    this.$.lineWidth = 2.5;
    this.$.lineCap = "round";

    this.renderFn();
  }

  destroy() {
    document.removeEventListener("mousemove", this.mouseListenerBind);
    window.removeEventListener("resize", this.resizeListenerBind);

    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }

    this.target.innerHTML = "";
  }
}

export default Uhuhuh;
