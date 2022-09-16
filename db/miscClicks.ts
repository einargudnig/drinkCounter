import { useInsert, useRealtime } from 'react-supabase'

const TABLE_NAME = 'misc'

export function useMiscClicks() {
  const [{ data, error }] = useRealtime(TABLE_NAME, {
    select: {
      columns: 'id,type',
    },
  })

  if (error) {
    console.error(error)
  }

  return data
}

export function useInsertMiscClicks() {
  // eslint-disable-next-line no-unused-vars
  const [_data, execute] = useInsert(TABLE_NAME)

  return execute
}
