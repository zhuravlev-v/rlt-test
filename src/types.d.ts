export interface Iitem {
  id: number,
  // TODO: countDelete should be number only
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

// export interface IitemEmpty {
//   id: number | null,
//   // TODO: countDelete should be number only
//   countDelete?: string | number,
//   data: null
// }