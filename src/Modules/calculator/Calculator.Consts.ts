export interface Aliquota {
  max?: number
  min?: number
  percent?: number
  deduction?: number
}

export const irPlrTable: Array<Aliquota> = [
  {
    min: 0,
    max: 6677.55,
    percent: 0,
    deduction: 0,
  },
  {
    min: 6677.56,
    max: 9922.28,
    percent: 0.075,
    deduction: 500.82,
  },
  {
    min: 9922.29,
    max: 13167.28,
    percent: 0.15,
    deduction: 1244.99,
  },
  {
    min: 9922.29,
    max: 16380.38,
    percent: 0.225,
    deduction: 2232.51,
  },
  {
    min: 16380.39,
    percent: 0.275,
    deduction: 3051.53,
  },
]
