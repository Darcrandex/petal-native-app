/**
 * @name Categories
 * @description
 * @author darcrand
 */

import AddForm from '@/components/AddForm'
import RemoveButton from '@/components/RemoveButton'
import UpdateForm from '@/components/UpdateForm'
import { useTableSearch } from '@/hooks/useTableSearch'
import { cateService } from '@/services/cate'
import { Space, Table } from 'antd'
import { useMemo } from 'react'

export default function Categories() {
  const { tableProps, refetch } = useTableSearch({
    queryKey: ['cate', 'pages'],
    queryFn: cateService.pages,
  })

  const columns = useMemo(
    () => [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'ctl',
        width: 200,
        render: (_: any, record: any) => (
          <Space>
            <UpdateForm
              fields={[{ name: 'name', label: '名称', type: 'input' }]}
              recordId={record.id}
              queryFn={cateService.one}
              mutationFn={cateService.update}
              onSuccess={refetch}
            />
            <RemoveButton recordId={record.id} service={cateService.remove} onSuccess={refetch} />
          </Space>
        ),
      },
    ],
    [refetch]
  )

  return (
    <>
      <header className='m-4'>
        <AddForm
          mutationFn={cateService.add}
          fields={[{ name: 'name', label: '名称', type: 'input' }]}
          onSuccess={refetch}
        />
      </header>

      <Table className='m-4' columns={columns} {...tableProps} />
    </>
  )
}
