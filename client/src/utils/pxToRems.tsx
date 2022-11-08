import { baselineFontSize } from '@/rt-theme/fonts'

export const pxToRems = (value: number) => {
  return `${value / baselineFontSize}rem`
}
