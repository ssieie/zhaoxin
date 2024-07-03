<script setup lang="ts">
import { getRandColorRange, getRandomInt, throttle } from "@blog/utils";
import { onMounted, onUnmounted, ref } from "vue";

const MIN_STARS = 20;
const MAX_STARS = 40;

const canvasWrap = ref();
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

interface StarsInfo {
  x: number;
  y: number;
  size: number;
  angles: number[];
  squarePoints: Record<"x" | "y", number>[];
  type: number;
  gradient?: CanvasGradient;
  rRatio: number;
  c1: string;
  c2: string;
  c3: string;
}

let starsList: Array<StarsInfo> = [];

function drawCurveStar(ctx: CanvasRenderingContext2D, star: StarsInfo) {
  star.squarePoints = getSquarePoints(star.x, star.y, star.size, star.angles);
  star.gradient = getLinearGradient(
    ctx,
    star.squarePoints[0].x,
    star.squarePoints[0].y,
    star.squarePoints[3].x,
    star.squarePoints[3].y,
    star.c1,
    star.c2,
    star.c3,
  );
  // const points = JSON.parse(JSON.stringify(star.squarePoints));
  // let first = points.shift();
  // ctx.beginPath();
  // ctx.moveTo(first!.x, first!.y);
  // for (const point of points) {
  //   ctx.lineTo(point.x, point.y);
  // }
  // ctx.closePath();
  // ctx.stroke();

  // 选择使用二次贝塞尔曲线还是三次贝塞尔曲线呈现形状不同的四角星
  if (star.type === 0) {
    drawQuadraticCurveStar(ctx, star);
  } else {
    drawBezierCurveStar(ctx, star);
  }
}

function drawQuadraticCurveStar(
  ctx: CanvasRenderingContext2D,
  star: StarsInfo,
) {
  ctx.beginPath();
  const { x, y } = getMidPoint(star.squarePoints[0], star.squarePoints[1]);
  ctx.moveTo(x, y);
  for (const i of [1, 2, 3, 4]) {
    const { x, y } = getMidPoint(
      star.squarePoints[i % 4],
      star.squarePoints[(i + 1) % 4],
    );
    ctx.quadraticCurveTo(star.x, star.y, x, y);
  }
  ctx.closePath();
  ctx.fillStyle = star.gradient as CanvasGradient;
  ctx.fill();
}

function drawBezierCurveStar(ctx: CanvasRenderingContext2D, star: StarsInfo) {
  let newSquarePoints: Record<"x" | "y", number>[] = getNewSquarePoints(star);

  ctx.beginPath();
  const { x, y } = getMidPoint(star.squarePoints[0], star.squarePoints[1]);
  ctx.moveTo(x, y);
  for (const i of [1, 2, 3, 4]) {
    const { x, y } = getMidPoint(
      star.squarePoints[i % 4],
      star.squarePoints[(i + 1) % 4],
    );
    ctx.bezierCurveTo(
      newSquarePoints[i % 4].x,
      newSquarePoints[i % 4].y,
      newSquarePoints[i - 1].x,
      newSquarePoints[i - 1].y,
      x,
      y,
    );
  }
  ctx.closePath();
  ctx.fillStyle = star.gradient as CanvasGradient;
  ctx.fill();
}

const mousemoveHandler = (e: MouseEvent) => {
  if (context) {
    let angles = getRandomAngle();
    let size = getRandomInt(MIN_STARS, MAX_STARS);
    let type = getRandomInt(0, size - MIN_STARS);
    starsList.push({
      x: e.x as number,
      y: e.y as number,
      size,
      angles,
      type,
      rRatio: type / size,
      c1: getRandColorRange().cS as string,
      c2: getRandColorRange().cS as string,
      c3: getRandColorRange().cS as string,
      squarePoints:[]
    });
  }
};

const mousemoveHandlerThrottle = throttle(mousemoveHandler, 80);

let animationFrameId = 0;
let lastRenderTime = 0;
let lastDecreaseTime = 0;
const FPS = 50;
const FPS_INTERVAL = 1000 / FPS;
const SCALE_INTERVAL = 1000 / 30;
const renderFn = () => {
  animationFrameId = window.requestAnimationFrame(renderFn);

  if (!context) return;

  let renderTime = +new Date();
  let elapsed = renderTime - lastRenderTime;
  let decreaseElapsed = renderTime - lastDecreaseTime;

  if (decreaseElapsed > SCALE_INTERVAL) {
    lastDecreaseTime = renderTime - (decreaseElapsed % SCALE_INTERVAL);
    // 缩小以及删除元素的处理
    for (let i = 0, len = starsList.length; i < len; i++) {
      if (starsList[i].size === 0) {
        starsList.splice(i, 1);
        i--;
        len = starsList.length;
      } else {
        starsList[i].size--;
        starsList[i].type = starsList[i].size * starsList[i].rRatio;
      }
    }
  }
  if (elapsed > FPS_INTERVAL) {
    lastRenderTime = renderTime - (elapsed % FPS_INTERVAL);

    context.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制
    for (let i = 0, len = starsList.length; i < len; i++) {
      drawCurveStar(context, starsList[i]);
    }
  }
};
const render = () => {
  lastRenderTime = +new Date();
  lastDecreaseTime = +new Date();

  renderFn();
};

onMounted(() => {
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");

  canvas.width = canvasWrap.value.clientWidth;
  canvas.height = canvasWrap.value.clientHeight;

  canvasWrap.value.innerHTML = "";
  // @ts-ignore
  canvasWrap.value.insertBefore(canvas, null);

  window.addEventListener("mousemove", mousemoveHandlerThrottle);

  render();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", mousemoveHandlerThrottle);

  window.cancelAnimationFrame(animationFrameId);
});

function getMidPoint(
  point1: Record<"x" | "y", number>,
  point2: Record<"x" | "y", number>,
) {
  const midX = (point1.x + point2.x) / 2;
  const midY = (point1.y + point2.y) / 2;
  return { x: midX, y: midY };
}

// 填充的渐变色
function getLinearGradient(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  c1: string,
  c2: string,
  c3: string,
): CanvasGradient {
  let grd = ctx.createLinearGradient(x1, y1, x2, y2);
  grd.addColorStop(0, c1);
  grd.addColorStop(0.5, c2);
  grd.addColorStop(1, c3);
  return grd;
}

function getRandomAngle() {
  const startAngle = Math.random() * 360;
  return [startAngle, startAngle + 90, startAngle + 180, startAngle + 270];
}

// 传入圆心坐标以及半径以及角度，随机返回此圆周上的四个点(需满足是一个正方形)
function getSquarePoints(
  x: number,
  y: number,
  radius: number,
  angles: number[],
) {
  const points: Record<"x" | "y", number>[] = angles.map((angle) => {
    const radians = angle * (Math.PI / 180);
    return {
      x: x + radius * Math.cos(radians),
      y: y + radius * Math.sin(radians),
    };
  });
  return points;
}

// 围绕x,y旋转点45度作为三次贝塞尔曲线的参考点
function getNewSquarePoints(star: StarsInfo) {
  // 原始圆心和半径
  // star

  // 旋转并缩放后的点
  return star.squarePoints
    .map((point) => {
      const rotatedPoint = rotatePoint(star.x, star.y, point.x, point.y, 45);
      return scalePoint(
        star.x,
        star.y,
        rotatedPoint.x,
        rotatedPoint.y,
        star.type / star.size,
      );
    })
    .map((scaledPoint) => ({
      x: scaledPoint.x,
      y: scaledPoint.y,
    }));
}

function rotatePoint(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number,
) {
  const radians = angle * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) - sin * (y - cy) + cx;
  const ny = sin * (x - cx) + cos * (y - cy) + cy;
  return { x: nx, y: ny };
}

function scalePoint(
  cx: number,
  cy: number,
  x: number,
  y: number,
  scale: number,
) {
  const nx = cx + (x - cx) * scale;
  const ny = cy + (y - cy) * scale;
  return { x: nx, y: ny };
}
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-9999 pointer-events-none"
    ref="canvasWrap"
  ></div>
</template>

<style scoped></style>
