// import React from "react";
// import { SearchPanel } from "screens/project-list/search-panel";
// import { List } from "screens/project-list/list";
// import { useDebounce, useDocumentTitle } from "utils";
// import { useProjects } from "utils/project";
// import { useUsers } from "utils/user";
// import {
//   useProjectModal,
//   useProjectsSearchParams,
// } from "screens/project-list/util";
// import {
//   ButtonNoPadding,
//   ErrorBox,
//   Row,
//   ScreenContainer,
// } from "components/lib";
// import { Profiler } from "components/profiler";

// // 状态提升可以让组件共享状态，但是容易造成 prop drilling

// // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

// // 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// // 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
// export const ProjectListScreen = () => {
//   useDocumentTitle("项目列表", false);

//   const { open } = useProjectModal();

//   const [param, setParam] = useProjectsSearchParams();
//   const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
//   const { data: users } = useUsers();

//   return (
//     <Profiler id={"项目列表"}>
//       <ScreenContainer>
//         <Row marginBottom={2} between={true}>
//           <h1>项目列表</h1>
//           <ButtonNoPadding onClick={open} type={"link"}>
//             创建项目
//           </ButtonNoPadding>
//         </Row>
//         <SearchPanel users={users || []} param={param} setParam={setParam} />
//         <ErrorBox error={error} />
//         <List loading={isLoading} users={users || []} dataSource={list || []} />
//       </ScreenContainer>
//     </Profiler>
//   );
// };

// ProjectListScreen.whyDidYouRender = false;

import React from 'react'
import {useEffect, useState} from 'react'
import {SearchPanel} from './search-panel'
import {List} from './list'
import * as qs from 'qs'


import {cleanObject, useDebounce} from '../../utils/index'
import { useHttp } from 'utils/http'
import { useMount } from 'utils/index'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'

import {useDocumentTitle} from 'utils/index'

import {useUrlQueryParam} from 'utils/url'
import { useAsync } from 'utils/use-async'
import {Project} from 'types/project'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import {Row} from 'components/lib'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = (props: {projectButton: JSX.Element}) => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  // console.log('param', param)

  // const [param] = useUrlQueryParam(['name', 'personId'])

  // const [list, setList] = useState([])
  // const [users, setUsers] = useState([])
  const client = useHttp()
  // const [isLoading, setIsLoading] = useState(false)
  // 异常处理
  // const [error, setError] = useState<null | Error>(null)

  const debounceParam = useDebounce(param, 2000)

  const {isLoading,error,data: list, retry} = useProjects(debounceParam)
  const {data: users} = useUsers()

  useDocumentTitle("项目列表", false)

  useUrlQueryParam(['random'])
  // console.log('retry', retry);
  

  // eslint-disable-next-line 
  // useEffect(() => {
  //   setIsLoading(true)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   client('projects', {data:cleanObject(debounceParam)})
  //   run(client('projects', {data:cleanObject(debounceParam)}))
  //     // .then(setList)
  //     // .catch((error) => {
  //     //   setList([])
  //     //   setError(error)
  //     // })
  //     // .finally(() => setIsLoading(false))

  //   // name=${param.name}&personId=${param.personId}
  //   // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
  //   //   if(res.ok) {
  //   //     console.log("6666")
  //   //     console.log(res)
  //   //     setList(await res.json())
  //   //   }
  //   // })

  //   // eslint-disable-next-line
  //   }, [debounceParam])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param])
  // useMount(() => {
  //   client('users').then(setUsers)
  //   // fetch(`${apiUrl}/user`).then(async (res) => {
  //   //   if(res.ok) {
  //   //     setUsers(await res.json())
  //   //   }
  //   // })
  //   })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // })
  // 空数组页面渲染时 触发一次
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {/* <Button type={'link'} onClick={() => props.projectButton(true)}>创建项目</Button> */}
        {props.projectButton}
      </Row>
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List projectButton={props.projectButton} reflesh={retry} dataSource={list || []} users={users || []} loading={isLoading}></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender =  true


const Container = styled.div`
padding: 3.2rem;
`
