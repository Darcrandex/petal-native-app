import { hsl } from 'color'

/**
 * @description 根据字符串获取颜色
 * @param str 字符串
 * @param s 饱和度
 * @param l 亮度
 */
export function getColorFromStr(str = '', s = 85, l = 50) {
  const h = str.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
  return hsl(h, s, l).rgb().toString()
}
