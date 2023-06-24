export interface Iitem {
  id: number,
  // TODO: countDelete should be number only
  countDelete?: string | number,
  data: {
    name: string,
    count: number,
    icon: string
  }
}

export interface IitemEmpty {
  id: number,
  // TODO: countDelete should be number only
  countDelete?: string | number,
  data: null
}