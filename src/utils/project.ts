import {Project} from 'types/project'
import {useAsync} from './use-async'
import {useHttp} from './http'
import {useEffect} from 'react'
import {cleanObject} from 'utils/index'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const {run,...result} = useAsync<Project[]>()

  const fetchProjects = () => client('projects', {data:cleanObject(param || [])})

  useEffect(() => {
    // setIsLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    run(fetchProjects(), {
      retry: fetchProjects
    })

    // eslint-disable-next-line
    }, [param])
  return result
}

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}