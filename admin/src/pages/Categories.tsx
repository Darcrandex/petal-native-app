/**
 * @name Categories
 * @description
 * @author darcrand
 */

import { cateService } from '@/services/cate'
import { PageParams } from '@/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Table } from 'antd'
import { useMemo, useState } from 'react'

export default function Categories() {
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
        render: (_, record) => <RemoveButton id={record.id} />,
      },
    ],
    []
  )

  const [query, setQuery] = useState<PageParams>({ page: 1, pageSize: 10 })
  const { data } = useQuery({
    queryKey: ['categories', query],
    queryFn: () => cateService.pages(query),
  })

  const [open, setOpen] = useState(false)

  return (
    <>
      <header className='m-4'>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </header>

      <Table
        className='m-4'
        bordered
        dataSource={data?.data.list}
        columns={columns}
        rowKey={(row) => row.id}
        pagination={{
          current: query.page,
          pageSize: query.pageSize,
          hideOnSinglePage: true,
          showTotal: () => `共 ${data?.data.total || 0} 条`,
          onChange(page, pageSize) {
            setQuery({ ...query, page, pageSize })
          },
        }}
      />

      <Modal title='添加分类' open={open} onCancel={() => setOpen(false)} footer={null} destroyOnClose>
        <AddForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}

function AddForm(props: { onClose: () => void }) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: cateService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      props.onClose()
    },
  })

  return (
    <Form onFinish={mutate} layout='vertical'>
      <Form.Item label='分类名称' name='name'>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType='submit'>确定</Button>
      </Form.Item>
    </Form>
  )
}

function RemoveButton(props: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: cateService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return <Button onClick={() => mutate(props.id)}>删除</Button>
}
