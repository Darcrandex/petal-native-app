/**
 * @name Posts
 * @description 帖子(采集)
 * @author darcrand
 */

import RemoveButton from '@/components/RemoveButton'
import SearchForm from '@/components/SearchForm'
import { useTableSearch } from '@/hooks/useTableSearch'
import { commonService } from '@/services/common'
import { postService } from '@/services/post'
import { PostItem } from '@/types/post'
import { useQuery } from '@tanstack/react-query'
import { Button, Image, Table } from 'antd'
import { useMemo } from 'react'

export default function Posts() {
  const { form, submit, reset, refetch, tableProps } = useTableSearch({
    queryKey: ['post', 'pages'],
    queryFn: postService.pages,
  })

  const columns = useMemo(
    () => [
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        width: 220,
        render: (imageUrl: string) => <ImageView imageUrl={imageUrl} />,
      },
      {
        title: '分类',
        key: 'category',
        render: (_: any, record: PostItem) => record.categories?.map((c) => c.name).join(', '),
      },
      {
        title: '描述',
        dataIndex: 'content',
        key: 'content',
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

function ImageView(props: { imageUrl: string }) {
  const { data: imageUrl } = useQuery({
    queryKey: ['image', 'view', 'access', props.imageUrl],
    queryFn: () => commonService.getImageAccessPath(props.imageUrl),
  })

  return <Image src={imageUrl} placeholder className='!w-24 !h-24 object-cover' />
}
