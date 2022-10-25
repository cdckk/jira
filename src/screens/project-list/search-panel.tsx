// import React from "react";
// import { Form, Input } from "antd";
// import { UserSelect } from "components/user-select";
// import { Project } from "types/project";
// import { User } from "types/user";

// interface SearchPanelProps {
//   users: User[];
//   param: Partial<Pick<Project, "name" | "personId">>;
//   setParam: (param: SearchPanelProps["param"]) => void;
// }

// export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
//   return (
//     <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
//       <Form.Item>
//         {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
//         <Input
//           placeholder={"项目名"}
//           type="text"
//           value={param.name}
//           onChange={(evt) =>
//             setParam({
//               ...param,
//               name: evt.target.value,
//             })
//           }
//         />
//       </Form.Item>
//       <Form.Item>
//         <UserSelect
//           defaultOptionName={"负责人"}
//           value={param.personId}
//           onChange={(value) =>
//             setParam({
//               ...param,
//               personId: value,
//             })
//           }
//         />
//       </Form.Item>
//     </Form>
//   );
// };


import React from 'react'
// import {useState} from 'react'
import { Input, Select, Form } from 'antd'
import {jsx} from '@emotion/react'
export interface User {
  id: string,
  name: string,
  title: string,
  email: string,
  organization: string,
  token: string
}
interface Param {
  name: string,
  personId: string
}
interface SearchPanelProps {
  param: Param,
  users: User[],
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({param, users, setParam}: SearchPanelProps) => {
  console.log('users', users);
  
  return (
    <div>
      <Form style={{marginBottom: '2rem'}} layout={"inline"}>
        <Form.Item>
          <Input placeholder={"项目名"} type="text" value={param.name} onChange={(evt) => setParam({...param, name: evt.target.value})} />
        </Form.Item>
        <Form.Item>
          <Select id="" value={param.personId} onChange={(value) => setParam({...param, personId: value})}>
            <Select.Option value={''}>负责人</Select.Option>
            {
              users.map((users) => {
              return <Select.Option value={users.id} key={users.id}>{users.name}</Select.Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}
