export interface ITablePropList {
  prop?: string
  label?: string
  minWidth?: string
  width?: string
  slotName?: string
}

export interface ITable {
  title: string
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  propList: ITablePropList[]
}
