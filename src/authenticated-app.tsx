// import React from "react";
// import { ProjectListScreen } from "screens/project-list";
// import { useAuth } from "context/auth-context";
// import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
// import styled from "@emotion/styled";
// // import { ButtonNoPadding, Row } from "components/lib";
// import { Button, Dropdown, Menu } from "antd";
// import { Route, Routes } from "react-router";
// // import { ProjectScreen } from "screens/project";
// import { resetRoute } from "utils";
// // import { ProjectModal } from "screens/project-list/project-modal";
// // import { ProjectPopover } from "components/project-popover";
// // import { UserPopover } from "components/user-popover";

// /**
//  * grid 和 flex 各自的应用场景
//  * 1. 要考虑，是一维布局 还是 二维布局
//  * 一般来说，一维布局用flex，二维布局用grid
//  * 2. 是从内容出发还是从布局出发？
//  * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
//  * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
//  * 从内容出发，用flex
//  * 从布局出发，用grid
//  *
//  */

// // prop drilling

// export default function AuthenticatedApp() {
//   return (
//     <Container>
//       <PageHeader />
//       <Main>
//         <Routes>
//           <Route path={"projects"} element={<ProjectListScreen />} />
//           <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
//           <Route index element={<ProjectListScreen />} />
//         </Routes>
//       </Main>
//       <ProjectModal />
//     </Container>
//   );
// }

// const PageHeader = () => {
//   return (
//     <Header between={true}>
//       <HeaderLeft gap={true}>
//         <ButtonNoPadding type={"link"} onClick={resetRoute}>
//           <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
//         </ButtonNoPadding>
//         <ProjectPopover />
//         <UserPopover />
//       </HeaderLeft>
//       <HeaderRight>
//         <User />
//       </HeaderRight>
//     </Header>
//   );
// };

// const User = () => {
//   const { logout, user } = useAuth();
//   return (
//     <Dropdown
//       overlay={
//         <Menu>
//           <Menu.Item key={"logout"}>
//             <Button onClick={logout} type={"link"}>
//               登出
//             </Button>
//           </Menu.Item>
//         </Menu>
//       }
//     >
//       <Button type={"link"} onClick={(e) => e.preventDefault()}>
//         Hi, {user?.name}
//       </Button>
//     </Dropdown>
//   );
// };

// // temporal dead zone(暂时性死区)
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr;
//   height: 100vh;
// `;

// // grid-area 用来给grid子元素起名字
// const Header = styled(Row)`
//   padding: 3.2rem;
//   box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
//   z-index: 1;
// `;
// const HeaderLeft = styled(Row)``;
// const HeaderRight = styled.div``;
// const Main = styled.main`
//   display: flex;
//   overflow: hidden;
// `;

import React from 'react'
import {useState} from 'react'
import {ProjectListScreen} from 'screens/project-list/index'
import {ProjectScreen} from 'screens/project/index'
import {useAuth} from 'context/auth-context'
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu, Button } from 'antd';
import {Navigate, Route, Routes,  } from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import {ProjectModal} from 'screens/project-list/project-modal'
import {ProjectPopOver} from 'components/project-popover'

import {resetRoute} from 'utils/index'

export const AuthenticatedApp = () => {
  
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return <Container>
    {/* <div>
      <div>{value.name}</div>
    </div> */}
    <PageHeader
      projectButton={
        <ButtonNoPadding
          type={'link'}
          onClick={() => setProjectModalOpen(true)}
        >
          创建项目
        </ButtonNoPadding>
      }
    />

    {/* <Button onClick={() => setProjectModalOpen(true)}>点击</Button> */}

    <Main>

      <Router>
        <Routes>
          <Route path={"/"} element={<Navigate to={"projects"} />} />
          
          <Route path={"projects"} element={<ProjectListScreen projectButton={
            <ButtonNoPadding
              type={'link'}
              onClick={() => setProjectModalOpen(true)}
            >
              创建项目
            </ButtonNoPadding>
            }/>} />
          <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
        </Routes>
      </Router>
        
    </Main>
    <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}></ProjectModal>
  </Container>
}

const PageHeader = (props: {projectButton: JSX.Element}) => {
  return  <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo} alt=""/> */}
        <Button style={{padding: 0}} type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}></SoftwareLogo>
        </Button>
        {/* <h2>项目</h2> */}
        <ProjectPopOver projectButton={props.projectButton}/>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
        {/* <button onClick={() => logout()}>登出</button> */}
      </HeaderRight>
    </Header>
}

const User = () => {
  const {logout, user} = useAuth()

  return <Dropdown overlay={<Menu>
    <Menu.Item key={'logout'}>
    {/* eslint-disable-next-line */}
      <Button type={'link'} onClick={logout}>登出</Button>
      {/* <a onClick={logout} href="">登出</a> */}
    </Menu.Item>
  </Menu>}>
    {/* eslint-disable-next-line */}
    <Button type={'link'} onClick={ e => e.preventDefault()}>
      hi，{user?.name}
    </Button>
  </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const Main = styled.header`
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div`
`