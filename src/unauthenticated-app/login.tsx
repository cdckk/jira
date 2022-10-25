// import React from "react";
// import { useAuth } from "context/auth-context";
// import { Form, Input } from "antd";
// import { LongButton } from "unauthenticated-app/index";
// import { useAsync } from "utils/use-async";

// // interface Base {
// //   id: number
// // }
// //
// // interface Advance extends Base {
// //   name: string
// // }
// //
// // const test = (p: Base) => {
// // }
// //
// // // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// // const a = {id: 1, name: 'jack'}
// // test(a)
// // const apiUrl = process.env.REACT_APP_API_URL;

// export const LoginScreen = ({
//   onError,
// }: {
//   onError: (error: Error) => void;
// }) => {
//   const { login } = useAuth(); 
//   const { run, isLoading } = useAsync(undefined, { throwOnError: true });

//   // HTMLFormElement extends Element
//   const handleSubmit = async (values: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       await run(login(values));
//     } catch (e: any) {
//       onError(e);
//     }
//   };

//   return (
//     <Form onFinish={handleSubmit}>
//       <Form.Item
//         name={"username"}
//         rules={[{ required: true, message: "请输入用户名" }]}
//       >
//         <Input placeholder={"用户名"} type="text" id={"username"} />
//       </Form.Item>
//       <Form.Item
//         name={"password"}
//         rules={[{ required: true, message: "请输入密码" }]}
//       >
//         <Input placeholder={"密码"} type="password" id={"password"} />
//       </Form.Item>
//       <Form.Item>
//         <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
//           登录
//         </LongButton>
//       </Form.Item>
//     </Form>
//   );
// };

import React from 'react'
// import {useState} from 'react'
import {FormEvent} from 'react'
import { Form, Input, Button } from 'antd'
import {useAuth} from 'context/auth-context'
import {useAsync} from 'utils/use-async'

// import { login } from 'auth-provider'

export const LoginScreen = ({onError}:  { onError:(error: Error) => void }) => {

  // const[user] = useState({username: 'cdc', password: '123'})

  const {run, isLoading} = useAsync(undefined, {throwOnError: true})

  const {login} = useAuth()

  const handleSubmit = async (values: {username: string, password: string}) => {
    try {
      // await login(values)
      await run(login(values))
    } catch (e: any) {
      onError(e)
    }
    // window.location.reload()
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder={'用户名'} type="text" id={'username'}/>
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder={'密码'} type="text" id={'password'}/>
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
