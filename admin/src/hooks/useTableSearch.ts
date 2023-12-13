/**
 * @description 结合 Form, Table, useQuery 的管理数据 CURD 的 hook
 */

import { PageData, PageParams } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import { Form, TableProps } from 'antd'
import { useCallback, useState } from 'react'

export type TableSearchOptions<TData = any> = {
  queryFn: (params?: PageParams) => Promise<PageData<TData>>
  queryKey: string[]
}

export function useTableSearch<T>(options: TableSearchOptions<T>) {
  const [form] = Form.useForm()
  const [query, setQuery] = useState<any>()

  const {
    data: result,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: options.queryKey.concat([query]),
    queryFn: () => options.queryFn(query),
  })

  const onChange = useCallback((pagination: any, filters: any, sorter: any) => {
    console.log('onChange:', pagination, filters, sorter)
    setQuery((prev: any) => ({ ...prev, ...pagination }))
  }, [])

  const submit = useCallback(() => {
    setQuery(form.getFieldsValue())
  }, [form])

  const reset = useCallback(() => {
    form.resetFields()
    setQuery({})
  }, [form])

  return {
    result,
    isLoading,
    onChange,
    refetch,
    form,
    submit,
    reset,

    // 合并基本的 TableProps
    tableProps: {
      rowKey: 'id',
      bordered: true,
      loading: isLoading,
      dataSource: result?.list,
      onChange,
      pagination: {
        hideOnSinglePage: true,
        total: result?.total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showTotal: (total) => `共 ${total} 条`,
      },
    } as TableProps<T>,
  }
}
