import {useEffect} from 'react'
import {useHttp} from './http'
import {useAsync} from './use-async'
import {cleanObject} from 'utils/index'

import {User} from 'screens/project-list/search-panel'
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const {run,...result} = useAsync<User[]>()
  useEffect(() => {
    // setIsLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    run(client('users', {data:cleanObject(param || [])}))

    // eslint-disable-next-line
    }, [param])
  return result
}