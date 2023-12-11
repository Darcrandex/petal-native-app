/**
 * @name CategorySelect
 * @description
 * @author darcrand
 */

import { cateService } from '@/services/cate'
import { Text } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'

export type CategorySelectProps = {
  value?: string
  onChange?: (value: string) => void
}

export default function CategorySelect(props: CategorySelectProps) {
  const { data: categoryOptions } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => cateService.all({ pageSize: 100 }),
  })

  return (
    <>
      <Text>CategorySelect</Text>
    </>
  )
}
