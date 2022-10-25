// 

import React from 'react'
// import {useState} from 'react'
import {FormEvent} from 'react'
import { Form, Input, Button } from 'antd'
import { register } from 'auth-provider'
import Password from 'antd/lib/input/Password'
import { useAsync } from 'utils/use-async'

export const RegisterScreen = ({onError}:  { onError:(error: Error) => void }) => {

  // const[user] = useState({username: 'cdc', password: '123'})

  const {run, isLoading} = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
    }
    try {
      await run(register(values))
    } catch (error:any) {
      onError(error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder={'用户名'} type="text" id={'username'}/>
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder={'密码'} type="text" id={'password'}/>
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{required: true, message: '请输入确认密码'}]}>
        <Input placeholder={'确认密码'} type="text" id={'cpassword'}/>
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} htmlType={'submit'} type={'primary'}>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
