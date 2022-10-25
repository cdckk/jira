// 
import React, { useState, ReactNode } from 'react'
import { useMount } from 'utils'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel'
import {FullPageLoading, FullPageErrorFallback} from 'components/lib'

interface authForm {
  username: string,
  password: string
}

//拿着token去获得user的信息
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null
  login: (form: authForm) => Promise<void>
  register: (form: authForm) => Promise<void>
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext' 

export const AuthProvider = ({children}: {children: ReactNode}) => {

  const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()

  // 3.页面刷新默认是null
  // const [user, setUser] = useState<User | null>(null)
  const register = (form: authForm) => auth.register(form).then(user => setUser(user))
  const login = (form: authForm) => auth.login(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    // bootstrapUser().then(setUser)
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error}/>
  }

  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
  // return <AuthContext.Provider children={children} value={{user, login, register}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
