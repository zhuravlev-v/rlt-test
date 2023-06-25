export interface Iitem {
  id: number,
  countDelete?: string | number,
  value?: any,
  data: {
    name: string,
    count: number,
    icon: string
  }
}

export interface IitemEmpty extends Iitem {
  data: null
}