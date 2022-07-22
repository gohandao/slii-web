export type Utilities = {
  search?: string
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>
  indexTab?: 'all' | 'op' | 'ed'
  setIndexTab: React.Dispatch<
    React.SetStateAction<'all' | 'op' | 'ed' | undefined>
  >
  page?: number
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>
}
