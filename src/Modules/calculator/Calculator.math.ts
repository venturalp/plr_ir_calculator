export const revertBRL = (num: string): number =>
  parseFloat(num.replace(/\./gi, '').replace(/,/gi, '.')) || 0
