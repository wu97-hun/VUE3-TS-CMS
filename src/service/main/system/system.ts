import wjRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return wjRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    headers: {
      Authorization: ''
    }
  })
}
