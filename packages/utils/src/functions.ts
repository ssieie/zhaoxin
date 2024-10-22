export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandColorRange(minColor = 0, maxColor = 255) {
  if (minColor > maxColor) {
    minColor = 0
    maxColor = 255
  }
  maxColor++
  let r = Math.floor(Math.random() * (maxColor - minColor) + minColor)
  let g = Math.floor(Math.random() * (maxColor - minColor) + minColor)
  let b = Math.floor(Math.random() * (maxColor - minColor) + minColor)
  return {
    cS: `rgba(${r},${g},${b},255)`,
    r, g, b
  }
}

export const addTreeDataDepthFlag = (data: any[], children: string, depth: number, depthFlag: string = 'depth') => {
  data.forEach((item) => {
    item[depthFlag] = depth
    if (item.hasOwnProperty(children) && Array.isArray(item[children]) && item[children].length) {
      addTreeDataDepthFlag(item[children], children, (depth += 1), depthFlag)
      depth = depth - 1
    }
  })
}