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

// 删除操作
export function deletePageData(url: string) {
  return wjRequest.delete<IDataType>({
    url: url,
    headers: {
      Authorization: ''
    }
  })
}

// 新建操作
export function createPageData(url: string, newData: any) {
  return wjRequest.post<IDataType>({
    url: url,
    data: newData,
    headers: {
      Authorization: ''
    }
  })
}

// 编辑操作
export function editPageData(url: string, editData: any) {
  return wjRequest.patch<IDataType>({
    url: url,
    data: editData,
    headers: {
      Authorization: ''
    }
  })
}
