import { useState } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, initialConfig}
  const [state, setState] =  useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef()

  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  const run = (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
    if(!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
      //这里也会打断一切的进程
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setState({...state, stat: 'loading'})
    return promise
      .then(data => {
        if (mountedRef.current)
        // 阻止在已卸载组件上赋值
          setData(data)
        return data
    }).catch(error => {
      //catch 会消化异常，如果不主动抛出外面接收不到异常
      setError(error)
      // return error
      if (config.throwOnError) return Promise.reject(error)
      return error
    })
  }

  // const retry = () => {
  //   run(oldPromise)
  // }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // try被调用时，重新跑一边run，让state刷新一遍
    retry,
    ...state
  }
}