/**
 * @name Posts
 * @description 帖子(采集)
 * @author darcrand
 */

import RemoveButton from '@/components/RemoveButton'
import SearchForm from '@/components/SearchForm'
import { useTableSearch } from '@/hooks/useTableSearch'
import { postService } from '@/services/post'
import { PostItem } from '@/types/post'
import { Button, Table } from 'antd'
import { useMemo } from 'react'

export default function Posts() {
  const { form, submit, reset, refetch, tableProps } = useTableSearch({
    queryKey: ['post', 'pages'],
    queryFn: postService.pages,
  })

  const columns = useMemo(
    () => [
      {
        title: '描述',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
      },
      {
        title: '操作',
        key: 'ctl',
        width: 200,
        render: (_: any, record: PostItem) => (
          <>
            <RemoveButton recordId={record.id} service={postService.remove} onSuccess={refetch} />
          </>
        ),
      },
    ],
    [refetch]
  )

  return (
    <>
      <SearchForm
        className='m-4'
        form={form}
        submit={submit}
        reset={reset}
        fields={[{ type: 'input', name: 'content', label: '描述' }]}
        buttons={
          <>
            <Button>新建</Button>
          </>
        }
      />

      <Table className='m-4' columns={columns} {...tableProps} />
    </>
  )
}
